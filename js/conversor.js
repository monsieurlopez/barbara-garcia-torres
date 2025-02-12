//* Creación de una clase personalizada para los inputs de búsqueda *//
class CustomSelect {
  /**
   * Constructor
   * @param {String} elementId id container element
   * @param {Array} options text | value
   * @param {Function} onSelect callback
   */
  constructor(elementId, options, onSelect) {
    // Create a new container
    this.container = document.getElementById(elementId);
    this.onSelect = onSelect;

    // Create elements
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.classList.add("custom-select-input");
    if (elementId === "custom-base-currency") {
      this.input.placeholder = "🔍 Divisa origen";
    } else {
      this.input.placeholder = "🔍 Divisa destino";
    }

    this.optionsContainer = document.createElement("div");
    this.optionsContainer.classList.add("custom-select-options");

    this.container.appendChild(this.input);
    this.container.appendChild(this.optionsContainer);

    this.options = options;
    this.selectedValue = "";

    // Call method init()
    this.init();
  }

  init() {
    this.renderOptions();
    this.setupEvents();
  }

  renderOptions() {
    // Clear options
    this.optionsContainer.innerHTML = "";

    // Create options
    this.options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.textContent = option.text;
      optionElement.dataset.value = option.value;

      // Add event click to every option element
      optionElement.addEventListener("click", () =>
        this.selectOption(option.value, option.text)
      );
      this.optionsContainer.appendChild(optionElement);
    });
  }

  setupEvents() {
    // Focus container events
    this.input.addEventListener("focus", () => {
      this.optionsContainer.style.display = "block";
    });

    // Add filter method
    this.input.addEventListener("input", () => this.filterOptions());

    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.optionsContainer.style.display = "none";
      }
    });
  }

  filterOptions() {
    // Filter options as the text is entered
    const query = this.input.value.toLowerCase();
    this.optionsContainer.querySelectorAll("div").forEach((optionElement) => {
      const text = optionElement.textContent.toLowerCase();
      optionElement.style.display = text.includes(query) ? "block" : "none";
    });
  }

  selectOption(value, text) {
    // Selected option
    this.selectedValue = value;
    this.input.value = text;
    this.optionsContainer.style.display = "none";
    // Callback function
    if (this.onSelect) this.onSelect(value);
  }
}

// Cargar opciones desde divisas.js
const currencyOptions = Object.entries(listaDivisas).map(([key, name]) => ({
  value: key,
  text: `${name}`,
}));

let selectedBaseCurrency = "";
let selectedTargetCurrency = "";

// Crear selects personalizados con la clase 'CustomSelect'
new CustomSelect("custom-base-currency", currencyOptions, (value) => {
  selectedBaseCurrency = value;
});

new CustomSelect("custom-target-currency", currencyOptions, (value) => {
  selectedTargetCurrency = value;
});

//* Función de conversión de divisas *//
function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);

  if (!selectedBaseCurrency || !selectedTargetCurrency || isNaN(amount)) return;

  //* Llamada a la API cuando tenemos los parámetros necesarios *//
  fetch(
    `https://api.frankfurter.app/latest?base=${selectedBaseCurrency}&symbols=${selectedTargetCurrency}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.rates[selectedTargetCurrency]) {
        document.getElementById("result-text").textContent =
          "Conversión no disponible.";
        return;
      }
      const rate = data.rates[selectedTargetCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      document.getElementById(
        "result-text"
      ).textContent = `${amount} ${selectedBaseCurrency} = ${convertedAmount} ${selectedTargetCurrency}`;
    })
    .catch((error) => {
      console.error("Error al obtener la conversión:", error);
      document.getElementById("result-text").textContent =
        "Error al convertir. Inténtalo de nuevo.";
    });
}

document
  .getElementById("convert-button")
  .addEventListener("click", convertCurrency);

//* Convertir al cambiar la cantidad con timeout de 2s *//
let timeoutId;
document.getElementById("amount").addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(convertCurrency, 2000);
});
