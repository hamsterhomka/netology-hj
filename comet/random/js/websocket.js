'use strict';

const webSocket = document.querySelector('.websocket'),
  webSocketNumbers = Array.from(webSocket.querySelectorAll('div'));
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message',(event) => {
  const number = Number(event.data);
  webSocketNumbers.forEach(div => {
    div.classList.remove('flip-it');
  });
  webSocketNumbers[number - 1].classList.add('flip-it');
});

ws.addEventListener('close',(event) => {
  console.log('connection was closed' + event.code);
});