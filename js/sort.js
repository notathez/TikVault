import { updateActiveItem } from "./player.js";
import { currentList, setSortType, state, setFirstVisibleIndex, setActiveVideo } from "./state.js";
import { renderVideos } from "./ui.js";
import { refresh } from "./utils.js";

export const sort = document.querySelector(".sort");
const sortCurrent = sort.querySelector(".sort__current");
const sortText = sortCurrent.querySelector("span");
const sortMenu = sort.querySelector(".sort__menu");

export function updateSortUI() {
  sortText.textContent =
    currentList().sortType === "newest"
      ? "Newest"
      : "Oldest";
};

export function initSort() {
  updateSortUI();
};

sortCurrent.addEventListener("click", () => {
  sort.classList.toggle("open");
});

sortMenu.addEventListener("click", (e) => {
  const item = e.target.closest("li");

  if (!item) return;

  setSortType(item.dataset.value);
  
  sortText.innerText = currentList().sortType == "newest" ? "Newest" : "Oldest";

  setFirstVisibleIndex(0);

  refresh();
  setActiveVideo(null);
  updateActiveItem();

  sort.classList.remove("open");
});
