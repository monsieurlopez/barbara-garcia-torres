//* Funciones globales **/
const createCanvasOff = (page) => {
  let path = "";
  if (page === "Accueil") {
    path = "pages/";
  }
  return `
  <div
          class="header__offcanvas offcanvas offcanvas-start"
          tabindex="-1"
          id="headerOffcanvas${page}"
          aria-labelledby="headerOffcanvas${page}Label"
          data-bs-scroll="true"
        >
          <div class="offcanvas-header">
            <h4 class="offcanvas-title" id="headerOffcanvas${page}Label">Menu</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <nav class="header__offcanvas-menu">
              <ul class="header__menuOff">
                <li class="header__menuOff-item">
                  <a class="header__menuOff-link" href="../index.html">Accueil</a>
                </li>
                <li class="header__menuOff-item">
                  <a class="header__menuOff-link" href="${path}lactancia.html"
                    >Allaitement</a
                  >
                </li>
                <li class="header__menuOff-item">
                  <a class="header__menuOff-link" href="${path}soins.html"
                    >Kinésithérapie</a
                  >
                </li>
                <li class="header__menuOff-item">
                  <a class="header__menuOff-link" href="${path}contacto.html"
                    >Contact</a
                  >
                </li>
                <li class="header__menuOff-item">
                  <a class="header__menuOff-link" href="${path}aviso-legal.html"
                    >Mentions légales</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
  `;
};

/*document.addEventListener("DOMContentLoaded", function () {
  const menuSmallScreen = document.getElementById("mobile-menu");

  // Redirigir al link seleccionado
  menuSmallScreen.addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue) {
      window.location.href = selectedValue;
    }
  });
});*/

/* Función que detecta cuando hay scroll en la página para modificar el estilo del footer */
function ajustarFooter() {
  const footer = document.querySelector(".footer");
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;

  if (bodyHeight <= windowHeight) {
    footer.classList.add("footer__fixe"); // No hay scroll
  } else {
    footer.classList.remove("footer__fixe"); // Si hay scroll
  }
}

// Ejecutar cuando la página cargue y al redimensionar la ventana
window.addEventListener("load", ajustarFooter);
window.addEventListener("resize", ajustarFooter);
