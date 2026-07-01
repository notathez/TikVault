const uploadBtn = document.querySelector("#uploadBtn");
const fileInput = document.querySelector("#fileInput");
const list = document.querySelector(".history-list");
const player = document.querySelector(".player");

let history = []
uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const data = await loadHistory(file);

    history = data["Likes and Favorites"]["Like List"]["ItemFavoriteList"];

    renderHistory(history);
});

list.addEventListener("click", (e) => {

    const item = e.target.closest(".history-list__item");

    if (!item) return;

		const video = history[item.dataset.index]

		player.src = getPlayerLink(video.link)

		document
      .querySelectorAll(".history-list__item")
      .forEach(item => item.classList.remove("active"));

    item.classList.add("active");

    console.log(item.dataset.index);

});

const dateFrom = flatpickr("#date-from", {
    dateFormat: "Y-m-d",
});

const dateTo = flatpickr("#date-to", {
    dateFormat: "Y-m-d",
});

async function loadHistory(file) {
  const text = await file.text();
  return JSON.parse(text);
}

function renderHistory(history) {
	
	list.innerHTML = "";

	history.forEach((item, index) => {

		const date = new Date(item.date);

		const formatted = date.toLocaleString("en-GB", {
			dateStyle: 'medium',
			timeStyle: 'short'
		})

		list.insertAdjacentHTML("beforeend",
			`
			<li class="history-list__item" data-index=${index}>
				<div class="tiktok-logo_wrapper">						
					<img src="/assets/tiktok-logo.png" alt="tiktok logo">
				</div>
				<span>${item.link}</span>
				<time>${formatted}</time>
				<a href=${item.link} target="_blank">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#787c99" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
				</a>
			</li>
		`
		)
	})
}

function getPlayerLink(link) {
	const id = link.match(/video\/(\d+)/)?.[1];

	if (!id) return null;

	return `https://www.tiktok.com/player/v1/${id}`;
}