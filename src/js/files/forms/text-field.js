import $ from "jquery";

function textAreasInit() {
	const items = document.querySelectorAll(".text-field");

	if (items.length) {
		items.forEach((item) => {
			const itemField = item.querySelector(".text-field__field");

			if (itemField.tagName === "TEXTAREA") {
				itemField.addEventListener("input", (elem) => {
					elem.target.style.height = "auto";
					elem.target.style.height = elem.target.scrollHeight + "px";
				});
			}

			item.addEventListener("focusin", () => {
				item.classList.add("_focus");
			});

			item.addEventListener("focusout", () => {
				item.classList.remove("_focus");
			});
		});
	} else {
		console.log("Не найдено ни одного text-area");
	}
}

textAreasInit();
