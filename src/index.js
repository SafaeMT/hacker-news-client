const API_URL = "https://hn.algolia.com/api/v1/search";
const searchInput = document.querySelector(".input");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const table = document.querySelector(".table");
const loader = document.querySelector(".loader");
const more = document.querySelector(".more");

let state = {
  query: "",
  stories: [],
  page: 0,
};

document.querySelector(".button").addEventListener("click", handleRequest);
document.querySelector(".more").addEventListener("click", handleMoreRequest);
thead.addEventListener("click", (e) => {
  if (e.target.classList.contains("titleColumn")) {
    state.stories.sort((hitA, hitB) => {
      if (hitA.title.trim().toLowerCase() <= hitB.title.trim().toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (e.target.classList.contains("authorColumn")) {
    state.stories.sort((hitA, hitB) => {
      if (
        hitA.author.trim().toLowerCase() <= hitB.author.trim().toLowerCase()
      ) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (e.target.classList.contains("commentsColumn")) {
    state.stories.sort((hitA, hitB) => {
      if (hitA.num_comments >= hitB.num_comments) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (e.target.classList.contains("pointsColumn")) {
    state.stories.sort((hitA, hitB) => {
      if (hitA.points >= hitB.points) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  renderStories();
});

function handleRequest() {
  table.classList.add("is-hidden");
  more.classList.add("is-hidden");
  loader.classList.remove("is-hidden");

  state = {
    query: searchInput.value,
    stories: [],
    page: 0,
  };

  fetch(`${API_URL}?query=${state.query}&tags=story`)
    .then((response) => response.json())
    .then(handleResponse);
}

function handleMoreRequest() {
  loader.classList.remove("is-hidden");

  fetch(`${API_URL}?query=${state.query}&tags=story&page=${state.page + 1}`)
    .then((response) => response.json())
    .then(handleResponse);
}

function handleResponse({ hits, page }) {
  const newStories = hits.map((story) => {
    if (story.url === null || story.url === "") {
      story.url = `https://news.ycombinator.com/item?id=${story.objectID}`;
    }

    return {
      url: story.url,
      author: story.author,
      title: story.title,
      num_comments: story.num_comments,
      points: story.points,
    };
  });

  state.page = page;
  state.stories = [...state.stories, ...newStories];

  renderStories();
}

function renderStories() {
  if (state.page == 0) {
    thead.innerHTML = `<tr class="has-background-primary">
      <th class="has-text-white py-0"><a class="button is-primary titleColumn">TITLE</a></th>
      <th class="has-text-white py-0"><a class="button is-primary authorColumn">AUTHOR</a></th>
      <th class="has-text-white py-0"><a class="button is-primary commentsColumn">COMMENTS</a></th>
      <th class="has-text-white py-0"><a class="button is-primary pointsColumn">POINTS</a></th>
    </tr>`;
  }

  let result = "";

  state.stories.forEach((story) => {
    result += `<tr>
      <td class="has-text-left"><a href="${story.url}">${story.title}</a></td>
      <td>${story.author}</td>
      <td>${story.num_comments}</td>
      <td>${story.points}</td>
    </tr>`;
  });

  tbody.innerHTML = result;

  if (state.page == 0) {
    table.classList.remove("is-hidden");
    more.classList.remove("is-hidden");
  }

  loader.classList.add("is-hidden");
}
