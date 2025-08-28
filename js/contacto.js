/* Función que genera la respuesta tras enviar el formulario --> crea un modal */
const generateMessage = (objeto) => {
  // Aplica el blur al main
  document.getElementsByTagName("main")[0].style.filter = "blur(5px)";

  const modal = document.createElement("div");
  modal.id = "message-response";
  modal.innerHTML = `
      <span type="button" class="close-btn" aria-label="Close"> &times;</span>
      <h2> Le message a été envoyé! ✉️ </h2>
      <p> Merci de m'avoir contactée, je vous répondrai dans les plus brefs délais. </p>
      <h4> Récapitulatif de votre message : </h4>
      <ul>
        <li><strong>Prenom:</strong> ${objeto.nombre}</li>
        ${
          objeto.apellidos
            ? `<li><strong>Nom de famille:</strong> ${objeto.apellidos}</li>`
            : ""
        }
        <li><strong>Email:</strong> ${objeto.email}</li>
        <li><strong>Sujet:</strong> ${objeto.asunto}</li>
        ${
          objeto.mensaje
            ? `<li><strong>Message:</strong> </li>
          <li> ${objeto.mensaje}</li>`
            : ""
        }
      </ul>
      <button type="button" class="btn btn-sm btn-danger mt-3">Fermer</button>
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
          if (elemento.tagName === "SELECT" && elemento.id === "sujet") {
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
        sendEmail(elementos);
      }

      form.classList.add("was-validated");
    });
  });
})();

//* Función para enviar el correo con EmailJS */
// Configurar EmailJS
const publicKey = config.publicKey;
const serviceId = config.serviceId;
const templateId = config.templateId;

emailjs.init(publicKey);

const sendEmail = (datos) => {
  let prenom = datos.nombre;
  let nom = datos.apellidos || "";
  emailjs
    .send(serviceId, templateId, {
      from_name: `${prenom} ${nom}`,
      user_email: datos.email,
      subject: datos.asunto,
      message: datos.mensaje || "Sans message",
    })
    .catch((error) => console.error("Error al enviar el email:", error));
};

const page = "Contacto";

// Seleccionar el header y el footer de forma segura
const headerElement = document.querySelector(".header");
const footerElement = document.querySelector(".footer");

// Verificar si existe antes de insertar
if (headerElement && footerElement) {
  headerElement.insertAdjacentHTML("beforeend", createHeader(page));
  footerElement.insertAdjacentHTML("beforeend", createFooter(page));
}
