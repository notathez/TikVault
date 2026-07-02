import {state} from './state.js'
import { getPlayerLink } from "./utils.js";

const player = document.querySelector(".player");
const videoLink = document.querySelector(".copy-link a");
const copyLinkBtn = document.querySelector(".copy-link button");
const list = document.querySelector(".history-list");

export function initPlayer() {

  list.addEventListener("click", (e) => {

    const item = e.target.closest(".history-list__item");

    if (!item) return;

    const video = state.filteredVideos[item.dataset.index];

    player.src = getPlayerLink(video.link);

    videoLink.href = video.link;
    videoLink.textContent = video.link;

    list.querySelectorAll(".history-list__item").forEach(item => item.classList.remove("active"));

    item.classList.add("active");
  });
}

export function openVideo(link) {
  player.src = getPlayerLink(link);

  videoLink.href = link;
  videoLink.textContent = link;
}

copyLinkBtn.addEventListener('click', async () => {
	await navigator.clipboard.writeText(videoLink.href)
})

