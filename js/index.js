document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      name: "Consultante en allaitement",
      img: "./assets/images/img-allaitement.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      url: "pages/lactancia.html",
    },
    {
      name: "Soin en kinésithérapie",
      img: "./assets/images/img-kine.png",
      description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
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
        <h5 class="card-title"><strong>${service.name}</strong></h5>
        <p class="card-text">${service.description}</p>
      </div>
      <div class="card-footer card__footer">
        <a href="${service.url}" class="card__footer-link"> Voir plus </a>
      </div>
    </div>
  `
    )
    .join("");
});
