import { setItemsPerPage, setFirstVisibleIndex, state } from "./state.js";
import { renderVideos, scrollToSelectedVideo } from "./ui.js";
import { getCurrentPage, renderCountDisplay } from "./pagination.js";
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
  setFirstVisibleIndex((getCurrentPage() - 1) * tempCount);

  setItemsPerPage(Number(item.dataset.value))

  currentText.textContent = `${state.itemsPerPage} per page`;

  renderCountDisplay();
  renderVideos();
  updateActiveItem();

  pageSize.classList.remove("open");
});

current.addEventListener("click", () => {
  pageSize.classList.toggle("open");
});