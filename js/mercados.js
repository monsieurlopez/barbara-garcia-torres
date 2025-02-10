const api_key_coinranking = "coinranking22b1d5f1ed17ba55bcd4a9c076747c62d4bca3520a85df31";

const options = {
    headers: {
        "x-access-token": api_key_coinranking,
    },
};

// Función para formatear números grandes (convertir a trillones y billones)
function formatLargeNumber(number) {
    const num = Number(number);
    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + "T"; // Trillones
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + "B"; // Billones
    }
    return num.toLocaleString(); // Si es menor, formatear con comas
}

// Obtiene las 15 criptomonedas principales
fetch("https://api.coinranking.com/v2/coins?limit=15", options)
    .then((response) => response.json())
    .then((result) => {
        const coins = result.data.coins;
        const tableBody = document.getElementById("mercados__table-body");

        coins.forEach(coin => {
            const row = document.createElement("tr");
            row.classList.add("mercados__table-row");

            // Determina el color del cambio de precio
            const changeClass = coin.change >= 0 ? "mercados__table-change--positive" : "mercados__table-change--negative";

            row.innerHTML = `
                <td class="mercados__table-cell">
                    <img class="mercados__table-logo" src="${coin.iconUrl}" alt="${coin.name} logo">
                </td>
                <td class="mercados__table-cell">${coin.name}</td> <!-- Eliminamos el enlace -->
                <td class="mercados__table-cell">${coin.symbol}</td>
                <td class="mercados__table-cell">$${parseFloat(coin.price).toFixed(2)}</td>
                <td class="mercados__table-cell ${changeClass}">${coin.change}%</td>
                <td class="mercados__table-cell">$${formatLargeNumber(coin.marketCap)}</td>
                <td class="mercados__table-cell">$${formatLargeNumber(coin["24hVolume"])}</td>
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error("Error al obtener las criptomonedas:", error));
