const pageSize = document.querySelector(".page-size");
const sort = document.querySelector(".sort");

document.addEventListener("click", (e) => {

  if (!pageSize.contains(e.target)) {
    pageSize.classList.remove("open");
  }

	if (!sort.contains(e.target)) {
		sort.classList.remove("open");
  }

});

