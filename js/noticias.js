document.addEventListener("DOMContentLoaded", () => {
    const api_key_newsapi = "f197acd3be3a44dda2cb6e6c2606c6ca"; 
    const searchInput = document.getElementById("news-search");
    let timeout = null;

    searchInput.addEventListener("input", () => {
        clearTimeout(timeout); // Limpiar temporizador anterior
        timeout = setTimeout(() => {
            const theme = searchInput.value.trim();
            if (theme) {
                fetchNews(theme);
            }
        }, 2000); // Espera 2 segundos después del último carácter ingresado
    });

    function fetchNews(theme) {
        const date = new Date();
        date.setDate(date.getDate() - 1); // Un día menos que el actual
        const formattedDate = date.toISOString().split("T")[0];

        fetch(`https://newsapi.org/v2/everything?q=${theme}&from=${formattedDate}&sortBy=popularity&apiKey=${api_key_newsapi}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.articles); // Muestra los artículos en consola
            })
            .catch(error => {
                console.error("Error al obtener noticias:", error);
            });
    }
});
