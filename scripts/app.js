'use strict';

const HABBIT_KEY = 'HABBIT_KEY';
let habbits = [];

//page
const page = {
	menu: document.querySelector('.menu__list'),
	header: {
		title: document.querySelector('.title'),
		progressPercent: document.querySelector('.progress__percent'),
		progressCoverBar: document.querySelector('.progress__cover-bar'),
	},
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
function renderHeader(activeHabbit) {
	if (!activeHabbit) {
		return;
	}
	page.header.title.innerText = activeHabbit.name;
	const percent =
		activeHabbit.days.length / activeHabbit.target > 1
			? 100
			: (activeHabbit.days.length / activeHabbit.target) * 100;
	page.header.progressPercent.innerText = percent.toFixed(0) + '%';
	page.header.progressCoverBar.setAttribute('style', `width:${percent}%`);
}

function render(activeHabbitId) {
	const activeHabbit = habbits.find((habbit) => habbit.id === activeHabbitId);
	renderMenu(activeHabbit);
	renderHeader(activeHabbit);
}

// init
(() => {
	loadData();
	render(habbits[0].id);
})();
