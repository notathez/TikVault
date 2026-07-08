import {loadVideos, refresh} from './utils.js'
import { state } from './state.js';

const uploadBtn = document.querySelector("#uploadBtn");
const fileInput = document.querySelector("#fileInput");

const raw = localStorage.getItem("tiktok-data");

if (!raw) {
    window.location.href = "index.html";
} else {
    const data = JSON.parse(raw);

    state.videos = data["Likes and Favorites"]["Like List"]["ItemFavoriteList"];
    state.filteredVideos = [...state.videos];

    refresh();
}

export function initUpload() {

	uploadBtn.addEventListener("click", () => {
			fileInput.click();
	});

	fileInput.addEventListener("change", async (e) => {

		const file = e.target.files[0];

		if (!file) return;

		const data = await loadVideos(file);

		localStorage.setItem("tiktok-data", JSON.stringify(data));

		state.videos = data["Likes and Favorites"]["Like List"]["ItemFavoriteList"]
		state.filteredVideos = [...state.videos];

		refresh();
	});

}