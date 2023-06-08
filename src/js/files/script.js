// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";

// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import $ from "jquery";

window.onload = () => {
	// Корректировка значений таблицы (блок Event Schedule)
	correctInit();

	// Инициализация категорий
	categoryInit();

	// Если расширение экрана при изменении их мобильной версии
	// переходит в планшетную, убираем мобильные модификаторы классов
	window.addEventListener("resize", (e) => {
		if (e.target.innerWidth > 767.98) {
			document.body.classList.remove("menu-show");
		}

		correctInit();
	});

	// Клик по меню-бургеру
	document.addEventListener("click", (e) => {
		const targetElement = e.target;

		if (targetElement.closest(".menu__icon")) {
			document.body.classList.toggle("menu-show");
			document.body.classList.toggle("overflow-hidden");
		} else if (!targetElement.closest(".menu__body")) {
			document.body.classList.remove("menu-show");
			document.body.classList.remove("overflow-hidden");
		}

		if (targetElement.hasAttribute("data-fancybox")) {
			document.querySelector(".fancybox__container").style.maxWidth = "none";
		}
	});

	function correctInit() {
		const correctItemsContainer = document.querySelectorAll("[data-correct-container]");

		if (correctItemsContainer.length) {
			console.log(`Найдено контейнеров для корректировки: ${correctItemsContainer.length}`);

			correctItemsContainer.forEach((container) => {
				if (container.style.display === "none") {
					return null;
				}

				const cols = container.querySelectorAll("[data-correct-col]");
				const cells = container.querySelectorAll("[data-correct-row]");

				const colCount = cols.length;
				const rowCount = cells.length / colCount;

				const rows = [];
				for (let i = 0; i < rowCount; i++) {
					const temp = [];
					for (let j = 0; j < colCount; j++) {
						temp.push(0);
					}
					rows.push(temp);
				}

				for (let i = 0; i < cols.length; i++) {
					const curCol = cols[i].querySelectorAll("[data-correct-row]");
					for (let j = 0; j < curCol.length; j++) {
						rows[j][i] = curCol[j];
					}
				}

				const dataHeightGeneral = [];
				let dataHeightRows = [];
				for (let i = 0; i < rowCount; i++) {
					const temp = [];
					for (let j = 0; j < colCount; j++) {
						temp.push(0);
					}
					dataHeightRows.push(temp);
				}

				let dataHeightCols = [colCount];

				cells.forEach((row) => {
					dataHeightGeneral.push(row.offsetHeight);
				});

				console.log(dataHeightGeneral);

				// Записываем данные столбцов в массив
				let index = 0;
				let colData = [];
				for (let i = 0; i <= dataHeightGeneral.length; i++) {
					if (i > 0 && i % rowCount === 0) {
						index = 0;
						dataHeightCols.push(colData);
						colData = [];

						if (i === dataHeightGeneral.length) {
							break;
						}
					}

					colData[index++] = dataHeightGeneral[i];
				}

				// Записываем данный строк в массив
				for (let i = 0; i < dataHeightCols.length; i++) {
					for (let j = 0; j < dataHeightCols[i].length; j++) {
						dataHeightRows[j][i - 1] = dataHeightCols[i][j];
					}
				}

				let dataCols = [];
				for (let i = 0; i < dataHeightRows.length; i++) {
					let maxVal = dataHeightRows[i][0];
					for (let j = 1; j < dataHeightRows[i].length; j++) {
						if (Math.max(dataHeightRows[i][j]) > maxVal) {
							maxVal = Math.max(dataHeightRows[i][j]);
						}
					}
					dataCols.push(maxVal);
				}

				for (let i = 0; i < rows.length; i++) {
					for (let j = 0; j < rows[i].length; j++) {
						rows[i][j].style.minHheight = `${dataCols[i]}px`;
						rows[i][j].style.display = "flex";
						rows[i][j].style.alignItems = "center";
					}
				}
			});
		}
	}

	// Категории =================================================

	function categoryGetButtons() {
		return document.querySelectorAll("[data-category-button]");
	}

	function categoryGetContainers() {
		return document.querySelectorAll("[data-category-container]");
	}

	function categoryEventsInit(categoryButtons, callback) {
		categoryButtons.forEach((categoryButton) => {
			categoryButton.addEventListener("click", (ev) => {
				callback(categoryButton, ev);
			});
		});
	}

	function categoryAction(button, event) {
		const categoryButtons = categoryGetButtons();
		const categoryContainers = categoryGetContainers();

		categoryContainersActionHide(categoryContainers);
		categoryButtonsClassRemove(categoryButtons);

		const categoryContainer = document.querySelector(
			`[data-category-container="${button.dataset.categoryButton}"]`
		);
		categoryContainer.style.removeProperty("display");
		button.classList.add("_active");

		console.log("Контейнер показан");
	}

	function categoryContainersActionHide(categoryContainers) {
		let count = 0;
		categoryContainers.forEach((container) => {
			container.style.display = "none";

			count++;
		});

		console.log(`Контейнеров скрыто: ${count}`);
	}

	function categoryContainersHide(categoryContainers) {
		let count = 0;
		categoryContainers.forEach((container) => {
			if (!container.classList.contains("_active")) {
				container.style.display = "none";

				count++;
			}
		});

		console.log(`Контейнеров скрыто: ${count}`);
	}

	function categoryButtonsClassRemove(categoryButtons) {
		categoryButtons.forEach((button) => {
			button.classList.remove("_active");
		});
	}

	function categoryInit() {
		const categoryButtons = categoryGetButtons();
		const categoryContainers = categoryGetContainers();
		categoryEventsInit(categoryButtons, categoryAction);

		if (categoryButtons.length === categoryContainers.length) {
			console.log(`Катерогий найдено: ${categoryButtons.length}`);
		}

		categoryContainersHide(categoryContainers);
	}
};

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

Fancybox.bind("[data-fancybox]", {
	// Your custom options
});
