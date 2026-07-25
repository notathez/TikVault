import { state } from './state.js';
import { renderPagination, renderCountDisplay } from './pagination.js';
import { getPlayerLink } from './utils.js';

const list = document.querySelector(".history-list");
const paginationArea = document.querySelector(".pagination-area");
const player = document.querySelector(".player");
const videoLink = document.querySelector(".copy-link a");

export function renderVideos() {
	paginationArea.style.display = state.filteredVideos.length ? "flex" : "none";

	list.innerHTML = "";

	if (state.filteredVideos.length == 0) {
		list.insertAdjacentHTML("beforeend",
			`
				<li class="empty-list">
					<img src="assets/empty.png" alt="empty list">
					<h2>No videos found</h2>
					<span>Try changing your search or filters.</span>
				</li>
			`
		)
	} else {
		const start = (state.lists[state.mode].currentPage - 1) * state.itemsPerPage;
		const end = start + state.itemsPerPage;

		const page = state.filteredVideos.slice(start, end);

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
					<img src="assets/tiktok-logo.png" alt="tiktok logo">
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
		renderCountDisplay();
		
		list.scrollTo({
			top: 0,
		});
	}
}

export function scrollToSelectedVideo() {
  const item = list.querySelector(
    `[data-index="${state.lists[state.mode].globalIndex}"]`
  );

	if (!item) return;

	list.scrollTo({
		top: item.offsetTop,
		behavior: "smooth"
	});
}