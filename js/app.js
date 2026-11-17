/* NesMa — catálogo y pedidos por WhatsApp (sin dependencias) */
(function () {
  "use strict";

  const CFG = window.NESMA_CONFIG;
  const DATA = window.NESMA_CATALOGO;
  const CATS = DATA.categorias;
  const PRODUCTS = DATA.productos;
  const RELATED = DATA.relacionados || {};
  const CAT_BY_ID = Object.fromEntries(CATS.map((c) => [c.id, c]));
  const PROD_BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const CART_KEY = "nesma-pedido-v1";
  const CUSTOMER_KEY = "nesma-cliente-v1";
  const PREFS_KEY = "nesma-prefs-v1";
  const TITLE = "NesMa · Calderas, radiadores y calefacción";

  // vitrina de la portada: { categoría, texto, producto para la foto, producto para el "desde" }
  const SHOWCASE = [
    { cat: "calderas-murales", label: "Calderas murales", img: "ecco-24", from: "ecco-24" },
    { cat: "radiadores", label: "Radiadores", img: "clan-n", from: "bit" },
    { cat: "agua-caliente", label: "Calefones", img: "calefon-26tbf", from: "calefon-26tbf" },
    { cat: "piso-radiante", label: "Piso radiante", img: "colector-completo", from: "colector-completo" }
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ── Utilidades ───────────────────────── */
  const nf0 = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
  const nf2 = new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const ars = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const round2 = (n) => Math.round(n * 100) / 100;
  const fmt = (n) => { n = round2(n); return "U$S " + (Number.isInteger(n) ? nf0.format(n) : nf2.format(n)); };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[”“"]/g, "").replace(/×/g, "x");
  const imgSrc = (p) => `img/${p.img}.webp`;
  const minPrice = (p) => Math.min(...p.variantes.map((v) => v.precio));
  const cheapest = (p) => p.variantes.reduce((a, b) => (b.precio < a.precio ? b : a));
  const varKey = (p, v) => `${p.id}::${v.codigo || v.nombre}`;
  const stepOf = (v) => v.paso || 1;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const icon = (id, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* modo privado: queda sólo en memoria */ }
    }
  };

  const prefs = Object.assign({ vista: "grilla", iva: false }, store.get(PREFS_KEY, {}));
  const savePrefs = () => store.set(PREFS_KEY, prefs);

  // precio para mostrar según la preferencia "con / sin IVA"
  const shown = (n) => (prefs.iva ? n * (1 + CFG.iva) : n);
  const ivaTag = () => (prefs.iva ? "IVA incl." : "+ IVA");
  // etiqueta visible al lado de cada importe, para que nadie lo tome como precio final
  const ivaHTML = () => `<span class="ivatag${prefs.iva ? " ivatag--in" : ""}">${ivaTag()}</span>`;
  const unitTxt = (v) => (v.unidad ? ` / ${v.unidad}` : "");
  const priceHTML = (v) => `${fmt(shown(v.precio))}<small>${esc(unitTxt(v))}</small> ${ivaHTML()}`;

  const waLink = (text) => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(text)}`;
  const productUrl = (p) => `${location.href.split("#")[0]}#/p/${p.id}`;

  /* ── Búsqueda ───────────────────────── */
  // ptext: lo que describe a la familia; vtexts: familia + cada modelo (nombre, código, specs)
  const INDEX = PRODUCTS.map((p) => {
    const ptext = norm(`${p.nombre} ${p.marca} ${p.resumen || ""} ${CAT_BY_ID[p.cat].nombre}`);
    return {
      p, ptext,
      vtexts: p.variantes.map((v) => `${ptext} ${norm(v.nombre)} ${norm(v.codigo || "")} ${norm(Object.values(v.specs || {}).join(" "))}`)
    };
  });
  const termsOf = (q) => norm(q).split(/[\s/]+/).filter(Boolean);

  // devuelve [{ p, vars: variantes que matchean puntualmente (o null), score }]
  // Un producto entra si algún modelo cumple todos los términos, o si la familia en sí los cumple.
  function search(q) {
    const terms = termsOf(q);
    if (!terms.length) return PRODUCTS.map((p) => ({ p, vars: null, score: 0 }));
    const out = [];
    for (const it of INDEX) {
      const vars = it.p.variantes.filter((v, i) => terms.every((t) => it.vtexts[i].includes(t)));
      if (!vars.length && !terms.every((t) => it.ptext.includes(t))) continue;
      const title = norm(it.p.nombre);
      let score = terms.reduce((s, t) => s + (title.includes(t) ? 3 : 1), 0) + (it.p.destacado ? 0.5 : 0);
      if (vars.length && vars.length < it.p.variantes.length) score += 2;
      if (it.p.variantes.some((v) => v.codigo && terms.some((t) => norm(v.codigo).startsWith(t)))) score += 4;
      out.push({ p: it.p, vars: vars.length && vars.length < it.p.variantes.length ? vars : null, score });
    }
    return out.sort((a, b) => b.score - a.score);
  }

  function highlight(text, q) {
    let html = esc(text);
    for (const t of termsOf(q).sort((a, b) => b.length - a.length)) {
      if (t.length < 2) continue;
      const src = norm(text);
      const i = src.indexOf(t);
      if (i < 0) continue;
      // marcar sobre el texto original (misma longitud tras normalizar en la mayoría de los casos)
      const raw = text.slice(i, i + t.length);
      html = html.replace(esc(raw), `<mark>${esc(raw)}</mark>`);
    }
    return html;
  }

  /* ── Pedido (carrito) ───────────────────────── */
  // cart: { "productoId::codigo|nombre": cantidad }
  let cart = store.get(CART_KEY, {});

  function findVar(key) {
    const [pid, vid] = key.split("::");
    const p = PROD_BY_ID[pid];
    const v = p && p.variantes.find((x) => (x.codigo || x.nombre) === vid);
    return v ? { p, v } : null;
  }

  function cartLines() {
    const lines = [];
    for (const [key, qty] of Object.entries(cart)) {
      const f = findVar(key);
      if (!f || qty <= 0) { delete cart[key]; continue; }
      lines.push({ key, p: f.p, v: f.v, qty, total: f.v.precio * qty });
    }
    return lines;
  }

  function cartTotals() {
    const lines = cartLines();
    const subtotal = lines.reduce((s, l) => s + l.total, 0);
    const units = lines.length; // ítems distintos: sumar cantidades mezclaría metros con unidades
    return { lines, subtotal, units, iva: subtotal * CFG.iva, total: subtotal * (1 + CFG.iva) };
  }

  const productUnits = (p) => p.variantes.reduce((s, v) => s + (cart[varKey(p, v)] || 0), 0);

  function setQty(key, qty, { silent } = {}) {
    qty = Math.max(0, Math.min(99999, Math.round(qty) || 0));
    const before = cart[key] || 0;
    if (qty === before) return;
    if (qty === 0) delete cart[key]; else cart[key] = qty;
    store.set(CART_KEY, cart);
    sentState = false;
    if (!silent && qty > before) pop($("#cart-count"));
    syncCart();
  }

  function removeWithUndo(keys, msg) {
    const snap = {};
    keys.forEach((k) => { if (cart[k]) snap[k] = cart[k]; delete cart[k]; });
    if (!Object.keys(snap).length) return;
    store.set(CART_KEY, cart);
    syncCart();
    toast(msg, { label: "Deshacer", fn: () => { Object.assign(cart, snap); store.set(CART_KEY, cart); syncCart(); } });
  }

  function pop(el) { if (!el) return; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }

  /* ── Control de cantidad (siempre opera sobre el pedido) ───────────────────────── */
  function ctrlInner(key, v, style) {
    const qty = cart[key] || 0;
    const step = stepOf(v);
    if (!qty) {
      const solid = style === "card" ? " add-btn--solid" : "";
      return `<button type="button" class="add-btn add-btn--block${solid}" data-add-key="${esc(key)}" data-step-size="${step}">
        ${icon("i-plus")}<span>Agregar</span></button>`;
    }
    return `<span class="qty qty--block" data-key="${esc(key)}" data-step-size="${step}">
        <button type="button" data-step="-1" aria-label="Quitar ${step > 1 ? step : "uno"}">${icon(qty <= step ? "i-trash" : "i-minus")}</button>
        <input type="number" inputmode="numeric" min="0" max="99999" value="${qty}" aria-label="Cantidad">
        <button type="button" data-step="1" aria-label="Sumar ${step > 1 ? step : "uno"}">${icon("i-plus")}</button>
      </span>`;
  }
  const ctrlHTML = (p, v, style, cls = "") =>
    `<div class="${cls}" data-ctrl="${esc(varKey(p, v))}" data-style="${style}">${ctrlInner(varKey(p, v), v, style)}</div>`;

  // Refresca todos los controles visibles, contadores y totales tras un cambio del pedido
  function syncCart() {
    renderCartSummary();
    $$("[data-ctrl]").forEach((el) => {
      const key = el.dataset.ctrl;
      const f = findVar(key);
      if (!f) return;
      const qty = cart[key] || 0;
      const row = el.closest("[data-row]");
      if (row) row.classList.toggle("in-cart", qty > 0);
      const input = $("input", el);
      if (input && document.activeElement === input && qty > 0) return; // no pisar lo que está tipeando
      el.innerHTML = ctrlInner(key, f.v, el.dataset.style);
    });
    $$("[data-card]").forEach((el) => {
      const p = PROD_BY_ID[el.dataset.card];
      const u = productUnits(p);
      el.classList.toggle("in-cart", u > 0);
      const chip = $(".card__chip--in", el);
      if (chip) { chip.hidden = u === 0; $("b", chip).textContent = u; }
    });
    $$(".sg__add").forEach((b) => {
      const qty = cart[b.dataset.sgAdd] || 0;
      b.classList.toggle("is-in", qty > 0);
      b.innerHTML = qty > 0 ? `${qty}` : icon("i-plus");
    });
    if (openProduct) renderModalFoot();
    if (!$("#cart-drawer").hidden) renderDrawer();
  }

  /* ── Tarjetas ───────────────────────── */
  function cardHTML(p) {
    const n = p.variantes.length;
    const u = productUnits(p);
    const v0 = cheapest(p);
    return `
      <article class="card${u ? " in-cart" : ""}" data-card="${p.id}">
        ${n > 1 ? `<span class="card__chip">${n} modelos</span>` : ""}
        <span class="card__chip card__chip--in" ${u ? "" : "hidden"}>${icon("i-check")}<b>${u}</b></span>
        <div class="card__media"><img src="${imgSrc(p)}" alt="" loading="lazy" width="320" height="320"></div>
        <div class="card__body">
          <h3 class="card__title"><a href="#/p/${p.id}">${esc(p.nombre)}</a></h3>
          ${p.resumen ? `<p class="card__meta">${esc(p.resumen)}</p>` : ""}
          <div class="card__price">
            ${n > 1 ? '<span class="price__from">Desde</span>' : ""}
            <span class="price">${priceHTML(v0)}</span>
          </div>
        </div>
        <div class="card__foot">
          ${n > 1
            ? `<a class="add-btn add-btn--block" href="#/p/${p.id}">Elegir modelo</a>`
            : ctrlHTML(p, p.variantes[0], "card")}
        </div>
      </article>`;
  }

  /* ── Lista rápida ───────────────────────── */
  function specLine(v) {
    return v.specs ? Object.entries(v.specs).map(([k, val]) => `${esc(k)}: ${esc(val)}`).join(" · ") : "";
  }

  function groupHTML(p, vars) {
    const list = vars || p.variantes;
    const extra = vars ? p.variantes.length - vars.length : 0;
    return `
      <section class="pgroup">
        <a class="pgroup__head" href="#/p/${p.id}">
          <img src="${imgSrc(p)}" alt="" loading="lazy">
          <span class="pgroup__title">${esc(p.nombre)}<small>${esc(CAT_BY_ID[p.cat].nombre)} · ${esc(p.marca)}</small></span>
          <span class="pgroup__more">${extra ? `+${extra} modelos` : "Ver ficha"} ›</span>
        </a>
        ${list.map((v) => `
          <div class="prow${cart[varKey(p, v)] ? " in-cart" : ""}" data-row>
            <div class="prow__info">
              <div class="prow__name">${esc(v.nombre)}</div>
              ${v.specs ? `<div class="prow__specs">${specLine(v)}</div>` : ""}
            </div>
            <div class="prow__code">${v.codigo ? esc(v.codigo) : ""}</div>
            <div class="prow__price">${priceHTML(v)}</div>
            ${ctrlHTML(p, v, "row", "prow__ctrl")}
          </div>`).join("")}
      </section>`;
  }

  /* ── Portada ───────────────────────── */
  function renderHome() {
    $("#showcase").innerHTML = SHOWCASE.map((s) => {
      const p = PROD_BY_ID[s.img], f = PROD_BY_ID[s.from], v = cheapest(f);
      return `<a class="sc" href="#/c/${s.cat}">
          <img src="${imgSrc(p)}" alt="" width="300" height="225">
          <span><span class="sc__name">${esc(s.label)}</span>
          <span class="sc__price">desde <b>${fmt(shown(v.precio))}</b>${esc(unitTxt(v))} ${ivaHTML()}</span></span>
        </a>`;
    }).join("");

    $("#home-cats").innerHTML = CATS.map((c) => {
      const items = PRODUCTS.filter((p) => p.cat === c.id);
      const cover = items.find((p) => p.destacado) || items[0];
      const models = items.reduce((s, p) => s + p.variantes.length, 0);
      return `
        <a class="cat-card" href="#/c/${c.id}">
          <span class="cat-card__img"><img src="${imgSrc(cover)}" alt="" loading="lazy"></span>
          <span class="cat-card__txt"><strong>${esc(c.nombre)}</strong><span>${plural(models, "modelo", "modelos")}</span></span>
          ${icon("i-arrow")}
        </a>`;
    }).join("");

    $("#home-featured").innerHTML = PRODUCTS.filter((p) => p.destacado).map(cardHTML).join("");
  }

  function renderStatic() {
    $("#catnav").innerHTML =
      `<a href="#/catalogo" data-nav="all">${icon("i-grid")}Todo</a>` +
      CATS.map((c) => `<a href="#/c/${c.id}" data-nav="${c.id}">${icon("c-" + c.icono)}${esc(c.nombre)}</a>`).join("");
    $("#lista-mes").textContent = DATA.lista;
    $$(".js-lista").forEach((el) => (el.textContent = DATA.lista));
    $("#year").textContent = new Date().getFullYear();
    const generic = waLink("¡Hola NesMa! Quería hacer una consulta.");
    $$("[data-wa]").forEach((a) => { a.href = generic; a.target = "_blank"; a.rel = "noopener"; });

    const tels = CFG.telefonos.map((t) =>
      `<li>${icon("i-phone")}<a href="tel:+54${t.replace(/\D/g, "").replace(/^0/, "")}">${esc(t)}</a></li>`).join("");
    $("#contact-list").innerHTML = `
      <li>${icon("i-wa")}<a href="${generic}" target="_blank" rel="noopener">WhatsApp de ventas</a></li>
      ${tels}
      <li>${icon("i-mail")}<a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a></li>
      <li>${icon("i-pin")}<a href="${esc(CFG.mapsUrl)}" target="_blank" rel="noopener">${esc(CFG.direccion)}</a></li>
      ${CFG.horario ? `<li>${icon("i-clock")}<span>${esc(CFG.horario)}</span></li>` : ""}`;
    syncPrefsUI();
  }

  function syncPrefsUI() {
    $$("[data-iva]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.iva === (prefs.iva ? "1" : "0"))));
    $$("[data-vista]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.vista === prefs.vista)));
  }

  /* ── Catálogo ───────────────────────── */
  const view = { cat: null, q: "" };

  function renderCatalog() {
    const brandSel = $("#filter-brand");
    const sort = $("#sort").value;
    let results = search(view.q);
    if (view.cat) results = results.filter((r) => r.p.cat === view.cat);

    // marcas disponibles en el contexto actual
    const brands = [...new Set(results.map((r) => r.p.marca))].sort();
    const current = brandSel.value;
    brandSel.innerHTML = `<option value="">Todas las marcas</option>` + brands.map((b) => `<option${b === current ? " selected" : ""}>${esc(b)}</option>`).join("");
    brandSel.closest(".select").hidden = brands.length < 2;
    const brand = brands.includes(current) ? current : "";
    if (brand) results = results.filter((r) => r.p.marca === brand);

    if (sort === "precio-asc") results.sort((a, b) => minPrice(a.p) - minPrice(b.p));
    if (sort === "precio-desc") results.sort((a, b) => minPrice(b.p) - minPrice(a.p));
    if (sort === "nombre") results.sort((a, b) => a.p.nombre.localeCompare(b.p.nombre, "es"));
    if (sort === "relevancia" && !view.q) results.sort((a, b) => PRODUCTS.indexOf(a.p) - PRODUCTS.indexOf(b.p));

    const cat = view.cat && CAT_BY_ID[view.cat];
    $("#catalog-title").textContent = view.q ? `Resultados para “${view.q}”` : cat ? cat.nombre : "Catálogo completo";
    $("#catalog-desc").textContent = view.q ? "" : cat ? cat.desc : `Lista de precios ${DATA.lista}. Precios en dólares.`;
    $("#crumbs").innerHTML = `<a href="#/">Inicio</a> › ${cat ? `<a href="#/catalogo">Catálogo</a> › ${esc(cat.nombre)}` : view.q ? `<a href="#/catalogo">Catálogo</a> › Búsqueda` : "Catálogo"}`;

    const isList = prefs.vista === "lista";
    const models = results.reduce((s, r) => s + (isList && r.vars ? r.vars.length : r.p.variantes.length), 0);
    $("#result-count").textContent = results.length ? `${plural(results.length, "producto", "productos")} · ${plural(models, "modelo", "modelos")}` : "";
    $("#catalog-grid").hidden = isList || !results.length;
    $("#catalog-list").hidden = !isList || !results.length;
    if (isList) $("#catalog-list").innerHTML = results.map((r) => groupHTML(r.p, r.vars)).join("");
    else $("#catalog-grid").innerHTML = results.map((r) => cardHTML(r.p)).join("");
    $("#catalog-empty").hidden = results.length > 0;
    $("[data-wa-search]").href = waLink(`¡Hola NesMa! Estoy buscando: ${view.q || ""}`);
    $("[data-wa-search]").target = "_blank";
    syncPrefsUI();
  }

  /* ── Ficha de producto (modal) ───────────────────────── */
  let openProduct = null;

  function renderProduct(p) {
    openProduct = p;
    const cat = CAT_BY_ID[p.cat];
    const n = p.variantes.length;
    const feats = p.caracteristicas || [];
    const rel = (RELATED[p.id] || []).map((id) => PROD_BY_ID[id]).filter(Boolean);
    const shownFeats = feats.slice(0, 4), moreFeats = feats.slice(4);
    $("#pd").innerHTML = `
      <div class="pd__bar">
        <div class="crumbs"><a href="#/c/${cat.id}">${esc(cat.nombre)}</a> · ${esc(p.marca)}</div>
        <div class="pd__bar-title">${esc(p.nombre)}</div>
        <button class="icon-btn" type="button" id="pd-share" aria-label="Compartir">${icon("i-share")}</button>
        <button class="icon-btn" type="button" data-close aria-label="Cerrar">${icon("i-x")}</button>
      </div>
      <div class="pd__scroll" id="pd-scroll">
        <div class="pd__grid">
          <div class="pd__media">
            <img src="${imgSrc(p)}" alt="${esc(p.nombre)}">
          </div>
          <div class="pd__info">
            <h2 id="pm-title">${esc(p.nombre)}</h2>
            ${p.resumen ? `<p class="pd__lead">${esc(p.resumen)}</p>` : ""}
            <p class="pd__from">${n > 1 ? "Desde " : ""}<b>${fmt(shown(minPrice(p)))}</b>${esc(unitTxt(cheapest(p)))} ${ivaHTML()}</p>
            ${shownFeats.length ? `<ul class="pd__features">${shownFeats.map((c) => `<li>${icon("i-check")}<span>${esc(c)}</span></li>`).join("")}</ul>` : ""}
            ${moreFeats.length || p.notas ? `<details class="pd__more"><summary>Más detalles</summary>
              ${moreFeats.length ? `<ul class="pd__features">${moreFeats.map((c) => `<li>${icon("i-check")}<span>${esc(c)}</span></li>`).join("")}</ul>` : ""}
              ${p.notas ? `<div class="pd__notes">${p.notas.map((x) => `<p>${esc(x)}</p>`).join("")}</div>` : ""}
            </details>` : ""}
            <div class="pd__label">${n > 1 ? "Elegí modelo y cantidad" : "Cantidad"}${n > 1 ? `<span>${n} modelos</span>` : ""}</div>
            <div class="vlist">
              ${p.variantes.map((v) => `
                <div class="vrow${cart[varKey(p, v)] ? " in-cart" : ""}" data-row>
                  <div class="vrow__info">
                    <div class="vrow__name">${esc(v.nombre)}</div>
                    <div class="vrow__meta">${[v.codigo ? `Cód. <b>${esc(v.codigo)}</b>` : "", specLine(v)].filter(Boolean).join(" · ")}</div>
                  </div>
                  <div class="vrow__price">${priceHTML(v)}</div>
                  ${ctrlHTML(p, v, "row", "vrow__ctrl")}
                </div>`).join("")}
            </div>
          </div>
        </div>
        ${rel.length ? `<div class="related">
          <h3>Completá tu instalación</h3>
          <div class="related__row">${rel.map((r) => `
            <a class="rel" href="#/p/${r.id}" data-replace>
              <img src="${imgSrc(r)}" alt="" loading="lazy">
              <span><strong>${esc(r.nombre)}</strong><span>${r.variantes.length > 1 ? "desde " : ""}${fmt(shown(minPrice(r)))} ${ivaHTML()}</span></span>
            </a>`).join("")}</div>
        </div>` : ""}
      </div>
      <div class="pd__foot" id="pd-foot"></div>`;
    renderModalFoot();
  }

  function renderModalFoot() {
    const p = openProduct;
    let units = 0, total = 0;
    for (const v of p.variantes) { const q = cart[varKey(p, v)] || 0; units += q; total += q * v.precio; }
    const consult = `<a class="btn btn--ghost btn--sm" target="_blank" rel="noopener"
        href="${waLink(`¡Hola NesMa! Quería consultar por: ${p.nombre}${location.protocol.startsWith("http") ? ` ${productUrl(p)}` : ""}`)}">${icon("i-wa")}<span>Consultar</span></a>`;
    $("#pd-foot").innerHTML = units
      ? `<div class="pd__sum">En tu pedido<strong>${plural(units, "unidad", "unidades")} · ${fmt(shown(total))} ${ivaHTML()}</strong></div>
         <div class="pd__foot-actions">
           <button class="btn btn--ghost btn--sm" type="button" data-close>Seguir comprando</button>
           <a class="btn btn--primary btn--sm" href="#/pedido" data-replace>Ver pedido ${icon("i-arrow")}</a>
         </div>`
      : `<div class="pd__sum">${p.variantes.length > 1 ? "Tocá <b>Agregar</b> en el modelo que necesites" : "Tocá <b>Agregar</b> para sumarlo a tu pedido"}</div>
         <div class="pd__foot-actions">${consult}</div>`;
  }

  /* ── Pedido (drawer) ───────────────────────── */
  let sentState = false;
  let editingCustomer = false;

  function renderCartSummary() {
    const { subtotal, units } = cartTotals();
    const count = $("#cart-count");
    count.textContent = units;
    count.hidden = units === 0;
    $("#cartbar").hidden = units === 0;
    document.body.classList.toggle("has-cartbar", units > 0);
    $("#cartbar-count").textContent = plural(units, "producto", "productos");
    $("#cartbar-total").textContent = `${fmt(shown(subtotal))} ${ivaTag()}`;
  }

  function renderDrawer() {
    const { lines, subtotal, units, iva, total } = cartTotals();
    const empty = lines.length === 0;
    $("#cart-sent").hidden = !sentState;
    $("#cart-empty").hidden = sentState || !empty;
    $("#cart-filled").hidden = sentState || empty;
    $("#cart-foot").hidden = sentState || empty;
    if (sentState || empty) return;

    $("#cart-list").innerHTML = lines.map((l) => `
      <li class="cart-item" data-row>
        <img src="${imgSrc(l.p)}" alt="">
        <div>
          <a class="cart-item__name" href="#/p/${l.p.id}" data-replace>${esc(l.v.nombre)}</a>
          <div class="cart-item__sub">${l.p.variantes.length > 1 ? `${esc(l.p.nombre)} · ` : ""}${l.v.codigo ? `Cód. ${esc(l.v.codigo)}` : ""}</div>
          <div class="cart-item__sub">${fmt(shown(l.v.precio))}${esc(unitTxt(l.v))} ${ivaTag()}</div>
        </div>
        <div class="cart-item__total">${fmt(shown(l.total))} ${ivaHTML()}</div>
        <div class="cart-item__ctrl">
          ${ctrlHTML(l.p, l.v, "cart")}
          <button class="icon-btn" type="button" data-remove="${esc(l.key)}" aria-label="Quitar del pedido">${icon("i-trash")}</button>
        </div>
      </li>`).join("");

    $("#cart-totals").innerHTML = `
      <div><span>Subtotal sin IVA (${plural(units, "ítem", "ítems")})</span><strong>${fmt(subtotal)}</strong></div>
      <div><span>IVA ${Math.round(CFG.iva * 100)}% estimado</span><span>${fmt(iva)}</span></div>
      <div class="grand"><span>Total estimado</span><span>${fmt(total)}</span></div>
      ${CFG.cotizacion ? `<div><span>Equivalente aprox.</span><span>${ars.format(total * CFG.cotizacion)}</span></div>` : ""}
      <span class="hint">Es una solicitud: te confirmamos stock, precio final y forma de pago por WhatsApp.</span>`;

    $("#send-total").textContent = fmt(prefs.iva ? total : subtotal) + (prefs.iva ? "" : " + IVA");
    if (!$("#who").dataset.mode || $("#who").dataset.mode !== whoMode()) renderWho();
  }

  const savedCustomer = () => store.get(CUSTOMER_KEY, null);
  const whoMode = () => (savedCustomer() && !editingCustomer ? "summary" : "form");
  let customerDraft = null;

  function renderWho() {
    const who = $("#who");
    const mode = whoMode();
    who.dataset.mode = mode;
    const c = Object.assign({ nombre: "", localidad: "", entrega: "Retiro en el local", perfil: "", comentarios: "" }, savedCustomer() || {}, customerDraft || {});
    if (mode === "summary") {
      who.innerHTML = `
        <h3>Tus datos</h3>
        <div class="who__summary">
          <span class="who__avatar">${esc((c.nombre || "?").trim().charAt(0).toUpperCase())}</span>
          <div><strong>${esc(c.nombre)}</strong>${esc(c.localidad)} · ${esc(c.entrega)}${c.perfil ? ` · ${esc(c.perfil)}` : ""}</div>
          <button class="link-btn" type="button" id="who-edit">${icon("i-edit")} Cambiar</button>
        </div>
        <div class="field" style="margin-top:10px"><label for="f-comentarios">Comentario para este pedido (opcional)</label>
          <textarea id="f-comentarios" name="comentarios" rows="2" placeholder="Ej: necesito factura A, retiro el jueves…">${esc(c.comentarios)}</textarea></div>`;
      return;
    }
    const chip = (name, val, label, checked) =>
      `<label><input type="radio" name="${name}" value="${esc(val)}"${checked ? " checked" : ""}><span>${esc(label)}</span></label>`;
    who.innerHTML = `
      <h3>Tus datos <span class="muted small">para armar el mensaje</span></h3>
      <form id="checkout" novalidate>
        <div class="field__row">
          <div class="field"><label for="f-nombre">Nombre y apellido</label><input id="f-nombre" name="nombre" required autocomplete="name" value="${esc(c.nombre)}"></div>
          <div class="field"><label for="f-localidad">Localidad</label><input id="f-localidad" name="localidad" required autocomplete="address-level2" placeholder="Ej: Wilde, Quilmes" value="${esc(c.localidad)}"></div>
        </div>
        <fieldset class="chips"><legend>Entrega</legend>
          ${chip("entrega", "Retiro en el local", "Retiro en el local", c.entrega !== "Envío a domicilio (cotizar)")}
          ${chip("entrega", "Envío a domicilio (cotizar)", "Envío (a cotizar)", c.entrega === "Envío a domicilio (cotizar)")}
        </fieldset>
        <fieldset class="chips"><legend>Sos… <span class="muted">(opcional)</span></legend>
          ${["Particular", "Instalador / gasista", "Empresa / constructora"].map((x) => chip("perfil", x, x, c.perfil === x)).join("")}
        </fieldset>
        <div class="field"><label for="f-comentarios">Comentario (opcional)</label>
          <textarea id="f-comentarios" name="comentarios" rows="2" placeholder="Ej: necesito factura A, retiro el jueves…">${esc(c.comentarios)}</textarea></div>
      </form>`;
  }

  function readCustomer() {
    const who = $("#who");
    const saved = savedCustomer() || {};
    if (who.dataset.mode === "summary") {
      return Object.assign({}, saved, { comentarios: ($("#f-comentarios").value || "").trim() });
    }
    const f = $("#checkout");
    const data = Object.fromEntries(new FormData(f).entries());
    for (const k of Object.keys(data)) data[k] = String(data[k]).trim();
    return Object.assign({ perfil: "" }, data);
  }

  function buildOrderMessage(data) {
    const { lines, subtotal, total, units } = cartTotals();
    const out = ["¡Hola NesMa! Quiero hacer este pedido:", ""];
    lines.forEach((l, i) => {
      out.push(`${i + 1}) ${l.qty}${l.v.unidad ? ` ${l.v.unidad}${l.qty === 1 ? "" : "s"}` : " ×"} ${l.v.nombre}`);
      out.push(`   ${l.p.variantes.length > 1 ? l.p.nombre : ""}${l.p.variantes.length > 1 && l.v.codigo ? " · " : ""}${l.v.codigo ? `Cód. ${l.v.codigo}` : ""}`.replace(/^\s+$/, ""));
      out.push(`   ${fmt(l.v.precio)}${l.v.unidad ? ` / ${l.v.unidad}` : " c/u"} → ${fmt(l.total)}`);
    });
    out.push("");
    out.push(`Subtotal: ${fmt(subtotal)} + IVA (${plural(units, "ítem", "ítems")})`);
    out.push(`Total estimado con IVA: ${fmt(total)}`);
    if (data && data.nombre) {
      out.push("");
      out.push(`Nombre: ${data.nombre}`);
      if (data.localidad) out.push(`Localidad: ${data.localidad}`);
      if (data.entrega) out.push(`Entrega: ${data.entrega}`);
      if (data.perfil) out.push(`Perfil: ${data.perfil}`);
    }
    if (data && data.comentarios) out.push(`Comentarios: ${data.comentarios}`);
    out.push("");
    out.push(`(Pedido armado en la web · lista ${DATA.lista})`);
    return out.filter((line, i, arr) => !(line === "" && arr[i - 1] === "")).join("\n").replace(/\n {3}\n/g, "\n");
  }

  function sendOrder() {
    const data = readCustomer();
    if ($("#who").dataset.mode === "form") {
      const f = $("#checkout");
      let firstBad = null;
      ["nombre", "localidad"].forEach((k) => {
        const bad = !data[k];
        f.elements[k].classList.toggle("is-invalid", bad);
        if (bad && !firstBad) firstBad = f.elements[k];
      });
      $("#checkout-error").hidden = !firstBad;
      if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
      store.set(CUSTOMER_KEY, { nombre: data.nombre, localidad: data.localidad, entrega: data.entrega, perfil: data.perfil });
      editingCustomer = false;
    }
    customerDraft = { comentarios: data.comentarios };
    const url = waLink(buildOrderMessage(data));
    window.open(url, "_blank", "noopener");
    $("#sent-reopen").href = url;
    sentState = true;
    renderDrawer();
  }

  async function copyOrder() {
    let data = null;
    try { data = readCustomer(); } catch (e) { /* sin formulario visible */ }
    const text = buildOrderMessage(data);
    try {
      await navigator.clipboard.writeText(text);
      toast("Pedido copiado. Podés pegarlo en WhatsApp o en un mail.");
    } catch (e) {
      window.prompt("Copiá el pedido:", text);
    }
  }

  /* ── Toast con acción ───────────────────────── */
  let toastTimer, toastAction = null;
  function toast(msg, action) {
    const t = $("#toast");
    toastAction = action || null;
    t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button" data-toast-action>${esc(action.label)}</button>` : ""}`;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), action ? 6000 : 3200);
  }

  /* ── Buscador con sugerencias ───────────────────────── */
  let sgItems = [], sgActive = -1, sgQuery = "";

  function renderSuggest() {
    const input = $("#search"), box = $("#suggest");
    const q = input.value.trim();
    sgQuery = q;
    if (q.length < 2) { closeSuggest(); return; }
    const results = search(q);
    const rows = [];
    for (const r of results) {
      if (rows.length >= 7) break;
      const vars = r.vars || (r.p.variantes.length === 1 ? r.p.variantes : null);
      if (vars) {
        for (const v of vars.slice(0, r.vars ? 4 : 1)) {
          if (rows.length >= 7) break;
          rows.push({ p: r.p, v });
        }
      } else rows.push({ p: r.p, v: null });
    }
    sgItems = rows;
    sgActive = -1;
    box.innerHTML = rows.length
      ? `<div class="suggest__label">${plural(results.length, "producto", "productos")}</div>` +
        rows.map((r, i) => {
          if (r.v) {
            const key = varKey(r.p, r.v), qty = cart[key] || 0;
            return `<div class="sg" role="option" id="sg-${i}" data-sg="${i}">
              <img src="${imgSrc(r.p)}" alt="">
              <div><div class="sg__name">${highlight(r.v.nombre, q)}</div>
                <div class="sg__sub">${r.v.codigo ? `${highlight(r.v.codigo, q)} · ` : ""}${esc(r.p.nombre)} <b class="hide-lg">· ${fmt(shown(r.v.precio))} ${ivaTag()}</b></div></div>
              <div class="sg__price">${fmt(shown(r.v.precio))}<small>${esc(unitTxt(r.v))}</small> ${ivaHTML()}</div>
              <button type="button" class="sg__add${qty ? " is-in" : ""}" data-sg-add="${esc(key)}" aria-label="Agregar ${esc(r.v.nombre)} al pedido">${qty ? qty : icon("i-plus")}</button>
            </div>`;
          }
          return `<div class="sg" role="option" id="sg-${i}" data-sg="${i}">
            <img src="${imgSrc(r.p)}" alt="">
            <div><div class="sg__name">${highlight(r.p.nombre, q)}</div>
              <div class="sg__sub">${r.p.variantes.length} modelos · desde ${fmt(shown(minPrice(r.p)))} ${ivaTag()}</div></div>
            <div class="sg__price"></div>
            <span class="sg__add" aria-hidden="true">${icon("i-arrow")}</span>
          </div>`;
        }).join("") +
        `<button type="button" class="suggest__all" data-sg-all>Ver todos los resultados ${icon("i-arrow")}</button>`
      : `<div class="suggest__empty">No encontramos “${esc(q)}”. Probá con otra palabra o <a href="${waLink(`¡Hola NesMa! Estoy buscando: ${q}`)}" target="_blank" rel="noopener">consultanos por WhatsApp</a>.</div>`;
    positionSuggest();
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function positionSuggest() {
    const box = $("#suggest");
    if (window.innerWidth <= 640) box.style.top = `${$("#search").getBoundingClientRect().bottom + 6}px`;
    else box.style.top = "";
  }

  function closeSuggest() {
    $("#suggest").hidden = true;
    $("#search").setAttribute("aria-expanded", "false");
    $("#search").removeAttribute("aria-activedescendant");
    sgActive = -1;
  }

  function moveSuggest(dir) {
    const opts = $$("#suggest .sg, #suggest .suggest__all");
    if (!opts.length) return;
    // -1 = foco en el campo de texto; recorre las opciones en círculo
    sgActive += dir;
    if (sgActive < -1) sgActive = opts.length - 1;
    if (sgActive >= opts.length) sgActive = -1;
    opts.forEach((o, i) => o.classList.toggle("is-active", i === sgActive));
    if (sgActive >= 0) { opts[sgActive].scrollIntoView({ block: "nearest" }); $("#search").setAttribute("aria-activedescendant", opts[sgActive].id || ""); }
  }

  function submitSearch() {
    const q = $("#search").value.trim();
    closeSuggest();
    $("#search").blur();
    location.hash = q ? `#/buscar/${encodeURIComponent(q)}` : "#/catalogo";
  }

  function openSuggestion(i) {
    const r = sgItems[i];
    if (!r) return;
    closeSuggest();
    $("#search").blur();
    location.hash = `#/p/${r.p.id}`;
  }

  /* ── Navegación (hash) ───────────────────────── */
  let bgHash = null;          // última vista de fondo (inicio / catálogo)
  let overlayFromApp = false; // si el overlay se abrió navegando dentro del sitio (se cierra con "atrás")
  let lastFocus = null;

  function parse(hash) {
    const [, section = "", ...rest] = (hash || "#/").split("/");
    return { section, arg: decodeURIComponent(rest.join("/")) };
  }

  function route() {
    const hash = location.hash || "#/";
    const { section, arg } = parse(hash);
    const isOverlay = (section === "p" && PROD_BY_ID[arg]) || section === "pedido";
    closeSuggest();

    if (isOverlay) {
      if (bgHash === null) { renderBackground("#/"); overlayFromApp = false; }
      else if (!isOverlayOpen()) overlayFromApp = true;
      if (section === "p") { hideDrawer(); showModal(PROD_BY_ID[arg]); }
      else { hideModal(); showDrawer(); }
      return;
    }
    hideModal(); hideDrawer();
    if (hash !== bgHash) renderBackground(hash);
  }

  function renderBackground(hash) {
    bgHash = hash;
    const { section, arg } = parse(hash);
    let name = "catalog";
    if (section === "c" && CAT_BY_ID[arg]) { view.cat = arg; view.q = ""; }
    else if (section === "catalogo") { view.cat = null; view.q = ""; }
    else if (section === "buscar" && arg) { view.cat = null; view.q = arg; }
    else { name = "home"; view.cat = null; view.q = ""; }
    $("#search").value = view.q;
    $("#filter-brand").value = "";
    $("#view-home").hidden = name !== "home";
    $("#view-catalog").hidden = name !== "catalog";
    if (name === "catalog") renderCatalog();
    window.scrollTo({ top: 0, behavior: "instant" });
    $$("#catnav a").forEach((a) => a.classList.toggle("is-active",
      (section === "c" && a.dataset.nav === arg) || (section === "catalogo" && a.dataset.nav === "all")));
    const active = $("#catnav a.is-active");
    if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" });
    document.title = name === "home" ? TITLE : `${$("#catalog-title").textContent} · NesMa`;
    revealHeader();
  }

  const isOverlayOpen = () => !$("#product-modal").hidden || !$("#cart-drawer").hidden;

  function closeOverlay() {
    if (overlayFromApp) history.back();
    else location.replace(bgHash || "#/");
  }

  function showModal(p) {
    if (!isOverlayOpen()) lastFocus = document.activeElement;
    renderProduct(p);
    $("#product-modal").hidden = false;
    $("#pd-scroll").scrollTop = 0;
    document.body.classList.add("lock");
    document.title = `${p.nombre} · NesMa`;
    setTimeout(() => $("#pd [data-close]").focus({ preventScroll: true }), 0);
  }

  function hideModal() {
    if ($("#product-modal").hidden) return;
    $("#product-modal").hidden = true;
    openProduct = null;
    afterOverlayClose();
  }

  function showDrawer() {
    if (!isOverlayOpen()) lastFocus = document.activeElement;
    $("#toast").hidden = true;
    editingCustomer = false;
    $("#who").dataset.mode = "";
    $("#checkout-error").hidden = true;
    renderDrawer();
    $("#cart-drawer").hidden = false;
    document.body.classList.add("lock");
    setTimeout(() => $("#cart-drawer [data-close]").focus({ preventScroll: true }), 0);
  }

  function hideDrawer() {
    if ($("#cart-drawer").hidden) return;
    const c = $("#f-comentarios");
    if (c) customerDraft = Object.assign({}, customerDraft, { comentarios: c.value });
    $("#cart-drawer").hidden = true;
    afterOverlayClose();
  }

  function afterOverlayClose() {
    if (isOverlayOpen()) return;
    document.body.classList.remove("lock");
    document.title = $("#view-home").hidden ? `${$("#catalog-title").textContent} · NesMa` : TITLE;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }

  function trapFocus(e) {
    const panel = !$("#product-modal").hidden ? $("#product-modal .modal__panel") : !$("#cart-drawer").hidden ? $("#cart-drawer .drawer__panel") : null;
    if (!panel) return;
    const f = $$("a[href], button:not([disabled]), input, textarea, select", panel).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ── Cabecera que se esconde al bajar (mobile) ───────────────────────── */
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    const mobile = window.innerWidth <= 640;
    const searching = document.activeElement === $("#search") || !$("#suggest").hidden;
    if (mobile && !searching && y > 160 && y > lastY + 6) hideHeader();
    else if (y < lastY - 6 || y < 80 || !mobile) revealHeader();
    lastY = y;
  }
  function hideHeader() { $("#header").classList.add("is-hidden"); document.body.classList.add("header-hidden"); }
  function revealHeader() { $("#header").classList.remove("is-hidden"); document.body.classList.remove("header-hidden"); }
  function measureHeader() { document.documentElement.style.setProperty("--header-h", `${$("#header").offsetHeight}px`); }

  /* ── Eventos ───────────────────────── */
  function stepQty(box, dir) {
    const key = box.dataset.key;
    const step = Number(box.dataset.stepSize) || 1;
    const now = cart[key] || 0;
    const next = Math.max(0, now + dir * step);
    if (next === 0 && box.closest(".cart-item")) {
      const f = findVar(key);
      removeWithUndo([key], `Quitaste ${f ? f.v.nombre : "el producto"}`);
    } else setQty(key, next);
  }

  function rerenderPrices() {
    renderHome();
    if (!$("#view-catalog").hidden) renderCatalog();
    if (openProduct) { const s = $("#pd-scroll").scrollTop; renderProduct(openProduct); $("#pd-scroll").scrollTop = s; }
    renderCartSummary();
    if (!$("#cart-drawer").hidden) renderDrawer();
    syncPrefsUI();
  }

  function bind() {
    document.addEventListener("click", (e) => {
      const t = e.target;

      const stepBtn = t.closest(".qty button[data-step]");
      if (stepBtn) { stepQty(stepBtn.closest(".qty"), Number(stepBtn.dataset.step)); return; }

      const add = t.closest("[data-add-key]");
      if (add) {
        setQty(add.dataset.addKey, Number(add.dataset.stepSize) || 1);
        const ctrl = $(`[data-ctrl="${CSS.escape(add.dataset.addKey)}"] input`);
        if (ctrl && window.innerWidth > 640) ctrl.focus({ preventScroll: true });
        return;
      }

      const sgAdd = t.closest("[data-sg-add]");
      if (sgAdd) {
        const f = findVar(sgAdd.dataset.sgAdd);
        setQty(sgAdd.dataset.sgAdd, (cart[sgAdd.dataset.sgAdd] || 0) + stepOf(f.v));
        toast(`Agregado: ${f.v.nombre}`, { label: "Ver pedido", fn: () => { closeSuggest(); location.hash = "#/pedido"; } });
        return;
      }
      const sg = t.closest("[data-sg]");
      if (sg) { openSuggestion(Number(sg.dataset.sg)); return; }
      if (t.closest("[data-sg-all]")) { submitSearch(); return; }

      if (t.closest("[data-toast-action]")) { const a = toastAction; $("#toast").hidden = true; if (a) a.fn(); return; }

      const rm = t.closest("[data-remove]");
      if (rm) { const f = findVar(rm.dataset.remove); removeWithUndo([rm.dataset.remove], `Quitaste ${f ? f.v.nombre : "el producto"}`); return; }

      const iva = t.closest("[data-iva]");
      if (iva) { prefs.iva = iva.dataset.iva === "1"; savePrefs(); rerenderPrices(); return; }

      const vista = t.closest("[data-vista]");
      if (vista) { prefs.vista = vista.dataset.vista; savePrefs(); renderCatalog(); return; }

      const setVista = t.closest("[data-set-vista]");
      if (setVista) {
        prefs.vista = setVista.dataset.setVista; savePrefs();
        // si el catálogo de destino ya está dibujado de fondo, se redibuja acá; si no, lo hace el ruteo
        if (bgHash === setVista.getAttribute("href") && !$("#view-catalog").hidden) renderCatalog();
        if (location.hash === setVista.getAttribute("href")) { e.preventDefault(); window.scrollTo({ top: 0 }); }
      }

      if (t.closest("[data-copy-order]")) { copyOrder(); return; }
      if (t.closest("#pd-share")) { shareProduct(openProduct); return; }
      if (t.closest("#who-edit")) {
        const c = $("#f-comentarios"); customerDraft = { comentarios: c ? c.value : "" };
        editingCustomer = true; renderWho(); $("#f-nombre").focus(); return;
      }

      const repl = t.closest("a[data-replace]");
      if (repl) { e.preventDefault(); location.replace(repl.getAttribute("href")); return; }

      if (t.closest("[data-close]")) { e.preventDefault(); closeOverlay(); return; }
    });

    document.addEventListener("change", (e) => {
      const input = e.target.closest(".qty input");
      if (!input) return;
      const box = input.closest(".qty");
      const qty = Math.max(0, parseInt(input.value, 10) || 0);
      if (qty === 0 && box.closest(".cart-item")) {
        const f = findVar(box.dataset.key);
        removeWithUndo([box.dataset.key], `Quitaste ${f ? f.v.nombre : "el producto"}`);
      } else setQty(box.dataset.key, qty);
    });
    document.addEventListener("focusin", (e) => { if (e.target.matches(".qty input")) e.target.select(); });

    $("#send-order").addEventListener("click", sendOrder);
    $("#cart-body").addEventListener("input", (e) => {
      e.target.classList.remove("is-invalid");
      if (e.target.name === "comentarios") customerDraft = Object.assign({}, customerDraft, { comentarios: e.target.value });
      if (e.target.closest("#checkout")) {
        const f = $("#checkout");
        customerDraft = Object.fromEntries(new FormData(f).entries());
        $("#checkout-error").hidden = true;
      }
    });
    $("#cart-body").addEventListener("change", (e) => {
      if (e.target.closest("#checkout")) customerDraft = Object.fromEntries(new FormData($("#checkout")).entries());
    });
    $("#cart-clear").addEventListener("click", () => removeWithUndo(Object.keys(cart), "Vaciaste el pedido"));
    $("#sent-new").addEventListener("click", () => {
      cart = {}; store.set(CART_KEY, cart); sentState = false; customerDraft = null;
      syncCart(); renderDrawer();
    });
    $("#sent-back").addEventListener("click", () => { sentState = false; renderDrawer(); });

    // buscador
    const input = $("#search");
    let sgTimer;
    input.addEventListener("input", () => { clearTimeout(sgTimer); sgTimer = setTimeout(renderSuggest, 90); });
    input.addEventListener("focus", () => { revealHeader(); if (input.value.trim().length >= 2) renderSuggest(); });
    input.addEventListener("blur", () => setTimeout(() => { if (!$("#suggest").contains(document.activeElement)) closeSuggest(); }, 150));
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); if ($("#suggest").hidden) renderSuggest(); else moveSuggest(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveSuggest(-1); }
      else if (e.key === "Escape") { if (!$("#suggest").hidden) { e.stopPropagation(); closeSuggest(); } else input.blur(); }
      else if (e.key === "Enter") {
        e.preventDefault();
        const opts = $$("#suggest .sg, #suggest .suggest__all");
        if (sgActive >= 0 && opts[sgActive]) opts[sgActive].click(); else submitSearch();
      }
    });
    $("#suggest").addEventListener("mousedown", (e) => { if (!e.target.closest("a")) e.preventDefault(); });
    $("#search-form").addEventListener("submit", (e) => { e.preventDefault(); submitSearch(); });

    $("#filter-brand").addEventListener("change", renderCatalog);
    $("#sort").addEventListener("change", renderCatalog);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") trapFocus(e);
      if (e.key === "/" && !isOverlayOpen() && !/input|textarea|select/i.test(document.activeElement.tagName)) {
        e.preventDefault(); revealHeader(); $("#search").focus();
      }
      if (e.key === "Escape" && isOverlayOpen()) closeOverlay();
    });

    window.addEventListener("hashchange", route);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measureHeader(); if (!$("#suggest").hidden) positionSuggest(); });
    window.addEventListener("storage", (e) => { if (e.key === CART_KEY) { cart = store.get(CART_KEY, {}); syncCart(); } });
  }

  async function shareProduct(p) {
    const url = productUrl(p);
    const data = { title: `${p.nombre} · NesMa`, text: `${p.nombre} — desde ${fmt(minPrice(p))} + IVA`, url };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(url);
      toast("Link del producto copiado");
    } catch (e) { /* el usuario canceló */ }
  }

  /* ── Inicio ───────────────────────── */
  renderStatic();
  renderHome();
  bind();
  renderCartSummary();
  measureHeader();
  route();
})();
