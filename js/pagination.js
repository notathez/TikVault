import { state } from './state.js';
import { renderVideos } from './ui.js';

const paginator = document.querySelector(".paginator");

export function renderPagination() {
	paginator.innerHTML = "";

	const totalPages = Math.ceil(state.filteredVideos.length / state.itemsPerPage);

	addButton("<<", 1, state.currentPage === 1);
	addButton("<", state.currentPage - 1, state.currentPage === 1);

	if (totalPages - state.currentPage <= 3) {
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
			state.currentPage = page;
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

	state.currentPage = Number(btn.dataset.page);

	renderVideos();

});
