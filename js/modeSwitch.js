import { setMode, state } from "./state.js";
import { renderVideos } from "./ui.js";

const switcher = document.querySelector(".videos-switch");
const switchButtons = switcher.querySelectorAll("[data-mode]");

switcher.addEventListener("click", (e) => {
	const btn = e.target.closest("[data-mode]");
	if(!btn) return;

	setMode(btn.dataset.mode);
	state.videos = state.mode == "liked" ? state.likedVideos : state.savedVideos;
	state.filteredVideos = [...state.videos];
	renderVideos();
	
	switchButtons.forEach(switchBtn => {
		switchBtn.classList.remove("active");
	})
	btn.classList.add("active");
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