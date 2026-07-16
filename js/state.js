export const state = {
	videos: [],
	filteredVideos: [],
	currentPage: Number(localStorage.getItem("currentPage")) || 1,
	itemsPerPage: Number(localStorage.getItem("itemsPerPage")) || 10,
	globalIndex: Number(localStorage.getItem("globalIndex")) || 0,
	sortType: 'newest',
	theme: localStorage.getItem("theme") || "light"
};

export function setGlobalIndex(index) {
	state.globalIndex = index;
	localStorage.setItem("globalIndex", index)
}

export function setCurrentPage(page) {
	state.currentPage = page;
	localStorage.setItem("currentPage", page);
}

export function setItemsPerPage(size) {
	const firstVisibleIndex =
    (state.currentPage - 1) * state.itemsPerPage;

  state.itemsPerPage = size;

  state.currentPage =
    Math.floor(firstVisibleIndex / size) + 1;

  localStorage.setItem("itemsPerPage", size);
  localStorage.setItem("currentPage", state.currentPage);
}

export function setTheme(theme) {
	state.theme = theme;
	localStorage.setItem("theme", theme);
	
	document.documentElement.classList.toggle(
		"dark",
		theme == "dark"
	)
}