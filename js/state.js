export const state = {
	videos: [],
	filteredVideos: [],
	currentPage: Number(localStorage.getItem("currentPage")) || 1,
	itemsPerPage: Number(localStorage.getItem("itemsPerPage")) || 10,
	globalIndex: Number(localStorage.getItem("globalIndex")) || 0,
	sortType: 'newest'
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
	state.itemsPerPage = size;
	localStorage.setItem("itemsPerPage", size);
}