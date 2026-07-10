import { openVideo } from "./player.js";

const searchInput = document.querySelector("#search-input");
const clearBtn = document.querySelector(".clear-search-btn");

searchInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

  openVideo(searchInput.value);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
})

searchInput.addEventListener("input", (e) => {
  clearBtn.style.display = e.target.value != "" ? "block" : "none";
})
