import { setCurrentPage, setItemsPerPage, state } from "./state.js";
import { applyFilters } from "./filters.js";
import { renderVideos } from "./ui.js";
import { renderCountDisplay } from './pagination.js';

export async function loadVideos(file) {
	const text = await file.text();
	return JSON.parse(text);
}

export function getPlayerLink(link) {
  const id = link.match(/video\/(\d+)/)?.[1];

  if (!id) return null;

  return `https://www.tiktok.com/player/v1/${id}`;
}

export function refresh() {
  setCurrentPage(state.lists[state.mode].currentPage)
  setItemsPerPage(state.itemsPerPage)
  // applyFilters();
  renderVideos();
  renderCountDisplay()
}