import { loadVideos } from "./utils.js";
import { setCurrentPage, setItemsPerPage, setTheme, state } from "./state.js";
import "./theme.js";

const uploadField = document.querySelector("#upload-field");
const fileInput = document.querySelector("#file-input");
const uploadBtn = document.querySelector(".upload-button");
const uploadBtnHead = document.querySelector("#uploadBtn")

uploadBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	fileInput.click();
});

uploadBtnHead.addEventListener("click", (e) => {
	e.stopPropagation();
	fileInput.click();
});

uploadField.addEventListener("click", (e) => {
	fileInput.click();
});

fileInput.addEventListener("change", async (e) => {
	const file = e.target.files[0];

	if (!file) return;

	const data = await loadVideos(file);

	localStorage.setItem("tiktok-data", JSON.stringify(data));
	setCurrentPage(1);
	setItemsPerPage(10);
	window.location.href = "vault.html";
})

uploadField.addEventListener("dragover", (e) => {
	e.preventDefault();
	uploadField.classList.add("dragover");
});

uploadField.addEventListener("dragleave", () => {
	uploadField.classList.remove("dragover");
});

uploadField.addEventListener("drop", (e) => {
	e.preventDefault();
	
	uploadField.classList.remove("dragover");

	const file = e.dataTransfer.files[0];

	if (!file) return;
})