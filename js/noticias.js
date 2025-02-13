const api_key_newsapi = "f197acd3be3a44dda2cb6e6c2606c6ca";
const searchInput = document.getElementById("news-search");
const newsContainer = document.getElementById("news-container");
let timeout = null;
const numberNews = 15;

//* 2s after introduce input letre *//
searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const theme = searchInput.value.trim();
    if (theme) {
      fetchNews(theme);
    }
  }, 2000);
});

//* Función que llama a la API para obtener las noticias *//
function fetchNews(theme) {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterdayDate = date.toISOString().split("T")[0]; // Obligatory date yesterday (-24h)

  fetch(
    `https://newsapi.org/v2/everything?q=${theme}&from=${yesterdayDate}&sortBy=popularity&apiKey=${api_key_newsapi}`
  )
    .then((response) => response.json())
    .then((data) => {
      renderNews(data.articles.slice(0, numberNews)); // Solo las primeras ${numberNews} noticias
    })
    .catch((error) => {
      console.error("Error al obtener noticias:", error);
    });
}

//* Función para renderizar las noticias en cards *//
function renderNews(articles) {
  newsContainer.innerHTML = "";

  articles.slice(0, numberNews).forEach(article => { // Solo las primeras ${numberNews} noticias
      const { title, description, url, urlToImage, author, source, publishedAt } = article;

      const newCard = document.createElement("div");
      newCard.classList.add("card");

      //Estructure card bootstrap
      newCard.innerHTML = `
          <img src="${urlToImage || '../assets/no-image.jpg'}" class="card-img-top" alt="${title}">
          <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <a href="${url}" target="_blank" class="card-link">Ir a la noticia</a>
          </div>
          <ul class="list-group list-group-flush">
              <li class="list-group-item text-truncate"><strong>Autor:</strong> ${author || "Desconocido"}</li>
              <li class="list-group-item"><strong>Fuente:</strong> ${source.name || "Desconocida"}</li>
              <li class="list-group-item"><strong>Fecha:</strong> ${new Date(publishedAt).toLocaleDateString() || "Desconocida"}</li>
          </ul>
      `;

      newsContainer.appendChild(newCard);
  });
}


