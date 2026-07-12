import { updateActiveItem } from './player.js';
import { state, setCurrentPage } from './state.js';
import { renderVideos } from './ui.js';

const paginator = document.querySelector(".paginator");
const countDisplay = document.querySelector(".count-display");

export function renderPagination() {
	paginator.innerHTML = "";

	const totalPages = Math.ceil(state.filteredVideos.length / state.itemsPerPage);

	addButton("<<", 1, state.currentPage === 1);
	addButton("<", state.currentPage - 1, state.currentPage === 1);

	if (totalPages <= 5) {
		for (let i = 1; i <= totalPages; i++) {
			addPage(i);
		}

	} else if (totalPages - state.currentPage <= 3) {
		addDots();

		const start = Math.max(1, totalPages - 3);

		for (let i = start; i <= totalPages; i++) {
			addPage(i);
		}

	} else {

		addPage(state.currentPage);

		if (state.currentPage + 1 <= totalPages) {
			addPage(state.currentPage + 1);
		}

		if (state.currentPage + 2 <= totalPages) {
			addPage(state.currentPage + 2);
		}

		if (state.currentPage + 3 < totalPages) {
			addDots();
		}

		if (state.currentPage < totalPages) {
			addPage(totalPages);
		}
	}

	addButton(">", state.currentPage + 1, state.currentPage === totalPages);
}

function addPage(page) {
	paginator.insertAdjacentHTML("beforeend", 
		`
		<button
			class="${page === state.currentPage ? "active" : ""}"
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
			setCurrentPage(page);
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

	setCurrentPage(Number(btn.dataset.page));

	renderVideos();
	updateActiveItem();
});
}

export function renderCountDisplay() {
	const start = (state.currentPage - 1) * state.itemsPerPage + 1;
  const end = Math.min(
    state.currentPage * state.itemsPerPage,
    state.filteredVideos.length
  );

	countDisplay.innerHTML = 
	`
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-text-align-justify-icon lucide-text-align-justify"><path d="M3 5h18"/><path d="M3 12h18"/><path d="M3 19h18"/></svg>
	<span>
		Showing <strong>${start}-${end}</strong> of <strong>${state.filteredVideos.length}</strong>
	</span>
	`
}