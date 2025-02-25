document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      name: "Ateliers Allaitement",
      img: "./assets/images/img-allaitement.png",
      description:
        "Seguimiento continuo de las principales criptomonedas y divisas.",
      ventajas: [
        "Principales criptomonedas y divisas",
        "Cotizaciones en tiempo real",
        "Tablas personalizadas",
      ],
      url: "",
    },
    {
      name: "Kinésithérapie",
      img: "./assets/images/img-kine.png",
      description:
        "Convierte entre diferentes divisas con tasas de cambio actualizadas.",
      ventajas: [
        "Conversión en tiempo real",
        "Fácil de usar",
        "30 monedas disponibles",
      ],
      url: "",
    },
  ];

  const servicesContainer = document.getElementById("services-container");

  servicesContainer.innerHTML = services
    .map(
      (service) => `
    <div class="card" style="width: 18rem;">
      <div class="card__header">
        <img src="${service.img}" class="card-img-top" alt="${service.name}">
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
