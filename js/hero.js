import { state } from "./state.js";

const heroImg = document.querySelector(".hero-img img");

export function updateHeroImg() {
	if (heroImg) {
			heroImg.src = state.theme == "light" ? "assets/hero-light.png" : "assets/hero-dark.png";
	}
}