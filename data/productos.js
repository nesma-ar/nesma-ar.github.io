/*
 * Catálogo NesMa — fuente: "Lista de precios Agosto 2026" (PDF).
 * Precios en dólares (U$S), SIN IVA.
 *
 * Cada producto es una familia con una o más variantes:
 *   { nombre, codigo?, precio, specs?: { "Columna": "valor" }, unidad? }
 * Para actualizar precios alcanza con editar este archivo.
 */
window.NESMA_CATALOGO = {
  lista: "Agosto 2026",
  /* "Completá tu instalación": productos sugeridos en la ficha de cada uno */
  relacionados: {
    "ecco-24": ["kit-conexiones", "kit-humos-coaxial", "termostatos", "kit-flexibles"],
    "serie-s": ["kit-conexiones", "kit-humos-coaxial", "termostatos", "tubo-coaxial"],
    "serie-top-x": ["kit-conexiones", "kit-humos-80", "termostatos", "tubo-aluminio"],
    "serie-x": ["kit-conexiones", "termostatos", "kit-flexibles"],
    "s30": ["kit-conexiones", "termostatos", "kit-flexibles"],
    "serie-m": ["termostatos", "mezcladora", "colector-multibomba", "recarga"],
    "calefon-35tbf": ["flex-calefon", "codos-coaxiales", "tubo-coaxial"],
    "calefon-26tbf": ["flex-calefon", "codos-coaxiales", "tubo-coaxial"],
    "unical-g": ["unical-accesorios"],
    "gen-300": ["termostato-tanque", "bombas-caldaia"],
    "tanque-inox": ["termostato-tanque", "vaso-expansion"],
    "tanque-vitrificado": ["termostato-tanque", "vaso-expansion"],
    "clan-n": ["valvulas-caldaia", "blister", "mensulas", "niples"],
    "novo": ["valvulas-caldaia", "blister", "mensulas", "niples"],
    "bit": ["valvulas-caldaia", "blister", "mensulas"],
    "lux": ["valvulas-caldaia", "blister", "mensulas", "niples"],
    "termobano": ["valvulas-caleffi", "niples"],
    "pex": ["colector-completo", "codos-pex", "te-pex", "herramientas-prensa"],
    "colector-completo": ["pex", "cabezal-colector", "flujostato"],
    "colector-bronce": ["caja-colector", "valvula-esferica", "adaptador-colector", "cabezal-colector"],
    "climatizador-cp": ["kit-humos-piscina", "intercambiador"],
    "climatizador-cp70-pro": ["kit-humos-piscina"],
    "termostatos": ["serie-s", "ecco-24"],
    "herramientas-prensa": ["casquillos", "abocardadora", "pex"]
  },
  categorias: [
    { id: "calderas-murales", nombre: "Calderas murales", icono: "flame", desc: "Doble servicio y solo calefacción, tiro natural, forzado o balanceado." },
    { id: "calderas-pie", nombre: "Calderas de pie", icono: "box", desc: "Serie M de alta potencia para calefacción central." },
    { id: "agua-caliente", nombre: "Agua caliente", icono: "drop", desc: "Calefones, sistema Unical, centrales generadoras y tanques acumuladores." },
    { id: "radiadores", nombre: "Radiadores y toalleros", icono: "grid", desc: "Aluminio inyectado, eléctricos y toalleros de acero." },
    { id: "piso-radiante", nombre: "Piso radiante y PEX", icono: "layers", desc: "Tubos PEX, colectores, accesorios de tendido y herramientas." },
    { id: "bombas", nombre: "Bombas y vasos", icono: "gauge", desc: "Circuladoras, presurizadoras y vasos de expansión." },
    { id: "piscinas", nombre: "Climatizadores de piscina", icono: "wave", desc: "Climatizadores a gas e intercambiadores de acero inoxidable." },
    { id: "accesorios-calderas", nombre: "Accesorios para calderas", icono: "plug", desc: "Conexiones, salidas de humos, termostatos y opcionales." },
    { id: "accesorios-radiadores", nombre: "Accesorios para radiadores", icono: "wrench", desc: "Válvulas, cabezales, blisters, ménsulas y niples." }
  ],
  productos: [
    /* ───────────── CALDERAS MURALES ───────────── */
    {
      id: "ecco-24", cat: "calderas-murales", marca: "Caldaia", destacado: true,
      nombre: "Caldera mural ECCO 24", img: "ecco24",
      resumen: "Doble servicio, tiro balanceado, 26.000 kcal/h con modulación continua.",
      caracteristicas: [
        "Máximo ahorro de gas gracias a su sistema de modulación continua de llama",
        "Control digital para seleccionar y regular el servicio deseado fácilmente",
        "Indicación de funciones y anomalías en pantalla de cristal líquido",
        "Funcionamiento silencioso"
      ],
      notas: ["Versión “P” configurada para piso radiante."],
      variantes: [
        { nombre: "ECCO 24 / ECCO 24 P", precio: 1285, specs: { "Potencia (kcal/h)": "8.000 / 26.000", "Servicio": "Dual", "Tiro": "Balanceado" } }
      ]
    },
    {
      id: "serie-s", cat: "calderas-murales", marca: "Caldaia", destacado: true,
      nombre: "Calderas murales Digital TOP Serie S", img: "serie-s",
      resumen: "26.000 kcal/h. Solo calefacción o dual, tiro balanceado o forzado.",
      caracteristicas: [
        "Máximo ahorro de gas gracias a su sistema de modulación continua de llama",
        "Control digital para seleccionar y regular el servicio deseado fácilmente",
        "Indicación de funciones y anomalías en pantalla de cristal líquido",
        "Funcionamiento silencioso"
      ],
      notas: [
        "* Versiones “P” configuradas para piso radiante.",
        "** Versión V3V con predisposición para tanque acumulador / sistema solar."
      ],
      variantes: [
        { nombre: "Digital TOP S26f / S26fP", precio: 1592, specs: { "Potencia (kcal/h)": "8.700 / 26.000", "Servicio": "Solo calefacción", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP S26T / S26TP", precio: 1592, specs: { "Potencia (kcal/h)": "8.700 / 26.000", "Servicio": "Solo calefacción", "Tiro": "Forzado" } },
        { nombre: "Digital TOP Sa26f / Sa26fP", precio: 1592, specs: { "Potencia (kcal/h)": "8.700 / 26.000", "Servicio": "Dual", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP Sa26T / Sa26TP", precio: 1592, specs: { "Potencia (kcal/h)": "8.700 / 26.000", "Servicio": "Dual", "Tiro": "Forzado" } },
        { nombre: "Digital TOP S26f / S26fP V3V", precio: 1690, specs: { "Potencia (kcal/h)": "8.700 / 26.000", "Servicio": "Calefacción + bollitore", "Tiro": "Balanceado" } }
      ]
    },
    {
      id: "serie-top-x", cat: "calderas-murales", marca: "Caldaia",
      nombre: "Calderas murales Digital TOP Serie X", img: "serie-top-x",
      resumen: "Hasta 34.000 kcal/h. Para viviendas grandes o mayor demanda.",
      caracteristicas: [
        "Máximo ahorro de gas gracias a su sistema de modulación continua de llama",
        "Control digital para seleccionar y regular el servicio deseado fácilmente",
        "Indicación de funciones y anomalías en pantalla de cristal líquido",
        "Funcionamiento silencioso"
      ],
      notas: [
        "* Versiones “P” configuradas para piso radiante.",
        "** Versiones V3V con predisposición para tanque acumulador / sistema solar."
      ],
      variantes: [
        { nombre: "Digital TOP X30f / X30fP", precio: 1754, specs: { "Potencia (kcal/h)": "9.200 / 30.500", "Servicio": "Solo calefacción", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP X30f / X30fP V3V", precio: 1853, specs: { "Potencia (kcal/h)": "9.200 / 30.500", "Servicio": "Solo calefacción", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP X35f / X35fP", precio: 1937, specs: { "Potencia (kcal/h)": "12.000 / 34.000", "Servicio": "Solo calefacción", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP X35f / X35fP V3V", precio: 2035, specs: { "Potencia (kcal/h)": "12.000 / 34.000", "Servicio": "Solo calefacción", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP Xa30f / Xa30fP", precio: 1754, specs: { "Potencia (kcal/h)": "9.200 / 30.500", "Servicio": "Dual", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP Xa35f / Xa35fP", precio: 1937, specs: { "Potencia (kcal/h)": "12.000 / 34.000", "Servicio": "Dual", "Tiro": "Balanceado" } },
        { nombre: "Digital TOP Xa30T / Xa30TP", precio: 1754, specs: { "Potencia (kcal/h)": "9.200 / 30.500", "Servicio": "Dual", "Tiro": "Forzado" } }
      ]
    },
    {
      id: "serie-x", cat: "calderas-murales", marca: "Caldaia",
      nombre: "Caldera mural Digital Xa30 (tiro natural)", img: "serie-x",
      resumen: "Doble servicio con tiro natural, ideal para reemplazos con conducto existente.",
      caracteristicas: [
        "Máximo ahorro de gas gracias a su sistema de modulación continua de llama",
        "Control digital para seleccionar y regular el servicio deseado fácilmente",
        "Indicación de funciones y anomalías en pantalla de cristal líquido",
        "Funcionamiento silencioso"
      ],
      variantes: [
        { nombre: "Digital Xa30 · 30.500 kcal/h", precio: 1910, specs: { "Potencia (kcal/h)": "8.000 / 30.500", "Servicio": "Dual", "Tiro": "Natural" } },
        { nombre: "Digital Xa30 · 19.800 kcal/h", precio: 1910, specs: { "Potencia (kcal/h)": "8.000 / 19.800", "Servicio": "Dual", "Tiro": "Natural" } }
      ]
    },
    {
      id: "s30", cat: "calderas-murales", marca: "Caldaia",
      nombre: "Caldera mural Digital S30", img: "s30",
      resumen: "Solo calefacción, tiro natural, con bomba y vaso de expansión incorporados.",
      caracteristicas: [
        "Máximo ahorro de gas gracias a su sistema de modulación continua de llama",
        "Control digital para seleccionar y regular el servicio deseado fácilmente",
        "Funcionamiento silencioso",
        "Bomba circuladora y vaso de expansión incorporados",
        "Indicador digital de anomalías de funcionamiento"
      ],
      variantes: [
        { nombre: "Digital S30", precio: 1616, specs: { "Potencia (kcal/h)": "8.000 / 30.500", "Servicio": "Solo calefacción", "Tiro": "Natural" } }
      ]
    },

    /* ───────────── CALDERAS DE PIE ───────────── */
    {
      id: "serie-m", cat: "calderas-pie", marca: "Caldaia", destacado: true,
      nombre: "Calderas de pie Digital Serie M", img: "serie-m",
      resumen: "Solo calefacción, hasta 70.000 kcal/h. Instalables en paralelo.",
      caracteristicas: [
        "Máximo ahorro de gas gracias a su sistema de modulación continua de llama",
        "Control digital para la regulación de la temperatura del circuito de calefacción",
        "Opción de instalación en paralelo, llevando la potencia a más de 100.000 kcal/h",
        "Indicador digital de anomalías de funcionamiento",
        "Funcionamiento silencioso",
        "Bomba circuladora y vaso de expansión incorporados"
      ],
      notas: [
        "Los modelos M70f y M70fP incluyen el kit de salida de humos.",
        "* Versiones “P” configuradas para piso radiante.",
        "** Versiones “E” sin bomba y sin vaso de expansión incorporado."
      ],
      variantes: [
        { nombre: "Digital M60", precio: 3613, specs: { "Potencia (kcal/h)": "16.000 / 61.000", "Tiro": "Natural" } },
        { nombre: "Digital M60E", precio: 3515, specs: { "Potencia (kcal/h)": "16.000 / 61.000", "Tiro": "Natural" } },
        { nombre: "Digital M60P", precio: 3613, specs: { "Potencia (kcal/h)": "16.000 / 61.000", "Tiro": "Natural" } },
        { nombre: "Digital M60PE", precio: 3515, specs: { "Potencia (kcal/h)": "16.000 / 61.000", "Tiro": "Natural" } },
        { nombre: "Digital M70f", precio: 3952, specs: { "Potencia (kcal/h)": "16.000 / 70.000", "Tiro": "Forzado" } },
        { nombre: "Digital M70fP", precio: 3952, specs: { "Potencia (kcal/h)": "16.000 / 70.000", "Tiro": "Forzado" } }
      ]
    },

    /* ───────────── AGUA CALIENTE ───────────── */
    {
      id: "calefon-35tbf", cat: "agua-caliente", marca: "Caldaia", destacado: true,
      nombre: "Calefón Digital TOP 35TBF", img: "calefon-35",
      resumen: "23 litros/min, tiro balanceado. Incluye kit de salida de humos.",
      caracteristicas: [
        "Control digital de la temperatura de agua caliente",
        "Alta recuperación: genera 23 litros/min",
        "Tiraje balanceado: gran seguridad en locales habitables",
        "Clase de eficiencia energética A"
      ],
      notas: ["El precio incluye el kit de salida de humos."],
      variantes: [
        { nombre: "Digital TOP 35TBF", precio: 982, specs: { "Potencia (kcal/h)": "12.000 / 34.000", "Tiro": "Balanceado (coaxial o tubos separados)" } }
      ]
    },
    {
      id: "calefon-26tbf", cat: "agua-caliente", marca: "Caldaia",
      nombre: "Calefón Digital TOP 26TBF", img: "calefon-26",
      resumen: "17 litros/min, tiro balanceado. Incluye kit de salida de humos.",
      caracteristicas: [
        "Control digital de la temperatura de agua caliente",
        "Alta recuperación: genera 17 litros/min",
        "Tiraje balanceado: gran seguridad en locales habitables",
        "Clase de eficiencia energética A"
      ],
      notas: ["El precio incluye el kit de salida de humos."],
      variantes: [
        { nombre: "Digital TOP 26TBF", precio: 702, specs: { "Potencia (kcal/h)": "8.700 / 26.000", "Tiro": "Balanceado (coaxial o tubos separados)" } }
      ]
    },
    {
      id: "unical-g", cat: "agua-caliente", marca: "Unical",
      nombre: "Sistema Unical Digital G30 / G60", img: "unical-g",
      resumen: "Calefacción y agua caliente sin chimenea ni conexión de gas en el departamento.",
      caracteristicas: [
        "Control digital de regulación de temperaturas",
        "Dimensiones reducidas: alto 34 cm, ancho 53 cm, profundidad 26 cm",
        "Sin chimenea",
        "Sin conexión de gas"
      ],
      notas: ["* Versiones “P” configuradas para piso radiante."],
      variantes: [
        { nombre: "Digital G30 / G30P", precio: 982, specs: { "Potencia (kcal/h)": "3.000 / 25.000", "ACS (l/h)": "1.250" } },
        { nombre: "Digital G60 / G60P", precio: 1151, specs: { "Potencia (kcal/h)": "5.000 / 60.000", "ACS (l/h)": "2.500" } }
      ]
    },
    {
      id: "unical-accesorios", cat: "agua-caliente", marca: "Unical",
      nombre: "Accesorios Unical", img: "tanque-200",
      resumen: "Tanque acumulador de 200 l en acero inoxidable, flexibles y medidor de consumo.",
      caracteristicas: ["Tanque construido en acero inoxidable"],
      variantes: [
        { nombre: "Tanque acumulador de 200 l", codigo: "09-004-01", precio: 982 },
        { nombre: "Kit flexibles Unical", codigo: "04-164-01", precio: 124 },
        { nombre: "Medidor de consumo Unical", codigo: "04-155-01", precio: 137 }
      ]
    },
    {
      id: "gen-300", cat: "agua-caliente", marca: "Caldaia",
      nombre: "Central generadora de agua caliente Gen 300", img: "gen300",
      resumen: "De 1.700 a 4.500 l/h para edificios, comercios e industrias.",
      caracteristicas: [
        "Fabricada en acero inoxidable",
        "Alta capacidad de generación de agua caliente en un producto económico",
        "Ideal para salas de máquinas o locales con accesos reducidos (puerta mínima de 60 cm)",
        "Acumulador de 300 litros que cubre picos de demanda sin restringir el servicio",
        "Tanque con control digital de temperatura, grifo de descarga, ánodo de sacrificio y válvula de sobrepresión",
        "Aislación térmica · equipos de tiro balanceado",
        "Conexión en baterías para altas exigencias de agua caliente"
      ],
      notas: ["El precio incluye el kit de salida de humos coaxial Ø60/100."],
      variantes: [
        { nombre: "Gen 300-1", precio: 4326, specs: { "ACS (l/h)": "1.700", "Potencia máx. (kcal/h)": "34.400" } },
        { nombre: "Gen 300-2", precio: 6687, specs: { "ACS (l/h)": "3.100", "Potencia máx. (kcal/h)": "68.800" } },
        { nombre: "Gen 300-3", precio: 9048, specs: { "ACS (l/h)": "4.500", "Potencia máx. (kcal/h)": "103.200" } }
      ]
    },
    {
      id: "tanque-inox", cat: "agua-caliente", marca: "Caldaia",
      nombre: "Tanque acumulador de acero inoxidable con serpentina", img: "tanque-inox",
      resumen: "300 o 500 litros, para agua caliente sanitaria.",
      caracteristicas: ["Tanque con 1 serpentín para agua caliente sanitaria", "Aislación térmica", "Fabricado en acero inoxidable"],
      variantes: [
        { nombre: "Tanque 300", codigo: "09-006-01", precio: 2105, specs: { "Capacidad (l)": "300", "ACS máx. (l/h)": "2.000", "Medidas (mm)": "Ø560 × 1760" } },
        { nombre: "Tanque 500", codigo: "09-007-01", precio: 2807, specs: { "Capacidad (l)": "500", "ACS máx. (l/h)": "2.600", "Medidas (mm)": "Ø700 × 1960" } }
      ]
    },
    {
      id: "tanque-vitrificado", cat: "agua-caliente", marca: "Caldaia",
      nombre: "Tanque acumulador vitrificado con serpentina 600", img: "tanque-vitrificado",
      resumen: "589 litros, tratamiento interno vitrificado y funda de PVC.",
      caracteristicas: ["Tanque con 1 serpentín para agua caliente sanitaria", "Aislación térmica con funda exterior de PVC", "Tratamiento interno de vitrificado"],
      variantes: [
        { nombre: "Tanque 600", codigo: "30-156-01", precio: 2807, specs: { "Capacidad (l)": "589", "ACS máx. (l/h)": "2.709", "Medidas (mm)": "Ø790 × 1960" } }
      ]
    },
    {
      id: "flex-calefon", cat: "agua-caliente", marca: "Caldaia",
      nombre: "Kit flexibles para calefón", img: "flex-calefon",
      resumen: "Conexiones sanitarias para calefones TOP 26TBF y 35TBF.",
      variantes: [
        { nombre: "Flexibles 1/2” (calefón TOP 26TBF)", codigo: "04-160-01", precio: 60 },
        { nombre: "Flexibles 3/4” (calefón 35TBF)", codigo: "04-196-01", precio: 77 }
      ]
    },

    /* ───────────── RADIADORES ───────────── */
    {
      id: "clan-n", cat: "radiadores", marca: "Caldaia", destacado: true,
      nombre: "Radiador de aluminio inyectado CLAN N", img: "clan-n",
      resumen: "Elemento de aluminio inyectado. Fabricación nacional, diseño italiano.",
      caracteristicas: ["Fabricación íntegramente nacional", "Económicos y de alta calidad", "Garantía 10 años", "Certificado INTI · Res. SC 599/2017"],
      notas: ["Precio por elemento."],
      variantes: [
        { nombre: "CLAN N 350", precio: 24, unidad: "elemento", specs: { "Potencia (kcal/h)": "172" } },
        { nombre: "CLAN N 500", precio: 20, unidad: "elemento", specs: { "Potencia (kcal/h)": "224" } },
        { nombre: "CLAN N 600", precio: 24, unidad: "elemento", specs: { "Potencia (kcal/h)": "260" } }
      ]
    },
    {
      id: "novo", cat: "radiadores", marca: "Caldaia",
      nombre: "Radiador de aluminio inyectado NOVO", img: "novo",
      resumen: "224 kcal/h por elemento. Fabricación nacional, diseño italiano.",
      caracteristicas: ["Fabricación íntegramente nacional", "Económicos y de alta calidad", "Garantía 10 años", "Certificado INTI · Res. SC 599/2017"],
      notas: ["Precio por elemento."],
      variantes: [{ nombre: "NOVO 500", precio: 20, unidad: "elemento", specs: { "Potencia (kcal/h)": "224" } }]
    },
    {
      id: "bit", cat: "radiadores", marca: "Caldaia",
      nombre: "Radiador de aluminio inyectado BIT 500", img: "bit",
      resumen: "La opción más económica: 210 kcal/h por elemento.",
      caracteristicas: ["Fabricación íntegramente nacional", "Económicos y de alta calidad"],
      notas: ["Precio por elemento."],
      variantes: [{ nombre: "BIT 500", precio: 14, unidad: "elemento", specs: { "Potencia (kcal/h)": "210" } }]
    },
    {
      id: "lux", cat: "radiadores", marca: "Caldaia",
      nombre: "Radiador de aluminio LUX", img: "lux",
      resumen: "Diseño italiano, versátil y eficiente. Alturas 200 y 700.",
      caracteristicas: ["Diseño italiano y fabricación nacional", "Versátiles y de alta calidad", "Eficiencia y economía", "Garantía 10 años"],
      notas: ["Precio por elemento."],
      variantes: [
        { nombre: "LUX 200", precio: 25, unidad: "elemento", specs: { "Potencia (kcal/h)": "105" } },
        { nombre: "LUX 700", precio: 30, unidad: "elemento", specs: { "Potencia (kcal/h)": "268" } }
      ]
    },
    {
      id: "electricos", cat: "radiadores", marca: "Caldaia",
      nombre: "Radiadores eléctricos E-NOVO / E-CLAN N", img: "electricos",
      resumen: "Calefacción eléctrica de 700 o 1000 W, con opción WiFi.",
      caracteristicas: ["Radiador de aluminio con resistencia eléctrica", "Versiones con control WiFi", "Fabricación nacional, diseño italiano"],
      variantes: [
        { nombre: "E-NOVO 7 / E-CLAN N 7", precio: 472, specs: { "Potencia (W)": "700", "Tensión (V)": "220" } },
        { nombre: "E-NOVO 7 WiFi / E-CLAN N 7 WiFi", precio: 588, specs: { "Potencia (W)": "700", "Tensión (V)": "220" } },
        { nombre: "E-NOVO 10 / E-CLAN N 10", precio: 565, specs: { "Potencia (W)": "1000", "Tensión (V)": "220" } },
        { nombre: "E-NOVO 10 WiFi / E-CLAN N 10 WiFi", precio: 682, specs: { "Potencia (W)": "1000", "Tensión (V)": "220" } }
      ]
    },
    {
      id: "termobano", cat: "radiadores", marca: "Caldaia",
      nombre: "Radiador toallero de acero Termobaño", img: "termobano",
      resumen: "Toallero para conectar al circuito de calefacción. Blanco o cromado.",
      caracteristicas: ["Acero, terminación blanca o cromada", "Garantía 10 años"],
      variantes: [
        { nombre: "Termobaño 85 blanco", precio: 105, specs: { "Potencia (kcal/h)": "635" } },
        { nombre: "Termobaño 150 blanco", precio: 147, specs: { "Potencia (kcal/h)": "1.180" } },
        { nombre: "Termobaño 85 cromo", precio: 182, specs: { "Potencia (kcal/h)": "635" } }
      ]
    },
    {
      id: "fanny", cat: "radiadores", marca: "Caldaia",
      nombre: "Toallero eléctrico FANNY", img: "fanny",
      resumen: "Toallero eléctrico de 400 W con control digital. Blanco o cromado.",
      caracteristicas: ["Control digital", "Diseño italiano", "Terminación blanca o cromada"],
      variantes: [
        { nombre: "FANNY blanco", precio: 175, specs: { "Potencia (W)": "400", "Tensión (V)": "220" } },
        { nombre: "FANNY cromo", precio: 253, specs: { "Potencia (W)": "400", "Tensión (V)": "220" } }
      ]
    },

    /* ───────────── ACCESORIOS RADIADORES ───────────── */
    {
      id: "valvulas-caldaia", cat: "accesorios-radiadores", marca: "Caldaia",
      nombre: "Válvulas escuadra 1/2” Caldaia", img: "valv-caldaia",
      variantes: [
        { nombre: "Válvula escuadra 1/2”", codigo: "04-192-01", precio: 9.8 },
        { nombre: "Unión doble escuadra 1/2”", codigo: "04-193-01", precio: 9.8 },
        { nombre: "Conjunto válvulas escuadra", codigo: "04-200-01", precio: 19.6 }
      ]
    },
    {
      id: "valvulas-dl", cat: "accesorios-radiadores", marca: "DL",
      nombre: "Válvulas rectas 1/2” DL", img: "valv-dl",
      variantes: [
        { nombre: "Válvula recta 1/2”", codigo: "04-197-01", precio: 9.8 },
        { nombre: "Unión doble esc. recta 1/2”", codigo: "04-198-01", precio: 9.8 },
        { nombre: "Conjunto válvulas recta", precio: 19.6 }
      ]
    },
    {
      id: "valvulas-caleffi", cat: "accesorios-radiadores", marca: "Caleffi",
      nombre: "Válvulas escuadra 1/2” Caleffi", img: "valv-caleffi",
      variantes: [
        { nombre: "Válvula escuadra 1/2”", codigo: "04-001-01", precio: 14 },
        { nombre: "Unión doble escuadra 1/2”", codigo: "04-002-01", precio: 14 },
        { nombre: "Conjunto válvulas escuadra", precio: 28 }
      ]
    },
    {
      id: "valvulas-emmeti", cat: "accesorios-radiadores", marca: "Emmeti",
      nombre: "Válvulas escuadra 1/2” Emmeti", img: "valv-emmeti",
      variantes: [
        { nombre: "Válvula escuadra 1/2”", codigo: "04-098-01", precio: 8.7 },
        { nombre: "Unión doble escuadra 1/2”", codigo: "04-100-01", precio: 8.7 },
        { nombre: "Conjunto válvulas escuadra", precio: 17.4 }
      ]
    },
    {
      id: "valvula-termostatizable", cat: "accesorios-radiadores", marca: "Caleffi",
      nombre: "Válvula termostatizable escuadra cromada 1/2” Caleffi", img: "valv-termostatizable",
      variantes: [{ nombre: "Válvula termostatizable 1/2”", codigo: "04-006-01", precio: 32 }]
    },
    {
      id: "cabezal-caleffi", cat: "accesorios-radiadores", marca: "Caleffi",
      nombre: "Cabezal termostático Caleffi", img: "cabezal-caleffi",
      variantes: [{ nombre: "Cabezal termostático", codigo: "04-007-01", precio: 32 }]
    },
    {
      id: "loctite", cat: "accesorios-radiadores", marca: "Loctite",
      nombre: "Adhesivo sellador de válvulas y tapones Loctite 50 g", img: "loctite",
      resumen: "Sellador semirrígido.",
      variantes: [{ nombre: "Loctite 50 g", codigo: "33-037-01", precio: 59 }]
    },
    {
      id: "blister", cat: "accesorios-radiadores", marca: "Caldaia",
      nombre: "Blister de armado para radiador", img: "blister",
      resumen: "Incluye 4 reducciones, grifo de 1/2” y tapón.",
      variantes: [
        { nombre: "Blister (4 reducciones, grifo 1/2” y tapón)", codigo: "04-096-01", precio: 9 },
        { nombre: "Blister con ménsulas fijas (4 reducciones, tapón, reducción a 1/2 y 2 ménsulas)", codigo: "04-154-01", precio: 9.8 }
      ]
    },
    {
      id: "mensulas", cat: "accesorios-radiadores", marca: "Caldaia",
      nombre: "Ménsulas regulables (par)", img: "mensulas",
      variantes: [{ nombre: "Ménsulas regulables (par)", codigo: "04-004-01", precio: 7 }]
    },
    {
      id: "niples", cat: "accesorios-radiadores", marca: "Caldaia",
      nombre: "Niples 1/2” con roseta inox (par)", img: "niple-cromado",
      variantes: [
        { nombre: "Niple 1/2” cromado y roseta inox (par)", codigo: "04-052-01", precio: 8.4 },
        { nombre: "Niple 1/2” extensible y roseta inox (par)", codigo: "04-165-01", precio: 29 }
      ]
    },
    {
      id: "llave-radiadores", cat: "accesorios-radiadores", marca: "Caldaia",
      nombre: "Llave para armar y desarmar radiadores", img: "llave-radiadores",
      variantes: [{ nombre: "Llave de armado", codigo: "31-168-01", precio: 88 }]
    },

    /* ───────────── ACCESORIOS CALDERAS ───────────── */
    {
      id: "kit-conexiones", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Kit de conexiones hidráulicas y de gas", img: "kit-conex-doble",
      resumen: "Para calderas murales doble servicio o solo calefacción.",
      variantes: [
        { nombre: "Kit conexiones doble servicio", codigo: "04-046-01", precio: 109 },
        { nombre: "Kit conexiones adaptador TOP (Xa30 / TOP Sa)", codigo: "04-131-01", precio: 109 },
        { nombre: "Kit conexiones solo calefacción", codigo: "04-047-01", precio: 109 },
        { nombre: "Kit conexiones adaptador TOP (S30 / TOP S)", codigo: "04-132-01", precio: 109 }
      ]
    },
    {
      id: "kit-flexibles", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Kit de conexiones flexibles", img: "kit-flex-doble",
      variantes: [
        { nombre: "Flexibles doble servicio", codigo: "04-158-01", precio: 77 },
        { nombre: "Flexibles solo calefacción", codigo: "04-159-01", precio: 70 }
      ]
    },
    {
      id: "kit-humos-coaxial", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Kit salida de humos horizontal coaxial Ø60/100", img: "humos-horiz-coaxial",
      resumen: "0,8 m, para tiro balanceado.",
      variantes: [{ nombre: "Kit horizontal coaxial Ø60/100 × 0,8 m", codigo: "04-083-01", precio: 121 }]
    },
    {
      id: "kit-humos-80", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Kit salida de humos Ø80 (tiro forzado)", img: "kit-humos-80",
      resumen: "0,8 m, para tiro forzado.",
      variantes: [{ nombre: "Kit salida de humos Ø80 × 0,8 m", codigo: "04-084-01", precio: 157 }]
    },
    {
      id: "codos-coaxiales", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Codos y salidas coaxiales Ø60/100", img: "codo90-con-brida",
      variantes: [
        { nombre: "Kit codo 90° Ø60/100 sin brida", codigo: "04-019-01", precio: 77 },
        { nombre: "Kit codo 90° Ø60/100 con brida", codigo: "04-082-01", precio: 77 },
        { nombre: "Kit codo 45° Ø60/100 sin brida", codigo: "04-074-01", precio: 77 },
        { nombre: "Kit salida vertical Ø60/100 con brida", codigo: "04-053-01", precio: 77 }
      ]
    },
    {
      id: "salida-vertical-80", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Kit salida vertical Ø80", img: "kit-vert-80",
      variantes: [{ nombre: "Kit salida vertical Ø80", codigo: "31-069-01", precio: 90 }]
    },
    {
      id: "kit-bitubo", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Kit aspiración bitubo Ø80 mm TOP", img: "kit-bitubo",
      variantes: [{ nombre: "Kit aspiración bitubo Ø80", codigo: "31-182-01", precio: 90 }]
    },
    {
      id: "curva-80", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Curva 90° Ø80 H-H pintada blanca", img: "curva-80",
      variantes: [{ nombre: "Curva 90° Ø80 H-H", codigo: "31-068-01", precio: 45 }]
    },
    {
      id: "terminales", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Terminales antiviento", img: "term-vert-60100",
      resumen: "Verticales y horizontales para Ø60/100 y Ø80.",
      variantes: [
        { nombre: "Terminal vertical Ø60/100 metálico negro", codigo: "29-073-01", precio: 119 },
        { nombre: "Terminal vertical Ø80 metálico negro", codigo: "29-074-01", precio: 77 },
        { nombre: "Terminal horizontal Ø60/100 plástico blanco", codigo: "29-016-01", precio: 23 },
        { nombre: "Terminal horizontal Ø80 acero inoxidable", codigo: "29-065-01", precio: 30 }
      ]
    },
    {
      id: "tubo-coaxial", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Tubo coaxial Ø60/100", img: "tubo-coaxial",
      variantes: [
        { nombre: "Tubo coaxial Ø60/100 × 1 m", codigo: "04-021-01", precio: 59 },
        { nombre: "Tubo coaxial Ø60/100 × 2 m", codigo: "04-023-01", precio: 118 },
        { nombre: "Tubo coaxial Ø60/100 × 3 m", codigo: "04-025-01", precio: 176 },
        { nombre: "Tubo coaxial Ø60/100 × 4 m", codigo: "04-027-01", precio: 235 },
        { nombre: "Tubo coaxial Ø60/100 × 5 m", codigo: "04-029-01", precio: 293 }
      ]
    },
    {
      id: "tubo-aluminio", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Tubo de aluminio Ø80", img: "tubo-aluminio",
      variantes: [
        { nombre: "Tubo aluminio Ø80 × 1 m", codigo: "04-080-01", precio: 40 },
        { nombre: "Tubo aluminio Ø80 × 2 m", codigo: "04-063-01", precio: 79 },
        { nombre: "Tubo aluminio Ø80 × 3 m", codigo: "04-065-01", precio: 118 },
        { nombre: "Tubo aluminio Ø80 × 4 m", codigo: "04-067-01", precio: 157 },
        { nombre: "Tubo aluminio Ø80 × 5 m", codigo: "04-069-01", precio: 196 },
        { nombre: "Tubo aluminio Ø80 × 6 m", codigo: "04-071-01", precio: 141.92 }
      ]
    },
    {
      id: "cuplas", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Cuplas, tubo PVC y centrador", img: "cuplas-aluminio",
      variantes: [
        { nombre: "Cupla de aluminio Ø60", codigo: "31-156-01", precio: 14 },
        { nombre: "Cupla de aluminio Ø80", codigo: "31-089-01", precio: 18 },
        { nombre: "Tubo de PVC Ø100 × 1 m", codigo: "27-038-01", precio: 24 },
        { nombre: "Cupla para tubo plástico Ø100", codigo: "31-079-01", precio: 17 },
        { nombre: "Triángulo centrador de alambre p/ coaxial Ø60/100", codigo: "31-005-01", precio: 3 }
      ]
    },
    {
      id: "termostatos", cat: "accesorios-calderas", marca: "Caldaia", destacado: true,
      nombre: "Termostatos de ambiente Caldaia", img: "termostato-wifi",
      resumen: "Termostato, cronotermostato, inalámbrico y con app.",
      variantes: [
        { nombre: "Termostato de ambiente", codigo: "04-150-02", precio: 46 },
        { nombre: "Cronotermostato de ambiente 24 V", codigo: "04-151-01", precio: 56 },
        { nombre: "Termostato de ambiente inalámbrico", codigo: "04-152-02", precio: 98 },
        { nombre: "Termostato de ambiente (con app)", codigo: "04-166-01", precio: 182 }
      ]
    },
    {
      id: "termostato-tanque", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Termostato para tanque acumulador", img: "termostato-tanque",
      variantes: [{ nombre: "Termostato para tanque acumulador", codigo: "04-185-01", precio: 157 }]
    },
    {
      id: "colector-multibomba", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Colector mezclador multibomba", img: "colector-multibomba",
      variantes: [
        { nombre: "Para 2 / 3 bombas (2+1)", codigo: "04-179-01", precio: 528 },
        { nombre: "Para 4 bombas (2+2)", codigo: "04-180-01", precio: 626 }
      ]
    },
    {
      id: "mezcladora", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Mezcladora hidráulica (separador)", img: "mezcladora-grupo",
      resumen: "De acero inoxidable 1” o para armado de grupo de calderas.",
      variantes: [
        { nombre: "Acero inoxidable · conexión 1”", codigo: "04-174-01", precio: 351 },
        { nombre: "Grupo de calderas · conexión 1 1/2”", codigo: "04-176-01", precio: 489 },
        { nombre: "Grupo de calderas · conexión 2 1/2”", codigo: "04-161-01", precio: 821 },
        { nombre: "Grupo de calderas · conexión 3”", codigo: "04-190-01", precio: 1114 }
      ]
    },
    {
      id: "bomba-15-70", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Bomba 15-70 (7/1) para calderas murales", img: "bomba-1570",
      resumen: "Precio adicional, 2 velocidades de funcionamiento.",
      variantes: [{ nombre: "Bomba 15-70 (7/1)", precio: 49 }]
    },
    {
      id: "recarga", cat: "accesorios-calderas", marca: "Caldaia",
      nombre: "Sistema de recarga de circuito de calefacción", img: "recarga",
      resumen: "Semiautomático, con tanque de acumulación para llenado con agua desmineralizada.",
      variantes: [{ nombre: "Sistema de recarga semiautomático", codigo: "04-184-01", precio: 293 }]
    },

    /* ───────────── BOMBAS Y VASOS ───────────── */
    {
      id: "bombas-caldaia", cat: "bombas", marca: "Caldaia", destacado: true,
      nombre: "Bombas circuladoras Caldaia", img: "bombas-caldaia",
      resumen: "Para calefacción o refrigeración, selector de 3 velocidades.",
      caracteristicas: [
        "Alimentación monofásica 1×220 V",
        "Selector de velocidad de 3 posiciones",
        "Eje y cojinetes radiales de cerámica",
        "Rotor y carcasa en acero inoxidable no ferroso",
        "Temperatura del líquido de 5 °C a 90 °C · presión máxima 10 bar"
      ],
      variantes: [
        { nombre: "Bomba Caldaia 25-80 c/racor 1”", codigo: "05-150-01", precio: 101, specs: { "Conexión": "1”" } },
        { nombre: "Bomba Caldaia 32-80 c/racor 1 1/4”", codigo: "05-149-01", precio: 105, specs: { "Conexión": "1 1/4”" } },
        { nombre: "Bomba Caldaia 25-60 c/racor 1”", codigo: "05-151-01", precio: 55, specs: { "Conexión": "1”" } }
      ]
    },
    {
      id: "upa", cat: "bombas", marca: "Grundfos",
      nombre: "Bombas presurizadoras Grundfos UPA", img: "upa",
      resumen: "Presurizadoras con sensor de flujo e kit de conexiones.",
      caracteristicas: [
        "Incluye kit de conexiones",
        "Selector manual-automático",
        "Sensor de flujo (funcionamiento automático)",
        "Temperatura máxima del líquido: 60 °C",
        "Sólo necesita 40 cm de altura de agua de entrada"
      ],
      variantes: [
        { nombre: "UPA 15-90-160", codigo: "05-108-01", precio: 70, specs: { "Conexión": "1/2”" } },
        { nombre: "UPA 120-180", codigo: "05-050-01", precio: 84, specs: { "Conexión": "1/2”" } }
      ]
    },
    {
      id: "bp-3-45", cat: "bombas", marca: "Caldaia",
      nombre: "Presurizadora inteligente BP 3-45 Caldaia", img: "bp345",
      resumen: "Permite seleccionar la presión deseada. Silenciosa y compacta.",
      caracteristicas: [
        "Bomba presurizadora inteligente con selección de presión",
        "Ideal para presurizar sistemas domésticos",
        "Alta eficiencia, silenciosa y compacta",
        "Temperatura máxima del líquido: 80 °C"
      ],
      variantes: [{ nombre: "BP 3-45", codigo: "05-114-01", precio: 337, specs: { "Conexión": "1”" } }]
    },
    {
      id: "vaso-expansion", cat: "bombas", marca: "Caldaia",
      nombre: "Tanque de expansión 50 / 60 litros", img: "vaso-expansion",
      caracteristicas: ["Temperatura máxima 90 °C", "Presión máxima 6 bar"],
      variantes: [{ nombre: "Tanque de expansión 50 l / 60 l", codigo: "30-160-01", precio: 580 }]
    },

    /* ───────────── PISCINAS ───────────── */
    {
      id: "climatizador-cp", cat: "piscinas", marca: "Caldaia", destacado: true,
      nombre: "Climatizadores de piscina Digital CP", img: "cp",
      resumen: "Tiro forzado, 92% de rendimiento. Para piscinas de hasta 166 m².",
      caracteristicas: [
        "Ahorro de gas por su alto rendimiento térmico (92% según PCI)",
        "Mantiene constante la temperatura del agua con display digital",
        "Salida de humos con tiro forzado",
        "Ubicación exterior o interior",
        "Válvula ByPass incorporada"
      ],
      notas: [
        "Incluyen salida de humos para el exterior.",
        "Superficie máxima (piscina cubierta, uso permanente): CP30 74 m² · CP40 102 m² · CP70 166 m².",
        "Superficie máxima (descubierta, uso permanente): CP30 38 m² · CP40 51 m² · CP70 84 m²."
      ],
      variantes: [
        { nombre: "Digital CP 30", precio: 2105, specs: { "Potencia (kcal/h)": "9.000 / 28.000", "Tiro": "Forzado" } },
        { nombre: "Digital CP 40", precio: 2386, specs: { "Potencia (kcal/h)": "12.000 / 38.000", "Tiro": "Forzado" } },
        { nombre: "Digital CP 70", precio: 3088, specs: { "Potencia (kcal/h)": "20.000 / 70.000", "Tiro": "Forzado" } }
      ]
    },
    {
      id: "climatizador-cp70-pro", cat: "piscinas", marca: "Caldaia",
      nombre: "Climatizador Digital CP 70 Profesional", img: "cp70-pro",
      resumen: "Intercambiador secundario de acero inoxidable desarmable.",
      caracteristicas: [
        "Intercambiador secundario de acero inoxidable (desarmable para limpieza y control)",
        "Ahorro de gas por su alto rendimiento térmico (92% según PCI)",
        "Temperatura constante con display digital",
        "Salida de humos con tiro forzado"
      ],
      notas: ["Superficie máxima: cubierta 166 m² (permanente) / 100 m² (fin de semana); descubierta 84 / 60 m². Agua a 28 °C con temperatura exterior ≥ 15 °C."],
      variantes: [{ nombre: "Digital CP 70 Profesional", precio: 4772, specs: { "Potencia (kcal/h)": "20.000 / 70.000", "Tiro": "Forzado" } }]
    },
    {
      id: "kit-humos-piscina", cat: "piscinas", marca: "Caldaia",
      nombre: "Kit salida de humos para climatizador en local cerrado", img: "kit-humos-piscina",
      resumen: "Tubo de escape Ø80 de 0,8 m, salida con brida y terminal antiviento.",
      variantes: [{ nombre: "Kit salida de humos Ø80", codigo: "04-076-01", precio: 112 }]
    },
    {
      id: "intercambiador", cat: "piscinas", marca: "Caldaia",
      nombre: "Intercambiador de acero inoxidable", img: "intercambiador",
      caracteristicas: ["Intercambiador de casco y tubos", "Fabricado en acero inoxidable", "Desarmable para limpieza y control"],
      variantes: [
        { nombre: "Intercambiador grande", codigo: "30-072-01", precio: 1270, specs: { "Intercambio (kcal/h)": "50.000" } },
        { nombre: "Intercambiador chico", codigo: "30-080-01", precio: 1133, specs: { "Intercambio (kcal/h)": "30.000" } }
      ]
    },

    /* ───────────── PISO RADIANTE / PEX ───────────── */
    {
      id: "pex", cat: "piso-radiante", marca: "Caldaia", destacado: true,
      nombre: "Tubo PEX-A de polietileno reticulado", img: "pex",
      resumen: "Para piso radiante y distribución. Precio por metro.",
      caracteristicas: [
        "Resistencia a temperaturas elevadas (picos de hasta 110 °C)",
        "Resistencia a presiones elevadas",
        "Ausencia de condensaciones",
        "Flexibilidad: ahorra uniones y tiempo de instalación",
        "Memoria plástica · apto agua potable"
      ],
      notas: ["Precio por metro. Se vende por rollo completo: la cantidad avanza de a un rollo."],
      variantes: [
        { nombre: "PEXA 16×13 · tendido piso radiante", codigo: "06-001-03", precio: 0.76, paso: 200, unidad: "metro", specs: { "Presentación": "Rollo 200 m" } },
        { nombre: "PEXA 16×20.2 · tendido piso radiante", codigo: "06-002-03", precio: 0.9, paso: 200, unidad: "metro", specs: { "Presentación": "Rollo 200 m" } },
        { nombre: "PEXA 16×13 · distribución", codigo: "06-005-03", precio: 1.25, paso: 200, unidad: "metro", specs: { "Presentación": "Rollo 200 m" } },
        { nombre: "PEXA 20×16.2 · distribución", codigo: "06-006-03", precio: 1.4, paso: 200, unidad: "metro", specs: { "Presentación": "Rollo 200 m" } },
        { nombre: "PEXA 25×20.4 · distribución", codigo: "06-007-03", precio: 2.39, paso: 50, unidad: "metro", specs: { "Presentación": "Rollo 50 m" } },
        { nombre: "PEXA 32×26.2 · distribución", codigo: "06-011-03", precio: 3.69, paso: 4, unidad: "metro", specs: { "Presentación": "Tira 4 m" } }
      ]
    },
    {
      id: "colector-bronce", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Colectores de bronce cromado para piso radiante", img: "colector-bronce",
      resumen: "Incluyen válvulas termostatizables, soportes, purgadores automáticos y grifo de vaciado.",
      variantes: [
        { nombre: "Colector de 2 circuitos", codigo: "06-140-01", precio: 131 },
        { nombre: "Colector de 3 circuitos", codigo: "06-113-01", precio: 143 },
        { nombre: "Colector de 4 circuitos", codigo: "06-114-01", precio: 157 },
        { nombre: "Colector de 5 circuitos", codigo: "06-115-01", precio: 188 },
        { nombre: "Colector de 6 circuitos", codigo: "06-116-01", precio: 234 },
        { nombre: "Colector de 7 circuitos", codigo: "06-117-01", precio: 267 },
        { nombre: "Colector de 8 circuitos", codigo: "06-118-01", precio: 328 }
      ]
    },
    {
      id: "colector-completo", cat: "piso-radiante", marca: "Caldaia", destacado: true,
      nombre: "Colector completo para piso radiante", img: "colector-completo",
      resumen: "Incluye caja metálica, colector, válvulas esféricas y adaptadores de 20.",
      variantes: [
        { nombre: "Colector completo 2 circuitos", codigo: "06-197-01", precio: 296 },
        { nombre: "Colector completo 3 circuitos", codigo: "06-198-01", precio: 324 },
        { nombre: "Colector completo 4 circuitos", codigo: "06-199-01", precio: 350 },
        { nombre: "Colector completo 5 circuitos", codigo: "06-200-01", precio: 393 },
        { nombre: "Colector completo 6 circuitos", codigo: "06-201-01", precio: 458 },
        { nombre: "Colector completo 7 circuitos", codigo: "06-202-01", precio: 505 },
        { nombre: "Colector completo 8 circuitos", codigo: "06-203-01", precio: 587 }
      ]
    },
    {
      id: "caja-colector", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Caja metálica para colectores", img: "caja-colector",
      variantes: [
        { nombre: "2 circuitos · 350×450×110", codigo: "06-125-01", precio: 65 },
        { nombre: "3 circuitos · 400×450×110", codigo: "06-126-01", precio: 76 },
        { nombre: "4 circuitos · 450×450×110", codigo: "06-186-01", precio: 79 },
        { nombre: "5 circuitos · 500×450×110", codigo: "06-127-01", precio: 83 },
        { nombre: "6 circuitos · 550×450×110", codigo: "06-187-01", precio: 88 },
        { nombre: "7 circuitos · 600×450×110", codigo: "06-188-01", precio: 98 },
        { nombre: "8 circuitos · 650×450×110", codigo: "06-128-01", precio: 104 }
      ]
    },
    {
      id: "cabezal-colector", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Cabezal termostático Caldaia para colectores", img: "cabezal-caldaia",
      variantes: [{ nombre: "Cabezal termostático p/ colector", codigo: "04-102-01", precio: 44 }]
    },
    {
      id: "adaptador-colector", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Adaptadores para colectores", img: "adaptador-colector",
      variantes: [
        { nombre: "Adaptador 16 × 13", codigo: "06-119-01", precio: 4.4 },
        { nombre: "Adaptador 20 × 16,20", codigo: "06-120-01", precio: 5 }
      ]
    },
    {
      id: "valvula-esferica", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Válvula esférica de 1”", img: "valvula-esferica",
      variantes: [
        { nombre: "Válvula esférica 1” roja", codigo: "06-121-01", precio: 38 },
        { nombre: "Válvula esférica 1” azul", codigo: "06-121-02", precio: 38 }
      ]
    },
    {
      id: "flujostato", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Flujostato opcional para colectores", img: "flujostato",
      variantes: [{ nombre: "Flujostato", codigo: "06-211-01", precio: 24 }]
    },
    {
      id: "codos-pex", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Codos para PEX (incluyen casquillos)", img: "codo-pex",
      variantes: [
        { nombre: "Codo 16", codigo: "06-016-01", precio: 2.7 },
        { nombre: "Codo 20", codigo: "06-017-01", precio: 4.1 },
        { nombre: "Codo 25", codigo: "06-018-01", precio: 7.5 },
        { nombre: "Codo 32", codigo: "06-019-01", precio: 11.9 }
      ]
    },
    {
      id: "codo-terminal", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Codos terminales para PEX", img: "codo-h-pex",
      variantes: [
        { nombre: "Codo terminal H 16×1/2", codigo: "06-024-01", precio: 3.7 },
        { nombre: "Codo terminal H 20×3/4", codigo: "06-025-01", precio: 6.1 },
        { nombre: "Codo terminal H 25×3/4", codigo: "06-026-01", precio: 7.4 },
        { nombre: "Codo terminal H 32×1", codigo: "06-027-01", precio: 9.5 },
        { nombre: "Codo terminal H con fijación 16×1/2", codigo: "06-193-01", precio: 5.6 },
        { nombre: "Codo terminal macho 25×1", codigo: "06-174-01", precio: 8.2 }
      ]
    },
    {
      id: "racores", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Racores fijos para PEX", img: "racor-m-pex",
      variantes: [
        { nombre: "Racor fijo macho 16×1/2", codigo: "06-033-01", precio: 2.8 },
        { nombre: "Racor fijo macho 20×1/2", codigo: "06-034-01", precio: 3.2 },
        { nombre: "Racor fijo macho 20×3/4", codigo: "06-035-01", precio: 3.7 },
        { nombre: "Racor fijo macho 25×1", codigo: "06-037-01", precio: 6.6 },
        { nombre: "Racor fijo hembra 16×1/2", codigo: "06-130-01", precio: 3.1 },
        { nombre: "Racor fijo hembra 25×3/4", codigo: "06-175-01", precio: 5 }
      ]
    },
    {
      id: "manguitos", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Manguitos y reductores para PEX", img: "manguito",
      variantes: [
        { nombre: "Manguito 16", codigo: "06-074-01", precio: 1.8 },
        { nombre: "Manguito 20", codigo: "06-075-01", precio: 3.2 },
        { nombre: "Manguito 25", codigo: "06-076-01", precio: 5.6 },
        { nombre: "Manguito 32", codigo: "06-077-01", precio: 9.5 },
        { nombre: "Manguito reductor 20-16", codigo: "06-133-01", precio: 3.1 },
        { nombre: "Manguito reductor 25-20", codigo: "06-134-02", precio: 4.4 },
        { nombre: "Manguito reductor 32-25", codigo: "06-135-01", precio: 9.5 }
      ]
    },
    {
      id: "te-pex", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Tes para PEX", img: "te-pex",
      variantes: [
        { nombre: "TE 16-16-16", codigo: "06-046-01", precio: 4 },
        { nombre: "TE 20-20-20", codigo: "06-049-01", precio: 6.1 },
        { nombre: "TE 25-25-25", codigo: "06-054-01", precio: 9.9 },
        { nombre: "TE 16-20-16", codigo: "06-145-01", precio: 4.6 },
        { nombre: "TE 16-25-16", codigo: "06-169-01", precio: 9.9 },
        { nombre: "TE 20-16-16", codigo: "06-061-01", precio: 6.9 },
        { nombre: "TE 20-16-20", codigo: "06-062-01", precio: 5.6 },
        { nombre: "TE 20-20-16", codigo: "06-153-01", precio: 6 },
        { nombre: "TE 20-25-20", codigo: "06-147-01", precio: 10.7 },
        { nombre: "TE 25-16-16", codigo: "06-170-01", precio: 10.3 },
        { nombre: "TE 25-16-20", codigo: "06-064-01", precio: 10.3 },
        { nombre: "TE 25-16-25", codigo: "06-065-01", precio: 9.5 },
        { nombre: "TE 25-20-16", codigo: "06-171-01", precio: 9.2 },
        { nombre: "TE 25-20-20", codigo: "06-066-01", precio: 9 },
        { nombre: "TE 25-20-25", codigo: "06-067-01", precio: 10.7 },
        { nombre: "TE 25-25-16", codigo: "06-172-01", precio: 10.3 },
        { nombre: "TE 25-25-20", codigo: "06-173-01", precio: 10.7 },
        { nombre: "TE 32-32-32", codigo: "06-196-01", precio: 17.3 },
        { nombre: "TE 32-25-25", codigo: "06-057-01", precio: 14.5 },
        { nombre: "TE 32-25-32", codigo: "06-072-01", precio: 16.3 },
        { nombre: "TE 32-32-25", codigo: "06-195-01", precio: 16.3 }
      ]
    },
    {
      id: "casquillos", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Casquillos corredizos", img: "casquillo",
      variantes: [
        { nombre: "Casquillo 16", codigo: "06-103-01", precio: 1.2 },
        { nombre: "Casquillo 20", codigo: "06-104-01", precio: 1.6 },
        { nombre: "Casquillo 25", codigo: "06-105-01", precio: 2.7 }
      ]
    },
    {
      id: "colector-racor", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Colectores de 3/4” para racor móvil", img: "colector-racor",
      variantes: [
        { nombre: "Colector 3/4” con 2 salidas de 16", codigo: "06-159-01", precio: 24.3 },
        { nombre: "Colector 3/4” con 3 salidas de 16", codigo: "06-160-01", precio: 34.3 }
      ]
    },
    {
      id: "curva-guia", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Curva guía para tubo plástico", img: "curva-guia",
      variantes: [
        { nombre: "Curva guía 16", codigo: "06-183-01", precio: 1.8 },
        { nombre: "Curva guía 20", codigo: "06-184-01", precio: 2.6 },
        { nombre: "Curva guía 25", codigo: "06-185-01", precio: 3.5 }
      ]
    },
    {
      id: "precinto", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Precinto plástico 20 cm (bolsa × 100)", img: "precinto",
      variantes: [{ nombre: "Precinto 20 cm × 100 u.", codigo: "06-129-01", precio: 5 }]
    },
    {
      id: "herramientas-prensa", cat: "piso-radiante", marca: "Caldaia", destacado: true,
      nombre: "Prensas de montaje para casquillo corredizo", img: "prensa-hidraulica",
      resumen: "Sistema de casquillo corredizo: simple, seguro, económico y rápido.",
      caracteristicas: ["Uniones sencillas en tan sólo 3 pasos", "Se entregan en valija"],
      variantes: [
        { nombre: "Prensa manual Ø12 / 16 / 20", codigo: "06-176-01", precio: 383 },
        { nombre: "Prensa manual Ø16 / 20 / 25", codigo: "06-182-01", precio: 554 },
        { nombre: "Prensa hidráulica Ø16 a 32", codigo: "06-177-01", precio: 842 }
      ]
    },
    {
      id: "abocardadora", cat: "piso-radiante", marca: "Caldaia",
      nombre: "Abocardadora para Ø16/32", img: "abocardadora",
      variantes: [{ nombre: "Abocardadora Ø16/32", codigo: "06-142-01", precio: 389 }]
    }
  ]
};
