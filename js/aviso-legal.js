// Seleccionar el header de forma segura
const headerElement = document.querySelector(".header");

// Verificar si existe antes de insertar
if (headerElement) {
  headerElement.insertAdjacentHTML("beforeend", createHeader("Aviso"));
}