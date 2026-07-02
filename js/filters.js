import { state } from "./state.js";
import { dateFrom, dateTo } from "./dateFilter.js";

export function applyFilters() {
  state.filteredVideos = [...state.videos];

  const from = dateFrom.selectedDates[0];
  const to = dateTo.selectedDates[0];

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

  if (state.sortType === "newest") {
    state.filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    state.filteredVideos.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}