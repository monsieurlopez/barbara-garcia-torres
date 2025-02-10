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