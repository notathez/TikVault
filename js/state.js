export const state = {
	videos: [],
	filteredVideos: [],
	currentPage: Number(localStorage.getItem("currentPage")) || 1,
	itemsPerPage: Number(localStorage.getItem("itemsPerPage")) || 10,
	sortType: 'newest'
};

export function setCurrentPage(page) {
	state.currentPage = page;
	localStorage.setItem("currentPage", page);
}

export function setItemsPerPage(size) {
	state.itemsPerPage = size;
	localStorage.setItem("itemsPerPage", size);
}