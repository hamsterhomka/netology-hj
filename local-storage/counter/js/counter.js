'use strict';

const counter = document.querySelector('#counter');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');
const reset = document.querySelector('#reset');

function createCounter() {
  if (!localStorage.counter) {
    localStorage.counter = 0;
  }

  updateCounterInfo();
}

function updateCounterInfo() {
  counter.textContent = localStorage.counter;
}

function onIncrementClick() {
  localStorage.counter++;
  updateCounterInfo();
}

function onDecrementClick() {
  if(localStorage.counter > 0) {
    localStorage.counter--;
    updateCounterInfo();
  }
}

function onResetClick() {
  localStorage.counter = 0;
  updateCounterInfo();
}

function initCounter() {
  createCounter();

  increment.addEventListener('click', onIncrementClick);
  decrement.addEventListener('click', onDecrementClick);
  reset.addEventListener('click', onResetClick);
}

document.addEventListener('DOMContentLoaded', initCounter);