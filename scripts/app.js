'use strict';

const HABBIT_KEY = 'HABBIT_KEY';
let currentHabbitId;
let habbits = [];

//page
const page = {
	menu: document.querySelector('.menu__list'),
	header: {
		title: document.querySelector('.title'),
		progressPercent: document.querySelector('.progress__percent'),
		progressCoverBar: document.querySelector('.progress__cover-bar'),
	},
	content: {
		daysContainer: document.getElementById('days'),
		nextDay: document.querySelector('.habbit__day'),
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
	page.header.title.innerText = activeHabbit.name;
	const percent =
		activeHabbit.days.length / activeHabbit.target > 1
			? 100
			: (activeHabbit.days.length / activeHabbit.target) * 100;
	page.header.progressPercent.innerText = percent.toFixed(0) + '%';
	page.header.progressCoverBar.setAttribute('style', `width:${percent}%`);
}
function renderContent(activeHabbit) {
	page.content.daysContainer.innerHTML = '';
	for (const index in activeHabbit.days) {
		const element = document.createElement('div');
		element.classList.add('habbit');
		element.innerHTML = `<div class="habbit__day">День ${
			Number(index) + 1
		}</div>
        <div class="habbit__comment">${activeHabbit.days[index].comment}</div>
        <button class="habbit__delete" onclick="removeDay(${Number(index)})">
            <img src="/assets/images/delete.svg" alt="Удалить день">
        </button>`;
		page.content.daysContainer.appendChild(element);
	}
	page.content.nextDay.innerText = `День ${activeHabbit.days.length + 1}`;
}
function render(activeHabbitId) {
	const activeHabbit = habbits.find((habbit) => habbit.id === activeHabbitId);
	if (!activeHabbit) {
		return;
	}
	currentHabbitId = activeHabbitId;
	renderMenu(activeHabbit);
	renderHeader(activeHabbit);
	renderContent(activeHabbit);
}
// add day
function addDay(event) {
	const form = event.target;
	event.preventDefault();
	let data = new FormData(form);
	let comment = data.get('comment');
	form['comment'].classList.remove('input__error');
	if (comment.trim() === '') {
		form['comment'].classList.add('input__error');
		form['comment'].setAttribute('placeholder', 'Заполните пожалуйста поле');
	}
	habbits = habbits.map((habbit) => {
		if (habbit.id === currentHabbitId) {
			return {
				...habbit,
				days: habbit.days.concat([{ comment }]),
			};
		}
		return habbit;
	});
	render(currentHabbitId);
	saveData();
	form['comment'].value = '';
}
//remove day
function removeDay(indexDay) {
	if (!indexDay) {
		return;
	}
	habbits = habbits.map((habbit) => {
		if (habbit.id === currentHabbitId) {
			habbit.days.splice(indexDay, 1);
			return {
				...habbit,
				days: habbit.days,
			};
		}
		return habbit;
	});
	render(currentHabbitId);
	saveData();
}
// init
(() => {
	loadData();
	render(habbits[0].id);
})();
