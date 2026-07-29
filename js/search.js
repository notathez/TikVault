import { setVideoPlaceholder } from "./modeSwitch.js";
import { openVideo } from "./player.js";

const searchInput = document.querySelector("#search-input");
const searchWrapper = document.querySelector(".searchWrapper")
const clearBtn = document.querySelector(".clear-search-btn");
const errorInfo = document.querySelector(".error-info");
const list = document.querySelector(".history-list");

const videoUrlRegex =
  /^https?:\/\/(?:www\.)?(?:tiktok\.com\/@[\w.-]+\/(?:video|photo)\/\d+|tiktokv\.com\/share\/video\/\d+\/?)$/;

const shortUrlRegex =
    /^https?:\/\/(?:vm|vt)\.tiktok\.com\/[\w]+\/?$/;

searchInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

  const value = e.target.value.trim();

  if (videoUrlRegex.test(value) || shortUrlRegex.test(value)) {
    openVideo(searchInput.value);
  }
  else {
    searchWrapper.classList.add("input-error")
    errorInfo.style.display = "block";
    list.style.height = "calc(100svh - 442px)"
  }

});

searchInput.addEventListener("input", e => {
  const value = e.target.value.trim();

  if (videoUrlRegex.test(value) || shortUrlRegex.test(value) || value == "") {
    searchWrapper.classList.remove("input-error");
    errorInfo.style.display = "none";
    list.style.height = "calc(100svh - 420px)"
  }
})

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchWrapper.classList.remove("input-error");
  errorInfo.style.display = "none";
  list.style.height = "calc(100svh - 420px)";
  clearBtn.style.display = "none";
  setVideoPlaceholder();
})

searchInput.addEventListener("input", (e) => {
  clearBtn.style.display = e.target.value != "" ? "block" : "none";
})
