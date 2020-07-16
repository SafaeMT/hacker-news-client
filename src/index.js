const API_URL = "https://hn.algolia.com/api/v1/search";
const searchInput = document.querySelector(".input");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");

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

  renderStories(stories);
}

function renderStories(stories) {
  thead.innerHTML = `<tr class="has-background-primary">
    <th class="has-text-white">TITLE</th>
    <th class="has-text-white">AUTHOR</th>
    <th class="has-text-white">COMMENTS</th>
    <th class="has-text-white">POINTS</th>
  </tr>`;

  let result = "";

  stories.forEach((story) => {
    result += `<tr>
      <td class="has-text-left"><a href="${story.url}">${story.title}</a></td>
      <td>${story.author}</td>
      <td>${story.num_comments}</td>
      <td>${story.points}</td>
    </tr>`;
  });

  tbody.innerHTML = result;
}