import {setGlobalIndex, state} from './state.js'
import { getPlayerLink } from "./utils.js";

const player = document.querySelector(".player");
const videoLink = document.querySelector(".copy-link a");
const copyLinkBtn = document.querySelector(".copy-link button");
const list = document.querySelector(".history-list");

export function initPlayer() {

  const currentItem = list.querySelector(
    `[data-index="${state.lists[state.mode].globalIndex}"]`
  );

  if (currentItem) {
    openVideo(state.filteredVideos[state.lists[state.mode].globalIndex].link);
    updateActiveItem();
  }

  list.addEventListener("click", (e) => {

  const item = e.target.closest(".history-list__item");

  if (!item) return;

  setGlobalIndex(Number(item.dataset.index));

  openVideo(state.filteredVideos[state.lists[state.mode].globalIndex].link);

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
  const defaultCopyContent = copyLinkBtn.innerHTML;
  let copyTimer;

  copyLinkBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(videoLink.href);

    clearTimeout(copyTimer);

    copyLinkBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
    `;

    copyTimer = setTimeout(() => {
      copyLinkBtn.innerHTML = defaultCopyContent;
    }, 2000);
  });
}

export function updateActiveItem() {
  list.querySelectorAll(".history-list__item")
    .forEach(el => el.classList.remove("active"));

  const active = list.querySelector(
    `[data-index="${state.lists[state.mode].globalIndex}"]`
  );

  active?.classList.add("active");
}