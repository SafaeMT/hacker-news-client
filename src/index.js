const API_URL = "https://hn.algolia.com/api/v1/search";
const searchInput = document.querySelector(".input");

document.querySelector(".button").addEventListener("click", handleRequest);

function handleRequest() {
  const query = searchInput.value;

  fetch(`${API_URL}?query=${query}&tags=story`)
    .then((response) => response.json())
    .then((jsonResponse) => handleResponse(jsonResponse));
}

function handleResponse({ hits }) {
  const stories = hits.map((hit) => ({
    url: hit.url,
    author: hit.author,
    title: hit.title,
    num_comments: hit.num_comments,
    points: hit.points,
  }));
}
