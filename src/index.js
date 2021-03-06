const API_URL = "https://hn.algolia.com/api/v1/search";
const searchInput = document.querySelector(".input");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const table = document.querySelector(".table");
const loader = document.querySelector(".loader");
const searchBtn = document.querySelector(".search");
const moreBtn = document.querySelector(".more");

let state = {
  query: "",
  stories: [],
  page: 0,
};

searchBtn.addEventListener("click", handleRequest);
moreBtn.addEventListener("click", handleMoreRequest);
thead.addEventListener("click", sortStories);

function handleRequest() {
  if (!searchBtn.hasAttribute("disabled")) {
    searchBtn.setAttribute("disabled", "");

    table.classList.add("is-hidden");
    moreBtn.classList.add("is-hidden");
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
}

function handleMoreRequest() {
  searchBtn.setAttribute("disabled", "");

  moreBtn.classList.add("is-hidden");
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

function sortStories(e) {
  switch (e.target.textContent) {
    case "TITLE":
      sortAlphabetically("title");
      break;

    case "AUTHOR":
      sortAlphabetically("author");
      break;

    case "COMMENTS":
      sortDigitally("comments");
      break;

    case "POINTS":
      sortDigitally("points");
      break;
  }

  renderStories();
}

function sortAlphabetically(column) {
  let itemA;
  let itemB;

  state.stories.sort((hitA, hitB) => {
    if (column === "title") {
      itemA = hitA.title;
      itemB = hitB.title;
    } else if (column === "author") {
      itemA = hitA.author;
      itemB = hitB.author;
    }

    return itemA.trim().toLowerCase() <= itemB.trim().toLowerCase() ? -1 : 1;
  });
}

function sortDigitally(column) {
  let itemA;
  let itemB;

  state.stories.sort((hitA, hitB) => {
    if (column === "comments") {
      itemA = hitA.num_comments;
      itemB = hitB.num_comments;
    } else if (column === "points") {
      itemA = hitA.points;
      itemB = hitB.points;
    }

    return itemA >= itemB ? -1 : 1;
  });
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
    moreBtn.classList.remove("is-hidden");
  }

  loader.classList.add("is-hidden");
  moreBtn.classList.remove("is-hidden");
  searchBtn.removeAttribute("disabled");
}
