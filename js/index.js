const svgLink = `<?xml version="1.0" ?><svg class="feather feather-external-link" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`;

document.addEventListener("DOMContentLoaded", function () {
  const menuSmallScreen = document.getElementById("mobile-menu");

  // Redirigir al link seleccionado
  menuSmallScreen.addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue) {
      window.location.href = selectedValue;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      name: "Mercados",
      img: "../assets/icons-svg/exchange_cash_currency_icon.svg",
      description:
        "Seguimiento continuo de las principales criptomonedas y divisas.",
      ventajas: [
        "Principales criptomonedas y divisas",
        "Cotizaciones en tiempo real",
        "Indicadores técnicos",
      ],
      url: "pages/mercados.html",
    },
    {
      name: "Conversor",
      img: "../assets/icons-svg/calculator_regular_icon.svg",
      description:
        "Convierte entre diferentes divisas con tasas de cambio actualizadas.",
      ventajas: [
        "Conversión en tiempo real",
        "Fácil de usar",
        "Más de 50 monedas disponibles",
      ],
      url: "pages/conversor.html",
    },
    {
      name: "Noticias",
      img: "../assets/icons-svg/paper_paper_press_icon.svg",
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
        <a href="${service.url}" class="card-link">${svgLink}</a>
      </div>
    </div>
  `
    )
    .join("");
});
