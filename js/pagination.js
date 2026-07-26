import { updateActiveItem } from './player.js';
import { state, setFirstVisibleIndex, currentList } from './state.js';
import { renderVideos } from './ui.js';

const paginator = document.querySelector(".paginator");
const countDisplay = document.querySelector(".count-display");

export function renderPagination() {
	paginator.innerHTML = "";

	const currentPage =
		Math.floor(state.lists[state.mode].firstVisibleIndex / state.itemsPerPage) + 1;

	const totalPages = Math.ceil(
		state.filteredVideos.length / state.itemsPerPage
	);

	addButton("<<", 1, currentPage === 1);
	addButton("<", currentPage - 1, currentPage === 1);

	if (totalPages <= 5) {
		for (let i = 1; i <= totalPages; i++) {
			addPage(i);
		}

	} else if (totalPages - currentPage <= 3) {
		addDots();

		const start = Math.max(1, totalPages - 3);

		for (let i = start; i <= totalPages; i++) {
			addPage(i);
		}

	} else {

		addPage(currentPage);

		if (currentPage + 1 <= totalPages) {
			addPage(currentPage + 1);
		}

		if (currentPage + 2 <= totalPages) {
			addPage(currentPage + 2);
		}

		if (currentPage + 3 < totalPages) {
			addDots();
		}

		if (currentPage < totalPages) {
			addPage(totalPages);
		}
	}

	addButton(">", currentPage + 1, currentPage === totalPages);
}

function addPage(page) {
	paginator.insertAdjacentHTML("beforeend", 
		`
		<button
			class="${page === getCurrentPage() ? "active" : ""}"
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

export function initPagination() {
	if (!paginator) return;

	paginator.addEventListener("click", (e) => {
	if (e.target.classList.contains("dots")) {

	const totalPages = Math.ceil(state.filteredVideos.length / state.itemsPerPage);

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
			// setCurrentPage(page);
			renderVideos();
			updateActiveItem();
		}

	});

	input.addEventListener("blur", () => {
		renderPagination();
	});

	return;
	}

	const btn = e.target.closest("button");

	if (!btn || btn.disabled) return;

	// setCurrentPage(Number(btn.dataset.page));
	const page = Number(btn.dataset.page);
	setFirstVisibleIndex((page - 1) * state.itemsPerPage);

	renderVideos();
	updateActiveItem();
});
}

export function renderCountDisplay() {
	// const start = (currentPage - 1) * state.itemsPerPage + 1;
	const currentPage =
  Math.floor(currentList().firstVisibleIndex / state.itemsPerPage) + 1;
	const start = (currentPage - 1) * state.itemsPerPage + 1;
  // const end = Math.min(
  //   currentPage * state.itemsPerPage,
  //   state.filteredVideos.length
  // );
	const end = Math.min(currentPage * state.itemsPerPage, state.filteredVideos.length);

	countDisplay.innerHTML = 
	`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-text-align-justify-icon lucide-text-align-justify"><path d="M3 5h18"/><path d="M3 12h18"/><path d="M3 19h18"/></svg>
	<span>
		Showing <strong>${start}-${end}</strong> of <strong>${state.filteredVideos.length}</strong>
	</span>
	`
}

export function getCurrentPage() {
  return Math.floor(
    state.lists[state.mode].firstVisibleIndex / state.itemsPerPage
  ) + 1;
}