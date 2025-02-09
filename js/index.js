document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobile-menu");

  // Redirigir al seleccionar una opción
  mobileMenu.addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue) {
      window.location.href = selectedValue;
    }
  });
});