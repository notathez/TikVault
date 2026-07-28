import { applyFilters } from "./filters.js";
import { renderPagination } from "./pagination.js";
import { openVideo } from "./player.js";
import { initSort, updateSortUI } from "./sort.js";
import { setMode, setFirstVisibleIndex, state, currentList, setSortType } from "./state.js";
import { renderVideos } from "./ui.js";
import { refresh } from "./utils.js";

const switcher = document.querySelector(".videos-switch");
const switchButtons = switcher.querySelectorAll("[data-mode]");

switcher.addEventListener("click", (e) => {
	const btn = e.target.closest("[data-mode]");
	if(!btn) return;

	setMode(btn.dataset.mode);
	updateSortUI();
	state.videos = state.mode == "liked" ? state.likedVideos : state.savedVideos;
	state.filteredVideos = [...state.videos];
	renderVideos();
	switchButtons.forEach(switchBtn => {
		switchBtn.classList.remove("active");
	})
	btn.classList.add("active");
	if (currentList().activeVideo == null) {
		return;
	} else {
		openVideo(currentList().activeVideo);
	}
	refresh();
})

export function initSwitch() {
	setMode(state.mode);

	switchButtons.forEach(switchBtn => {
		switchBtn.classList.remove("active");
		
		if (switchBtn.dataset.mode == state.mode) {
			switchBtn.classList.add("active");
		}
	})
}