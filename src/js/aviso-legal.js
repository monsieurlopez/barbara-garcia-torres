const page = "Aviso";

// Seleccionar el header y el footer de forma segura
const headerElement = document.querySelector(".header");
const footerElement = document.querySelector(".footer");

// Verificar si existe antes de insertar
if (headerElement && footerElement) {
  headerElement.insertAdjacentHTML("beforeend", createHeader(page));
  footerElement.insertAdjacentHTML("beforeend", createFooter(page));
}