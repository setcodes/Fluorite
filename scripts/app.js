'use strict';

const HABBIT_KEY = 'HABBIT_KEY';
let habbits = [];

//page
const page = {
	menu: document.querySelector('.menu__list'),
};

// utils

function loadData() {
	const habbitsStrings = localStorage.getItem(HABBIT_KEY);
	const habbitsArray = JSON.parse(habbitsStrings);
	if (Array.isArray(habbitsArray)) {
		habbits = habbitsArray;
	}
}
function saveData() {
	localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

//render
function renderMenu(activeHabbit) {
	if (!activeHabbit) {
		return;
	}
	for (const habbit of habbits) {
		const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
		if (!existed) {
			const element = document.createElement('button');
			element.setAttribute('menu-habbit-id', habbit.id);
			element.classList.add('menu__item');
			element.addEventListener('click', () => render(habbit.id));
			element.innerHTML = `<img src="/assets/images/${habbit.icon}.svg" alt="${habbit.name}"  />`;
			if (activeHabbit.id === habbit.id) {
				element.classList.add('menu__item--active');
			}
			page.menu.appendChild(element);
			continue;
		}
		if (activeHabbit.id === habbit.id) {
			existed.classList.add('menu__item--active');
		} else {
			existed.classList.remove('menu__item--active');
		}
	}
}

function render(activeHabbitId) {
	const activeHabbit = habbits.find((habbit) => habbit.id === activeHabbitId);
	renderMenu(activeHabbit);
}

// init
(() => {
	loadData();
	render(habbits[0].id);
})();
