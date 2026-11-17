/*
 * Configuración general del sitio. Editar acá, no hace falta tocar el resto.
 */
window.NESMA_CONFIG = {
  // Número que recibe los pedidos: formato internacional sin "+" ni espacios.
  // 549 + característica sin 0 + número sin 15. Ej: 011-5826-3049 -> 5491158263049
  whatsapp: "5491158263049",

  telefonos: ["011-5826-3049", "011-3574-7780"],
  email: "nesma.ventas@gmail.com",
  // No hay local a la calle: se muestra la zona que se atiende, no una dirección.
  zona: "Wilde, Avellaneda y alrededores",
  // Horario de atención, ej: "Lunes a viernes de 9 a 18 h". null = no se muestra.
  horario: null,

  // Alícuota de IVA para mostrar el total estimado con impuestos.
  iva: 0.21,

  // Opcional: cotización del dólar para mostrar un equivalente en pesos.
  // Dejar en null para no mostrarlo.
  cotizacion: null
};
