'use strict';

let connection;

function initWebSocket() {
  connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

  connection.addEventListener('open', () => {
    console.log('Вебсокет-соединение открыто');
  });
  connection.addEventListener('message', event => {
    console.log(`Получено сообщение: ${event.data}`);
  });
  connection.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
  });
}

function onClick(event) {
  connection.send(JSON.stringify({
    x: event.clientX,
    y: event.clientY
  }));
}

function init() {
  initWebSocket();
  showBubbles(connection);
  document.addEventListener('click',onClick);
}

document.addEventListener('DOMContentLoaded',init);