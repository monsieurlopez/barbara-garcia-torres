document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      name: "Consultante en allaitement IBCLC",
      img: "./assets/images/img-lactancia.png",
      description: "Je propose un accompagnement  individuel à domicile ou au cabinet.",
      url: "pages/lactancia.html",
    },
    {
      name: "Soin en kinésithérapie",
      img: "./assets/images/img-kine.png",
      description: "Spécialisée dans la prise en charge de la femme et de l'enfant.",
      url: "pages/soins.html",
    },
  ];

  const servicesContainer = document.getElementById("services-container");

  servicesContainer.innerHTML = services
    .map(
      (service) => `
    <div class="card">
      <div class="card__header">
        <img src="${service.img}" class="card-img-top" alt="${service.name}">
      </div>
      <div class="card-body card__body">
        <h5 class="card__body-title card-title"><strong>${service.name}</strong></h5>
        <p class="card__body-text card-text">${service.description}</p>
        <a href="${service.url}" class="card__body-link button button--primary"> Voir plus </a>
      </div>
    </div>
  `
    )
    .join("");
});

const page = "Accueil";

// Seleccionar el header y el footer de forma segura
const headerElement = document.querySelector(".header");
const footerElement = document.querySelector(".footer");

// Verificar si existe antes de insertar
if (headerElement && footerElement) {
  headerElement.insertAdjacentHTML("beforeend", createHeader(page));
  footerElement.insertAdjacentHTML("beforeend", createFooter(page));
}
