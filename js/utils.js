import { setItemsPerPage, state, currentList, setFirstVisibleIndex, setActiveVideo } from "./state.js";
import { applyFilters } from "./filters.js";
import { renderVideos } from "./ui.js";
import { renderCountDisplay } from './pagination.js';
import { updateActiveItem } from "./player.js";
import { openVideo } from "./player.js";

export async function loadVideos(file) {
	const text = await file.text();
	return JSON.parse(text);
}

export function getPlayerLink(link) {
  const id = link.match(/(?:video|photo)\/(\d+)/)?.[1]
          || link.match(/share\/video\/(\d+)/)?.[1];

  if (!id) return null;

  return `https://www.tiktok.com/player/v1/${id}`;
}

export function refresh() {
  applyFilters();
  renderVideos();
  renderCountDisplay();
  updateActiveItem();
}