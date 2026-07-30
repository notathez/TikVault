import { applyFilters } from "./filters.js";
import { renderPagination } from "./pagination.js";
import { openVideo } from "./player.js";
import { initSort, updateSortUI } from "./sort.js";
import { setMode, state, currentList, setSortType } from "./state.js";
import { renderVideos } from "./ui.js";
import { refresh } from "./utils.js";

const player = document.querySelector(".player");
const videoLink = document.querySelector(".copy-link a");

const switcher = document.querySelector(".videos-switch");
const switchButtons = switcher.querySelectorAll("[data-mode]");

const DEFAULT_PLAYER =
  "https://www.tiktok.com/player/v1/7513591048724221207";
	
let tempVideoLink = currentList().activeVideo || DEFAULT_PLAYER;

switcher.addEventListener("click", (e) => {
	const btn = e.target.closest("[data-mode]");
	if(!btn) return;

	tempVideoLink = currentList().activeVideo || DEFAULT_PLAYER;
	setMode(btn.dataset.mode);
	updateSortUI();
	state.videos = state.mode == "liked" ? state.likedVideos : state.savedVideos;
	// state.filteredVideos = [...state.videos];
	// renderVideos();
	switchButtons.forEach(switchBtn => {
		switchBtn.classList.remove("active");
	})
	btn.classList.add("active");
	setVideoPlaceholder();

	refresh();
})

export function setVideoPlaceholder() {
		if (currentList().activeVideo) {
		openVideo(currentList().activeVideo);
	} else {
		player.src = tempVideoLink;
		videoLink.href = "#";
		videoLink.textContent = "No video selected";
	}
}

export function initSwitch() {
	setMode(state.mode);

	switchButtons.forEach(switchBtn => {
		switchBtn.classList.remove("active");
		
		if (switchBtn.dataset.mode == state.mode) {
			switchBtn.classList.add("active");
		}
	})
}