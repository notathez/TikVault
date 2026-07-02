import { state } from "./state.js";
import { renderVideos } from "./ui.js";

const pageSize = document.querySelector(".page-size");
const menu = pageSize.querySelector(".page-size__menu");
const current = pageSize.querySelector(".page-size__current");
const currentText = current.querySelector("span");

menu.addEventListener("click", (e) => {
  const item = e.target.closest("li");

  if (!item) return;

  state.itemsPerPage = Number(item.dataset.value);
  state.currentPage = 1;

  currentText.textContent = `${state.itemsPerPage} per page`;

  renderVideos();

  pageSize.classList.remove("open");
});

current.addEventListener("click", () => {
  pageSize.classList.toggle("open");
});