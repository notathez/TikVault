import { setItemsPerPage, setFirstVisibleIndex, state } from "./state.js";
import { renderVideos, scrollToSelectedVideo } from "./ui.js";
import { renderCountDisplay } from "./pagination.js";
import { updateActiveItem } from "./player.js";

const pageSize = document.querySelector(".page-size");
const menu = pageSize.querySelector(".page-size__menu");
const current = pageSize.querySelector(".page-size__current");
const currentText = current.querySelector("span");

currentText.textContent = `${state.itemsPerPage} per page`;

menu.addEventListener("click", (e) => {
  const item = e.target.closest("li");

  if (!item) return;
  
  let tempCount = state.itemsPerPage;
  // const firstVisibleIndex = (state.lists[state.mode].currentPage - 1) * tempCount;
  setFirstVisibleIndex((state.lists[state.mode].currentPage - 1) * tempCount);

  setItemsPerPage(Number(item.dataset.value))

  state.lists[state.mode].currentPage = Math.floor(state.lists[state.mode].firstVisibleIndex / state.itemsPerPage) + 1;

  currentText.textContent = `${state.itemsPerPage} per page`;

  renderCountDisplay();
  renderVideos();
  // updateActiveItem();

  pageSize.classList.remove("open");

  scrollToSelectedVideo();
});

current.addEventListener("click", () => {
  pageSize.classList.toggle("open");
});