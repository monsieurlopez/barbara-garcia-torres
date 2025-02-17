(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Crear objeto con los datos del formulario
      const elementos = Array.from(form.elements)
        .filter((elemento) => elemento.type !== "submit")
        .reduce((obj, elemento) => {
          obj[elemento.name || elemento.id] = elemento.value; // Nombre y valor al objeto
          return obj;
        }, {});

      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {

        
        const mensaje = `
          Datos del formulario:
          Nombre: ${elementos["nombre"]}
          Apellidos: ${elementos["apellidos"]}
          Email: ${elementos["email"]}
          Asunto: ${elementos["asunto"]}
          Mensaje: ${elementos["mensaje"]}`
        window.alert(mensaje);
      }

      form.classList.add("was-validated");
    });
  });
})();
