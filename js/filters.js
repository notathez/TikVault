import { currentList, state } from "./state.js";
import { dateFrom, dateTo } from "./dateFilter.js";

export function applyFilters() {
  state.filteredVideos = [...state.videos];

  const from = currentList().dateFrom ? new Date(currentList().dateFrom) : null;
  const to = currentList().dateTo ? new Date(currentList().dateTo) : null;

  if (from) {
    state.filteredVideos = state.filteredVideos.filter(
      video => new Date(video.date) >= from
    );
  }

  if (to) {
    const end = new Date(to);
    end.setHours(23, 59, 59, 999);

    state.filteredVideos = state.filteredVideos.filter(
      video => new Date(video.date) <= end
    );
  }

  if (currentList().sortType === "newest") {
    state.filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    state.filteredVideos.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

}