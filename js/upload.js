import {loadVideos, refresh} from './utils.js'
import { state } from './state.js';

const uploadBtn = document.querySelector("#uploadBtn");
const fileInput = document.querySelector("#fileInput");

export function initUpload() {

	uploadBtn.addEventListener("click", () => {
			fileInput.click();
	});

	fileInput.addEventListener("change", async (e) => {

		const file = e.target.files[0];

		if (!file) return;

		const data = await loadVideos(file);

		state.videos = data["Likes and Favorites"]["Like List"]["ItemFavoriteList"]
		state.filteredVideos = [...state.videos];

		refresh();
	});

}