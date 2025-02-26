//* Funciones globales **/

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

//* Import Vercel Analytics */
//VercelAnalytics.inject();



