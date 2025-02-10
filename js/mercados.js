//* CODIGO PARA LAS CRYPTOMONEDAS
const api_key_coinranking =
  "coinranking22b1d5f1ed17ba55bcd4a9c076747c62d4bca3520a85df31";

const options = {
  headers: {
    "x-access-token": api_key_coinranking,
  },
};

// Función para formatear los números grandes
function formatLargeNumber(number) {
  const num = Number(number);
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T"; // Trillones
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"; // Billones
  }
  return num.toLocaleString(); // Si es menor, formatear con comas
}

// Obtener de la api Coinranking las 15 mayores cryptomonedas por capitalización
fetch("https://api.coinranking.com/v2/coins?limit=15", options)
  .then((response) => response.json())
  .then((result) => {
    const coins = result.data.coins;
    const tableBody = document.getElementById("mercados__table-body");

    coins.forEach((coin) => {
      const row = document.createElement("tr");
      row.classList.add("mercados__table-row");

      const changeClass =
        coin.change >= 0
          ? "mercados__table-change--positive"
          : "mercados__table-change--negative";

      row.innerHTML = `
                <td class="mercados__table-cell">
                    <img class="mercados__table-logo" src="${
                      coin.iconUrl
                    }" alt="${coin.name} logo">
                </td>
                <td class="mercados__table-cell">${
                  coin.name
                }</td> <!-- Eliminamos el enlace -->
                <td class="mercados__table-cell">${coin.symbol}</td>
                <td class="mercados__table-cell">$${parseFloat(
                  coin.price
                ).toFixed(2)}</td>
                <td class="mercados__table-cell ${changeClass}">${
        coin.change
      }%</td>
                <td class="mercados__table-cell">$${formatLargeNumber(
                  coin.marketCap
                )}</td>
                <td class="mercados__table-cell">$${formatLargeNumber(
                  coin["24hVolume"]
                )}</td>
            `;

      tableBody.appendChild(row);
    });
  })
  .catch((error) =>
    console.error("Error al obtener las criptomonedas:", error)
  );

//* CODIGO PARA LAS DIVISAS
const api_key_fx = "fxf_IbCpIl0sJD8z8xkkB25k";

const base = "EUR"
const currencies = "USD,GBP,CHF,JPY,CAD,AUD,HKD,MXN"

fetch(
  `https://api.fxfeed.io/v1/latest?base=${base}&currencies=${currencies}&api_key=${api_key_fx}`,
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    if (data.success) {
      console.log(`Exchange rates for ${data.date}:`)
      Object.entries(data.rates).forEach(([currency, rate]) => {
        console.log(`${currency}: ${rate}`)
      })
    } else {
      console.error("Error:", data.error.info)
    }
  })
  .catch((error) => console.error("Fetch error:", error))
