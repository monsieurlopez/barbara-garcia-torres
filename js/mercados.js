const api_key_coinranking =
  "coinranking22b1d5f1ed17ba55bcd4a9c076747c62d4bca3520a85df31";
const api_key_fx = "fxf_IbCpIl0sJD8z8xkkB25k";

const options = {
  headers: {
    "x-access-token": api_key_coinranking,
  },
};
// Función para formatear la fecha en formato legible
function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Función para formatear números grandes
function formatLargeNumber(number) {
  const num = Number(number);
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  }
  return num.toLocaleString();
}

// Número de criptomonedas a mostrar
const limitCryptos = 100;

// Función para obtener criptomonedas
function fetchCryptos() {
  fetch(`https://api.coinranking.com/v2/coins?limit=${limitCryptos}`, options)
    .then((response) => response.json())
    .then((result) => {
      const coins = result.data.coins;

      // Inicializa Grid.js en el contenedor
      new gridjs.Grid({
        columns: [
          { name: "Ranking", formatter: (cell) => `#${cell}` },
          {
            name: "Logo",
            formatter: (_, row) =>
              gridjs.html(`
              <img src="${row.cells[1].data}" width="30" height="30" alt="Logo de ${row.cells[2].data}">
            `),
          },
          "Nombre",
          "Símbolo",
          {
            name: "Precio (USD)",
            formatter: (cell) => `$${parseFloat(cell).toFixed(2)}`,
          },
          {
            name: "Variación 24h",
            formatter: (cell) =>
              gridjs.html(
                `<span style="color: ${
                  cell >= 0 ? "green" : "red"
                };">${cell}%</span>`
              ),
          },
          {
            name: "Capitalización (USD)",
            formatter: (cell) => `$${formatLargeNumber(cell)}`,
          },
          {
            name: "Volumen 24h (USD)",
            formatter: (cell) => `$${formatLargeNumber(cell)}`,
          },
        ],
        data: coins.map((coin) => [
          coin.rank,
          coin.iconUrl,
          coin.name,
          coin.symbol,
          coin.price,
          coin.change,
          coin.marketCap,
          coin["24hVolume"],
        ]),
        pagination: { limit: 15 },
        sort: true,
        search: true,
        fixedHeader: true,
        height: "30rem",
        resizable: true,
        style: {
          table: { "font-size": "0.8rem" },
          th: { "text-align": "center", 'color': '#000' },
          td: { padding: "0.3rem", "text-align": "center" },
        },
      }).render(document.getElementById("mercados__grid"));
    })
    .catch((error) => console.error("Error al obtener criptomonedas:", error));
}

// Función para obtener tasas de cambio
function fetchDivisas() {
  const baseEur = "EUR";
  const baseUsd = "USD";
  const currenciesEUR = "USD,GBP,CHF,JPY,CAD,AUD,HKD,MXN";
  const currenciesUSD = "EUR,GBP,CHF,JPY,CAD,AUD,HKD,MXN";

  fetch(
    `https://api.fxfeed.io/v1/latest?base=${baseEur}&currencies=${currenciesEUR}&api_key=${api_key_fx}`
  )
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("mercados__divisas-body-eur");
      tableBody.innerHTML = "";
      const ultimaFecha = document.getElementById("mercados__actualizacion");
      ultimaFecha.textContent = `Última actualización: ${formatDateTime(
        data.date
      )} ✔️`;

      if (data.success) {
        const rows = Object.entries(data.rates).map(([currency, rate]) => {
          return `
            <tr class="mercados__table-row">
              <td class="mercados__table-cell">${currency}</td>
              <td class="mercados__table-cell">${rate.toFixed(4)}</td>
            </tr>
          `;
        });

        tableBody.innerHTML = rows.join("");
      } else {
        console.error("Error en la API de divisas:", data.error.info);
      }
    })
    .catch((error) => console.error("Error al obtener divisas:", error));

  fetch(
    `https://api.fxfeed.io/v1/latest?base=${baseUsd}&currencies=${currenciesUSD}&api_key=${api_key_fx}`
  )
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("mercados__divisas-body-usd");
      tableBody.innerHTML = "";

      if (data.success) {
        const rows = Object.entries(data.rates).map(([currency, rate]) => {
          return `
              <tr class="mercados__table-row">
                <td class="mercados__table-cell">${currency}</td>
                <td class="mercados__table-cell">${rate.toFixed(4)}</td>
              </tr>
            `;
        });

        tableBody.innerHTML = rows.join("");
      } else {
        console.error("Error en la API de divisas:", data.error.info);
      }
    })
    .catch((error) => console.error("Error al obtener divisas:", error));
}

// Manejo de botones de selección
document.addEventListener("DOMContentLoaded", function () {
  const cryptoBtn = document.getElementById("mercados__toggle-crypto");
  const divisasBtn = document.getElementById("mercados__toggle-divisas");
  const cryptoSection = document.querySelector(".mercados__crypto");
  const divisasSection = document.getElementById("mercados__divisas");

  if (cryptoBtn && divisasBtn) {
    cryptoBtn.addEventListener("change", () => {
      cryptoSection.classList.remove("mercados__section--hidden");
      divisasSection.classList.add("mercados__section--hidden");
      fetchCryptos();
    });

    divisasBtn.addEventListener("change", () => {
      cryptoSection.classList.add("mercados__section--hidden");
      divisasSection.classList.remove("mercados__section--hidden");
      fetchDivisas();
    });
  } else {
    console.error("Los botones de selección no se encontraron en el DOM.");
  }

  // Cargar criptos por defecto
  fetchCryptos();
});
