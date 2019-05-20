'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
ws.addEventListener('message',(event) => {
  console.log(event.data);
});

function onEditorUpdate(event) {
  event.canvas.toBlob(blob => ws.send(blob));

}

window.editor.addEventListener('update',onEditorUpdate);