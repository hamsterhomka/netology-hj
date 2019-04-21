'use strict';

const counter = document.querySelector('.counter');
const errors = document.querySelector('output.errors');
let connection;

function initWebsocket() {
  connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
  connection.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    counter.textContent = data.connections;
    errors.textContent = data.errors;
  });
  connection.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
  });

  window.addEventListener('beforeunload',() => {
    connection.onclose = function() {};
    connection.close(1000);
  })
}

function initCounter() {
  initWebsocket();
}

document.addEventListener('DOMContentLoaded',initCounter);