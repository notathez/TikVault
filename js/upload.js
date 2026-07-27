import {loadVideos, refresh} from './utils.js'
import { setItemsPerPage, state } from './state.js';
import { scrollToSelectedVideo } from './ui.js';

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

		state.likedVideos = data["Likes and Favorites"]["Like List"]["ItemFavoriteList"].map(item => ({
			link: item.link,
			date: item.date
		}));
		state.savedVideos = data["Likes and Favorites"]["Favorite Videos"]["FavoriteVideoList"].map(item => ({
			link: item.Link,
			date: item.Date
		}));

		state.videos = state.mode == "liked" ? state.likedVideos : state.savedVideos;
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
		setGlobalIndex(0);
		currentText.textContent = `${state.itemsPerPage} per page`;

		state.videos = state.mode == "liked" ? state.likedVideos : state.savedVideos;
		state.filteredVideos = [...state.videos];

		refresh();
	});
	scrollToSelectedVideo();
}