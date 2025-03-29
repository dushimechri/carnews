document.addEventListener("DOMContentLoaded", function () {
  const newsContent = document.getElementById("news-content");
  const carInfo = document.getElementById("car-info");

  const carBrands = {
    toyota: "Toyota",
    tesla: "Tesla",
    mitsubishi: "Mitsubishi",
    rangerover: "Range Rover",
    ferrari: "Ferrari",
  };

  // Event listeners for buttons
  document.getElementById("toyota").addEventListener("click", () => fetchCarNews("Toyota"));
  document.getElementById("tesla").addEventListener("click", () => fetchCarNews("Tesla"));
  document.getElementById("mitsubishi").addEventListener("click", () => fetchCarNews("Mitsubishi"));
  document.getElementById("rangerover").addEventListener("click", () => fetchCarNews("Range Rover"));
  document.getElementById("ferrari").addEventListener("click", () => fetchCarNews("Ferrari"));

  // Function to fetch car news
  function fetchCarNews(brand) {
    const apiUrl = `https://newsapi.org/v2/everything?q=${brand}&from=2025-02-28&sortBy=publishedAt&apiKey=0c06eaabaf12467db5f092b2a4b5cb03`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          displayCarNews(data.articles, brand);
        } else {
          newsContent.innerHTML = "<p>No news articles found.</p>";
        }
      })
      .catch(error => {
        console.error('Error fetching car news:', error);
        newsContent.innerHTML = `<p>There was an error fetching the news: ${error.message}</p>`;
      });
  }

  // Function to display car news
  function displayCarNews(articles, brand) {
    // Clear previous content
    newsContent.innerHTML = '';

    // Display brand info dynamically
    carInfo.innerHTML = `
      <h1>${brand}</h1>
      <p class="cat">Here you can find the latest news about ${brand}!</p>
    `;

    articles.forEach(article => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("news-article");

      articleElement.innerHTML = `
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || 'No description available'}</p>
        <p class="published">Published on: ${new Date(article.publishedAt).toLocaleString()}</p>
      `;

      newsContent.appendChild(articleElement);
    });
  }
});
