// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";

// Подключение списка активных модулей
import { flsModules } from "./modules.js";


window.onload = () => {

	// Если расширение экрана при изменении их мобильной версии
	// переходит в планшетную, убираем мобильные модификаторы классов
	window.addEventListener('resize', e => {
		if (e.target.innerWidth > 767.98) {
			document.body.classList.remove('menu-show');
		}
	});

	// Клик по меню-бургеру
	document.addEventListener("click", e => {
		const targetElement = e.target;

		if (targetElement.closest('.menu__icon')) {
			document.body.classList.toggle('menu-show');
			document.body.classList.toggle('overflow-hidden');;
		} else if (!targetElement.closest('.menu__body')) {
			document.body.classList.remove('menu-show');
			document.body.classList.remove('overflow-hidden');;
		}

		if (targetElement.hasAttribute('data-fancybox')) {
			document.querySelector('.fancybox__container').style.maxWidth = 'none';
		}
	});
};

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

Fancybox.bind("[data-fancybox]", {
	// Your custom options
  });
