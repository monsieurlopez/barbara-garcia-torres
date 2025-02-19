document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      name: "Mercados",
      img: "./assets/images/img-mercados.png",
      description:
        "Seguimiento continuo de las principales criptomonedas y divisas.",
      ventajas: [
        "Principales criptomonedas y divisas",
        "Cotizaciones en tiempo real",
        "Tablas personalizadas",
      ],
      url: "pages/mercados.html",
    },
    {
      name: "Conversor",
      img: "./assets/images/img-conversor.png",
      description:
        "Convierte entre diferentes divisas con tasas de cambio actualizadas.",
      ventajas: [
        "Conversión en tiempo real",
        "Fácil de usar",
        "30 monedas disponibles",
      ],
      url: "pages/conversor.html",
    },
    {
      name: "Noticias",
      img: "./assets/images/img-noticias.png",
      description: "Mantente informado con las últimas noticias del mundo.",
      ventajas: [
        "Noticias actualizadas",
        "Buscador por palabra clave",
        "Link a la noticia",
      ],
      url: "pages/noticias.html",
    },
  ];

  const servicesContainer = document.getElementById("services-container");

  servicesContainer.innerHTML = services
    .map(
      (service) => `
    <div class="card" style="width: 18rem;">
      <div class="card__header">
        <img src="${service.img}" class="img-fluid" alt="${service.name}">
      </div>
      <div class="card-body card__body">
        <h5 class="card-title"><strong>${service.name}</strong></h5>
        <p class="card-text">${service.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        ${service.ventajas
          .map((ventaja) => `<li class="list-group-item">${ventaja}</li>`)
          .join("")}
      </ul>
      <div class="card-footer card__footer">
        <a href="${service.url}" class="card__footer-link"> Ver más </a>
      </div>
    </div>
  `
    )
    .join("");
});
