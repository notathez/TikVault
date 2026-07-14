import { state } from "./state.js";
import { renderVideos } from "./ui.js";
import { refresh } from "./utils.js";

export const sort = document.querySelector(".sort");
const sortCurrent = sort.querySelector(".sort__current");
const sortText = sortCurrent.querySelector("span");
const sortMenu = sort.querySelector(".sort__menu");

sortCurrent.addEventListener("click", () => {
  sort.classList.toggle("open");
});

sortMenu.addEventListener("click", (e) => {
  const item = e.target.closest("li");

  if (!item) return;

  state.sortType = item.dataset.value;
  sortText.textContent = item.textContent;

  refresh();

  sort.classList.remove("open");
});
