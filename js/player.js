import {setGlobalIndex, state} from './state.js'
import { getPlayerLink } from "./utils.js";

const player = document.querySelector(".player");
const videoLink = document.querySelector(".copy-link a");
const copyLinkBtn = document.querySelector(".copy-link button");
const list = document.querySelector(".history-list");

export function initPlayer() {

  const currentItem = list.querySelector(
    `[data-index="${state.globalIndex}"]`
  );

  if (currentItem) {
    openVideo(state.filteredVideos[state.globalIndex].link);
    updateActiveItem();
  }

  list.addEventListener("click", (e) => {

  const item = e.target.closest(".history-list__item");

  if (!item) return;

  setGlobalIndex(Number(item.dataset.index));

  openVideo(state.filteredVideos[state.globalIndex].link);

  updateActiveItem();
  });
}

export function openVideo(link) {
  player.src = getPlayerLink(link);

  videoLink.href = link;
  videoLink.textContent = link;
}

function setActiveItem(item) {
  list.querySelectorAll(".history-list__item")
    .forEach(el => el.classList.remove("active"));

  item.classList.add("active");
}

if (copyLinkBtn) {
  copyLinkBtn.addEventListener('click', async () => {
	await navigator.clipboard.writeText(videoLink.href)
})
}

export function updateActiveItem() {
  list.querySelectorAll(".history-list__item")
    .forEach(el => el.classList.remove("active"));

  const active = list.querySelector(
    `[data-index="${state.globalIndex}"]`
  );

  active?.classList.add("active");
}