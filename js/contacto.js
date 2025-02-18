/* Función que genera la respuesta tras enviar el formulario --> crea un modal */
const generateMessage = (objeto) => {
  // Aplica el blur al main
  document.getElementsByTagName("main")[0].style.filter = "blur(5px)";

  const modal = document.createElement("div");
  modal.id = "message-response";
  modal.innerHTML = `
      <span type="button" class="close-btn" aria-label="Close"> &times;</span>
      <h2> ¡Hemos recibido tu mensaje! ✉️ </h2>
      <p> Gracias por contactar con nosotros, te responderemos lo antes posible. </p>
      <h4> Resumen de tu mensaje: </h4>
      <ul>
        <li><strong>Nombre:</strong> ${objeto.nombre}</li>
        ${
          objeto.apellidos
            ? `<li><strong>Apellido(s):</strong> ${objeto.apellidos}</li>`
            : ""
        }
        <li><strong>Email:</strong> ${objeto.email}</li>
        <li><strong>Asunto:</strong> ${objeto.asunto}</li>
        ${
          objeto.mensaje
            ? `<li><strong>Mensaje:</strong> </li>
          <li> ${objeto.mensaje}</li>`
            : ""
        }
      </ul>
      <button type="button" class="btn btn-sm btn-danger mt-3">Cerrar</button>
    `;

  document.body.appendChild(modal);

  // Función para eliminar el modal y quitar el blur del main
  const closeModal = () => {
    modal.remove();
    document.getElementsByTagName("main")[0].style.filter = "none"; // Elimina el blur

    // Restablecer el formulario
    document.querySelector(".needs-validation").reset();
    // Eliminar clases de validación de Bootstrap
    document
      .querySelector(".needs-validation")
      .classList.remove("was-validated");
  };

  // Cierra el modal al hacer clic en los botones
  modal.querySelector(".close-btn").addEventListener("click", closeModal);
  modal.querySelector(".btn-danger").addEventListener("click", closeModal);
};


//* Llamamos a esta funcion de manera automatica al entrar en la pagina contacto.html */
/* Utilizamos el código que nos proporciona Bootstrap pero modificado para nuestro formulario */
(() => {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Guardo los datos del formulario
      const elementos = Array.from(form.elements)
        .filter((elemento) => elemento.type !== "submit")
        .reduce((obj, elemento) => {
          if (elemento.tagName === "SELECT" && elemento.id === "asunto") {
            // Obtener el data-text en lugar del value
            obj[elemento.id] =
              elemento.selectedOptions[0].getAttribute("data-text");
          } else {
            obj[elemento.id] = elemento.value;
          }
          return obj;
        }, {});

      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        generateMessage(elementos);
      }

      form.classList.add("was-validated");
    });
  });
})();
