const generateMessage = (objeto) => {
  console.log(objeto);

  // Aplica el blur al body
  document.getElementsByTagName("main")[0].style.filter = "blur(5px)";

  const modal = document.createElement("div");
  modal.id = "message-response";
  modal.innerHTML = `
      <span type="button" class="close-btn" aria-label="Close"> &times;</span>
      <h2> ¡Gracias por contactar con nosotros! </h2>
      <p> Muy pronto nos pondremos en contacto contigo. </p>
      <h4> Resumen de tu mensaje: </h4>
      <ul>
        <li><strong>Nombre:</strong> ${objeto.nombre}</li>
        ${objeto.apellidos ? `<li><strong>Apellido(s):</strong> ${objeto.apellidos}</li>` : ""}
        <li><strong>Email:</strong> ${objeto.email}</li>
        <li><strong>Asunto:</strong> ${objeto.asunto}</li>
        ${objeto.mensaje ? `<li><strong>Mensaje:</strong> ${objeto.mensaje}</li>` : ""}
      </ul>
      <button type="button" class="btn btn-sm btn-danger">Cerrar</button>
    `;

  document.body.appendChild(modal);

  // Función para eliminar el modal y quitar el blur del body
  const closeModal = () => {
    modal.remove();
    document.getElementsByTagName("main")[0].style.filter = "none"; // Elimina el blur
  };

  // Cierra el modal al hacer clic en los botones
  modal.querySelector(".close-btn").addEventListener("click", closeModal);
  modal.querySelector(".btn-danger").addEventListener("click", closeModal);
};


(() => {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Crear objeto con los datos del formulario
      const elementos = Array.from(form.elements)
        .filter((elemento) => elemento.type !== "submit")
        .reduce((obj, elemento) => {
          obj[elemento.name || elemento.id] = elemento.value; // Clave - valor al objeto
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
