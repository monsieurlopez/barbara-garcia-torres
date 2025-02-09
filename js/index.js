document.addEventListener("DOMContentLoaded", function () {
  const SMALL_SCREEN_MENU = document.getElementById("mobile-menu");

  // Redirigir al link seleccionado
  SMALL_SCREEN_MENU.addEventListener("change", function () {
    const SELECTED_VALUE = this.value;
    if (SELECTED_VALUE) {
      window.location.href = SELECTED_VALUE;
    }
  });
});