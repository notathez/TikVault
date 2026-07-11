import {loadVideos, refresh} from './utils.js'
import { setCurrentPage, setItemsPerPage, state } from './state.js';

const uploadBtn = document.querySelector("#uploadBtn");
const fileInput = document.querySelector("#fileInput");
const pageSize = document.querySelector(".page-size");
const current = pageSize.querySelector(".page-size__current");
const currentText = current.querySelector("span");

const raw = localStorage.getItem("tiktok-data");

if (!raw) {
    window.location.href = "index.html";
} else {
    const data = JSON.parse(raw);

		setCurrentPage(state.currentPage);
		setItemsPerPage(state.itemsPerPage);

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
		setCurrentPage(1);
		setItemsPerPage(10);
		currentText.textContent = `${state.itemsPerPage} per page`;
		// localStorage.setItem("currentPage", 1);
		// localStorage.setItem("itemsPerPage", 10);

		state.videos = data["Likes and Favorites"]["Like List"]["ItemFavoriteList"]
		state.filteredVideos = [...state.videos];

		refresh();
	});

}