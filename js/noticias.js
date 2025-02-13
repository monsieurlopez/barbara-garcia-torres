const api_key_newsapi = "f197acd3be3a44dda2cb6e6c2606c6ca";
const searchInput = document.getElementById("news-search");
const newsContainer = document.getElementById("news-container");
let timeout = null;

searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const theme = searchInput.value.trim();
    if (theme) {
      fetchNews(theme);
    }
  }, 2000);
});

function fetchNews(theme) {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const formattedDate = date.toISOString().split("T")[0];

  fetch(
    `https://newsapi.org/v2/everything?q=${theme}&from=${formattedDate}&sortBy=popularity&apiKey=${api_key_newsapi}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderNews(data.articles.slice(0, 10)); // Solo las primeras 10 noticias
    })
    .catch((error) => {
      console.error("Error al obtener noticias:", error);
    });
}

function renderNews(articles) {
  newsContainer.innerHTML = ""; // Limpiar contenedor antes de agregar nuevas noticias

  articles.slice(0, 10).forEach(article => { // Solo las 10 primeras noticias
      const { title, description, url, urlToImage, author, source, publishedAt } = article;

      // Truncar la descripción a 120 caracteres
      const truncatedDescription = description
          ? description.length > 150
              ? description.substring(0, 150) + "..."
              : description
          : "Sin descripción disponible.";

      const newsCard = document.createElement("div");
      newsCard.classList.add("card");

      newsCard.innerHTML = `
          <img src="${urlToImage || '../assets/no-image.jpg'}" class="card-img-top" alt="${title}">
          <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${truncatedDescription}</p>
              <a href="${url}" target="_blank" class="card-link">Leer más</a>
          </div>
          <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Autor:</strong> ${author || "Desconocido"}</li>
              <li class="list-group-item"><strong>Fuente:</strong> ${source.name || "Desconocida"}</li>
              <li class="list-group-item"><strong>Fecha:</strong> ${new Date(publishedAt).toLocaleDateString()}</li>
          </ul>
      `;

      newsContainer.appendChild(newsCard);
  });
}


