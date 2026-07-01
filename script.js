const uploadBtn = document.querySelector("#uploadBtn");
const fileInput = document.querySelector("#fileInput");
const list = document.querySelector(".history-list");
const player = document.querySelector(".player");
const paginator = document.querySelector(".paginator");
const pageSize = document.querySelector(".page-size");
const current = pageSize.querySelector(".page-size__current");
const currentText = current.querySelector("span");
const menu = pageSize.querySelector(".page-size__menu");

const sort = document.querySelector(".sort");
const sortCurrent = sort.querySelector(".sort__current");
const sortText = sortCurrent.querySelector("span");
const sortMenu = sort.querySelector(".sort__menu");

let videos = [];

let ITEMS_PER_PAGE = 10;
let currentPage = 1;

let sortType = "newest";

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const data = await loadVideos(file);

    videos = data["Likes and Favorites"]["Like List"]["ItemFavoriteList"];
		currentPage = 1;

    renderVideos();
});



list.addEventListener("click", (e) => {

    const item = e.target.closest(".history-list__item");

    if (!item) return;

		const video = videos[item.dataset.index]

		player.src = getPlayerLink(video.link)

		document
      .querySelectorAll(".history-list__item")
      .forEach(item => item.classList.remove("active"));

    item.classList.add("active");

    console.log(item.dataset.index);

});

paginator.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots")) {

  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);

  e.target.outerHTML = `
    <input
			class="page-input"
			type="text">
    `;

  const input = paginator.querySelector(".page-input");

	input.focus();

	input.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return;

    const page = Number(input.value);

    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderVideos();
    }

  });

  input.addEventListener("blur", () => {
    renderPagination();
  });

  return;
	}

  const btn = e.target.closest("button");

  if (!btn || btn.disabled) return;

  currentPage = Number(btn.dataset.page);

  renderVideos();

});

const dateFrom = flatpickr("#date-from", {
    dateFormat: "Y-m-d",
});

const dateTo = flatpickr("#date-to", {
    dateFormat: "Y-m-d",
});

async function loadVideos(file) {
  const text = await file.text();
  return JSON.parse(text);
}

function renderVideos() {
	
	list.innerHTML = "";

	const start = (currentPage - 1) * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;

	const page = videos.slice(start, end);

	page.forEach((item, index) => {

	const globalIndex = start + index; 

	const date = new Date(item.date);

	const formatted = date.toLocaleString("en-GB", {
			dateStyle: 'medium',
			timeStyle: 'short'
	})

	list.insertAdjacentHTML("beforeend",
		`
		<li class="history-list__item" data-index=${globalIndex}>
			<div class="tiktok-logo_wrapper">						
				<img src="/assets/tiktok-logo.png" alt="tiktok logo">
			</div>
			<span>${item.link}</span>
			<time>${formatted}</time>
			<a href=${item.link} target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#787c99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
			</a>
		</li>
	`
	)
	})
	renderPagination();
}

function getPlayerLink(link) {
	const id = link.match(/video\/(\d+)/)?.[1];

	if (!id) return null;

	return `https://www.tiktok.com/player/v1/${id}`;
}

function renderPagination() {

	paginator.innerHTML = "";

	const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);

	addButton("<", currentPage - 1, currentPage === 1);

	addPage(currentPage);

	if (currentPage + 1 <= totalPages) {
		addPage(currentPage + 1)
	}

	if (currentPage + 2 <= totalPages) {
		addPage(currentPage + 2)
	}

	if (currentPage + 3 < totalPages) {
		addDots();
	}

	if (currentPage < totalPages) {
		addPage(totalPages)
	}

	addButton(">", currentPage + 1, currentPage === totalPages);
}

function addPage(page) {
	paginator.insertAdjacentHTML("beforeend", 
		`
		<button
			class="${page === currentPage ? "active" : ""}"
			data-page="${page}">
			${page}
		</button>
		`
	)
}

function addButton(text, page, disabled) {
	paginator.insertAdjacentHTML("beforeend", 
		`
			<button
				${disabled ? "disabled" : ""}
				data-page="${page}"
			>
				${text}
			</button>
		`
	)
}

function addDots() {
	paginator.insertAdjacentHTML("beforeend", 
		`
			<span class="dots">...</span>
		`
	)
}

current.addEventListener("click", () => {
  pageSize.classList.toggle("open");
});

menu.addEventListener("click", (e) => {

  const item = e.target.closest("li");

  if (!item) return;

  ITEMS_PER_PAGE = Number(item.dataset.value);

  currentText.textContent = `${ITEMS_PER_PAGE} per page`;

  currentPage = 1;

  renderVideos();

  pageSize.classList.remove("open");

});

document.addEventListener("click", (e) => {

  if (!pageSize.contains(e.target)) {
    pageSize.classList.remove("open");
  }
	
	if (!sort.contains(e.target)) {
		sort.classList.remove("open");
  }

});


sortCurrent.addEventListener("click", () => {
  sort.classList.toggle("open");
});

sortMenu.addEventListener("click", (e) => {

  const item = e.target.closest("li");

  if (!item) return;

  sortType = item.dataset.value;

	sortText.textContent = item.textContent;

	currentPage = 1;

  if (sortType === "newest") {
    videos.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    videos.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  renderVideos();

  sort.classList.remove("open");
});