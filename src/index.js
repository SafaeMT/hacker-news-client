const API_URL = "https://hn.algolia.com/api/v1/search";
const searchInput = document.querySelector(".input");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const table = document.querySelector(".table");
const loader = document.querySelector(".loader");
const more = document.querySelector(".more");

let currentState;

document.querySelector(".button").addEventListener("click", handleRequest);
document.querySelector(".more").addEventListener("click", handleMoreRequest);

function handleRequest() {
  table.classList.add("is-hidden");
  more.classList.add("is-hidden");
  loader.classList.remove("is-hidden");

  const query = searchInput.value;

  fetch(`${API_URL}?query=${query}&tags=story`)
    .then((response) => response.json())
    .then((jsonResponse) => {
      currentState = jsonResponse;
      handleResponse(jsonResponse);
    });
}

function handleMoreRequest() {
  loader.classList.remove("is-hidden");
  currentState.page++;

  fetch(
    `${API_URL}?query=${currentState.query}&tags=story&page=${currentState.page}`
  )
    .then((response) => response.json())
    .then((jsonResponse) => {
      currentState = jsonResponse;
      handleResponse(jsonResponse);
    });
}

function handleResponse({ hits }) {
  const stories = hits.map((hit) => {
    if (hit.url === null || hit.url === "") {
      hit.url = `https://news.ycombinator.com/item?id=${hit.objectID}`;
    }

    return {
      url: hit.url,
      author: hit.author,
      title: hit.title,
      num_comments: hit.num_comments,
      points: hit.points,
    };
  });

  renderStories(stories);
}

function renderStories(stories) {
  if (currentState.page == 0) {
    thead.innerHTML = `<tr class="has-background-primary">
      <th class="has-text-white">TITLE</th>
      <th class="has-text-white">AUTHOR</th>
      <th class="has-text-white">COMMENTS</th>
      <th class="has-text-white">POINTS</th>
    </tr>`;
  }

  let result = "";

  stories.forEach((story) => {
    result += `<tr>
      <td class="has-text-left"><a href="${story.url}">${story.title}</a></td>
      <td>${story.author}</td>
      <td>${story.num_comments}</td>
      <td>${story.points}</td>
    </tr>`;
  });

  if (currentState.page == 0) {
    tbody.innerHTML = result;

    table.classList.remove("is-hidden");
    more.classList.remove("is-hidden");
  } else {
    tbody.innerHTML += result;
  }

  loader.classList.add("is-hidden");
}
