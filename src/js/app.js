//* Funciones globales **/
const createHeader = () => {
  return `
      <!-- Img Logo Bárbara -->
      <a href="/index.html">
        <img
          class="header__logo"
          src="../assets/icons-svg/logo-barbara.svg"
          alt="imagen de la empresa In Code Coin"
        />
      </a>

      <!-- Menú para pantallas grandes -->
      <nav class="header__nav">
        <ul class="header__menu">
          <li class="header__menu-item">
            <a class="header__menu-link" href="/index.html">Accueil</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="/pages/lactancia.html">Allaitement</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="/pages/soins.html">Kinésithérapie</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="/pages/contacto.html">Contact</a>
          </li>
          <li class="header__menu-item">
            <a class="header__menu-link" href="/pages/aviso-legal.html"
              >Mentions légales</a
            >
          </li>
        </ul>
      </nav>

      <!-- Botón para abrir el offcanvas -->
      <img
        class="header__offcanvas-btn"
        type="button"
        src="/assets/icons-svg/menu-icon.svg"
        alt="Button menu"
        data-bs-toggle="offcanvas"
        data-bs-target="#headerOffcanvas"
        aria-controls="headerOffcanvas"
      />

      <!-- Offcanvas para móviles -->
      <div
        class="header__offcanvas offcanvas offcanvas-start"
        tabindex="-1"
        id="headerOffcanvas"
        aria-labelledby="headerOffcanvasLabel"
        data-bs-scroll="true"
      >
      <div class="offcanvas-header">
        <h4 class="offcanvas-title" id="headerOffcanvasLabel">Menu</h4>
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
              <a class="header__menuOff-link" href="/index.html">Accueil</a>
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="/pages/lactancia.html"
                >Allaitement</a
              >
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="/pages/soins.html"
                >Kinésithérapie</a
              >
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="/pages/contacto.html"
                >Contact</a
              >
            </li>
            <li class="header__menuOff-item">
              <a class="header__menuOff-link" href="/pages/aviso-legal.html"
                >Mentions légales</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `;
};

/* Funcion para crear el footer */
const createFooter = () => {
  return `
  <div class="footer__contact">
        <div class="footer__contact-mail">
          <img src="/assets/icons-svg/email-icon.svg" alt="Email icon" />
          <span>barbaragarciatorres@hotmail.com</span>
        </div>
        <div class="footer__contact-phone">
          <img src="/assets/icons-svg/phone-icon.svg" alt="Téléphone icon" />
          <span>0610740517</span>
        </div>
      </div>
      <p class="footer__legal">
        <a href="/pages/aviso-legal.html">
          Mentions Légales | Politique de Confidentialité</a
        >
      </p>
  `;
};

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
