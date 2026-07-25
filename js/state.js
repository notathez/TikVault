export const state = {
	likedVideos: [],
	savedVideos: [],

	videos: [],
	filteredVideos: [],
	
	lists: {
		liked: {
			currentPage: Number(localStorage.getItem("likedCurrentPage")) || 1,
			// globalIndex: Number(localStorage.getItem("likedGlobalIndex")) || 0,
			firstVisibleIndex: Number(localStorage.getItem("likedFirstVisibleIndex")) || 0,
			sortType: localStorage.getItem("likedSortType") || "newest",
			dateFrom: localStorage.getItem("likedDateFrom") || null,
			dateTo: localStorage.getItem("likedDateTo") || null,
			},
		saved: {
			currentPage: Number(localStorage.getItem("savedCurrentPage")) || 1,
			// globalIndex: Number(localStorage.getItem("savedGlobalIndex")) || 0,
			firstVisibleIndex: Number(localStorage.getItem("savedFirstVisibleIndex")) || 0,
			sortType: localStorage.getItem("savedSortType") || "newest",
			dateFrom: localStorage.getItem("savedDateFrom") || null,
			dateTo: localStorage.getItem("savedDateTo") || null,
		}
	},

	// currentPage: Number(localStorage.getItem("currentPage")) || 1,
	// globalIndex: Number(localStorage.getItem("globalIndex")) || 0,
	// sortType: 'newest',
	itemsPerPage: Number(localStorage.getItem("itemsPerPage")) || 10,
	// selectedVideoLink: localStorage.getItem("selectedVideoIndex") | 
	theme: localStorage.getItem("theme") || "light",
	mode: localStorage.getItem("mode") || "liked"
};
// export const state = {
// 	likedVideos: [],
// 	savedVideos: [],
// 	videos: [],
// 	filteredVideos: [],
// 	currentPage: Number(localStorage.getItem("currentPage")) || 1,
// 	itemsPerPage: Number(localStorage.getItem("itemsPerPage")) || 10,
// 	globalIndex: Number(localStorage.getItem("globalIndex")) || 0,
// 	sortType: 'newest',
// 	theme: localStorage.getItem("theme") || "light",
// 	mode: localStorage.getItem("mode") || "liked"
// };

export function setGlobalIndex(index) {
	state.lists[state.mode].globalIndex = index;
	localStorage.setItem(state.mode == "liked" ? "likedGlobalIndex" : "savedGlobalIndex", index)
}
// export function setGlobalIndex(index) {
// 	state.globalIndex = index;
// 	localStorage.setItem("globalIndex", index)
// }


export function setCurrentPage(page) {
	state.lists[state.mode].currentPage = page;
	localStorage.setItem(state.mode == "liked" ? "likedCurrentPage" : "savedCurrentPage", page);
}
// export function setCurrentPage(page) {
// 	state.currentPage = page;
// 	localStorage.setItem("currentPage", page);
// }

export function setItemsPerPage(size) {
	const firstVisibleIndex =
    (state.lists[state.mode].currentPage - 1) * state.itemsPerPage;

  state.itemsPerPage = size;

  state.lists[state.mode].currentPage =
    Math.floor(firstVisibleIndex / size) + 1;

  localStorage.setItem("itemsPerPage", size);
  localStorage.setItem(state.mode == "liked" ? "likedCurrentPage" : "savedCurrentPage", state.lists[state.mode].currentPage);
}
// export function setItemsPerPage(size) {
// 	const firstVisibleIndex =
//     (state.currentPage - 1) * state.itemsPerPage;

//   state.itemsPerPage = size;

//   state.currentPage =
//     Math.floor(firstVisibleIndex / size) + 1;

//   localStorage.setItem("itemsPerPage", size);
//   localStorage.setItem("currentPage", state.currentPage);
// }

export function setTheme(theme) {
	state.theme = theme;
	localStorage.setItem("theme", theme);
	
	document.documentElement.classList.toggle(
		"dark",
		theme == "dark"
	)
}

export function setMode(mode) {
	state.mode = mode;
	localStorage.setItem("mode", mode);
}

export function setFirstVisibleIndex(index) {
	state.lists[state.mode].firstVisibleIndex = index;
	localStorage.setItem(state.mode == "liked" ? "likedFirstVisibleIndex" : "savedFirstVisibleIndex", index);
}