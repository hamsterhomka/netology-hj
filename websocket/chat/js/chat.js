'use strict';

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const sendButton = chat.querySelector('.message-submit');
const messagesTemplates = chat.querySelector('.messages-templates');
const statusMessageTemplate = messagesTemplates.querySelector('.message-status');
const loadingMessageTemplate = messagesTemplates.querySelector('.message.loading');
const otherUserMessageTemplate = messagesTemplates.querySelector('[class="message"]');
const userMessageTemplate = messagesTemplates.querySelector('.message-personal');
const messagesContent = chat.querySelector('.messages-content');
const messageForm = chat.querySelector('.message-box');
const messageInput = messageForm.querySelector('.message-input');

let connection;

function initWebsocket() {
  connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
  connection.addEventListener('open',openConnectionEventHandler);
  connection.addEventListener('message',messageEventHandler);
  connection.addEventListener('error',(error) => {
    console.log(`Произошла ошибка ${error.data}`)
  });
  connection.addEventListener('close', connectionCloseEventHandler);

}

function openConnectionEventHandler() {
  chatStatus.textContent = chatStatus.dataset.online;
  sendButton.disabled = false;
  messagesContent.appendChild(getStatusMessage('Пользователь появился в сети'));
}

function messageEventHandler(event) {
  const message = event.data;

  if(message === '...') {
    messagesContent.appendChild(getLoadingMessage('Пользователь печатает сообщение'));
  } else {
    const loadingMessage = messagesContent.querySelector('.message.loading');

    if(loadingMessage) {
      messagesContent.removeChild(loadingMessage);
    }
    messagesContent.appendChild(getOtherUserMessage(message,getMessageTime()));
  }
}

function connectionCloseEventHandler() {
  chatStatus.textContent = chatStatus.dataset.offline;
  sendButton.disabled = true;
  messagesContent.appendChild(getStatusMessage('Пользователь не в сети'));
}

function getMessageTime() {
  const date = new Date();
  return date.getHours() + ':' + date.getMinutes();
}

function getStatusMessage(text) {
  const message = statusMessageTemplate.cloneNode(true);
  message.querySelector('.message-text').textContent = text;
  return message;
}

function getLoadingMessage(text) {
  const message = loadingMessageTemplate.cloneNode(true);
  message.querySelector('span').textContent = text;
  return message;
}

function getOtherUserMessage(text,time) {
  const message = otherUserMessageTemplate.cloneNode(true);
  message.querySelector('.message-text').textContent = text;
  message.querySelector('.timestamp').textContent = time;
  return message;
}

function getUserMessage(text,time) {
  const message = userMessageTemplate.cloneNode(true);
  message.querySelector('.message-text').textContent = text;
  message.querySelector('.timestamp').textContent = time;
  return message;
}

function sendMessageEventHandler(event) {
  event.preventDefault();
  const message = messageInput.value;
  connection.send(message);
  messagesContent.appendChild(getUserMessage(message,getMessageTime()));
  messageInput.value = '';
}

function initChat() {
  initWebsocket();
  messageForm.addEventListener('submit',sendMessageEventHandler)
}

document.addEventListener('DOMContentLoaded', initChat);