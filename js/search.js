import { openVideo } from "./player.js";

const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

  openVideo(searchInput.value);
});