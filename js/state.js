import { updateHeroImg } from "./hero.js";

export const state = {
	likedVideos: [],
	savedVideos: [],

	videos: [],
	filteredVideos: [],
	
	lists: {
		liked: {
			firstVisibleIndex: Number(localStorage.getItem("likedFirstVisibleIndex")) || 0,
			activeVideo: localStorage.getItem("likedActiveVideo") || null,
			sortType: localStorage.getItem("likedSortType") || "newest",
			dateFrom: localStorage.getItem("likedDateFrom") || null,
			dateTo: localStorage.getItem("likedDateTo") || null,
			},
		saved: {
			firstVisibleIndex: Number(localStorage.getItem("savedFirstVisibleIndex")) || 0,
			activeVideo: localStorage.getItem("savedActiveVideo") || null,
			sortType: localStorage.getItem("savedSortType") || "newest",
			dateFrom: localStorage.getItem("savedDateFrom") || null,
			dateTo: localStorage.getItem("savedDateTo") || null,
		}
	},

	itemsPerPage: Number(localStorage.getItem("itemsPerPage")) || 10,
	theme: localStorage.getItem("theme") || "light",
	mode: localStorage.getItem("mode") || "liked"
};

export function setItemsPerPage(size) {
	state.itemsPerPage = size;

	state.lists.liked.firstVisibleIndex = 0;
	state.lists.saved.firstVisibleIndex = 0;

	localStorage.setItem("itemsPerPage", size);
	localStorage.setItem("likedFirstVisibleIndex", 0);
	localStorage.setItem("savedFirstVisibleIndex", 0);
}

export function setTheme(theme) {
	state.theme = theme;
	localStorage.setItem("theme", theme);
	
	document.documentElement.classList.toggle(
		"dark",
		theme == "dark"
	)

	updateHeroImg();
}

export function setMode(mode) {
	state.mode = mode;
	localStorage.setItem("mode", mode);
}

export function setFirstVisibleIndex(index) {
	currentList().firstVisibleIndex = index;
	localStorage.setItem(state.mode == "liked" ? "likedFirstVisibleIndex" : "savedFirstVisibleIndex", index);
}

export function setActiveVideo(link) {
	currentList().activeVideo = link;
	localStorage.setItem(state.mode == "liked" ? "likedActiveVideo" : "savedActiveVideo", link);
}

export function setSortType(type) {
	currentList().sortType = type;
	localStorage.setItem(state.mode == "liked" ? "likedSortType" : "savedSortType", type)
}

export function setDateFrom(date) {
	currentList().dateFrom = date;

	localStorage.setItem(state.mode == "liked" ? "likedDateFrom" : "savedDateFrom", date ?? "")
}

export function setDateTo(date) {
	currentList().dateTo = date;

	localStorage.setItem(state.mode == "liked" ? "likedDateTo" : "savedDateTo", date ?? "")
}

export function currentList() {
	return state.lists[state.mode];
}
