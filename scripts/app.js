'use strict';

const HABBIT_KEY = 'HABBIT_KEY';
let habbits = [];

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

(() => {
	loadData();
})();
