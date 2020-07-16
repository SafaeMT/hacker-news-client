const API_URL = "https://hn.algolia.com/api/v1/search";
const searchInput = document.querySelector(".input");

document.querySelector(".button").addEventListener("click", handleRequest);

function handleRequest() {
  const query = searchInput.value;

  fetch(`${API_URL}?query=${query}&tags=story`).then((response) =>
    response.json()
  );
}
