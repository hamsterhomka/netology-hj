'use strict';

const textarea = document.querySelector('.textarea'),
  block = document.querySelector('.block'),
  message = document.querySelector('.message');

function setEyesDown() {
  block.classList.add('active');
}

function setEyesInCenter() {
  block.classList.remove('active');
}

function init() {
  textarea.addEventListener('focus',(event) => {
    setEyesDown();
  });

  textarea.addEventListener('blur',(event) => {
    setEyesInCenter();
  });

  textarea.addEventListener('keydown',() => {
    message.classList.remove('view');
    setEyesDown();
  });

  textarea.addEventListener('keydown',debounce(() => {
    message.classList.add('view');
    setEyesInCenter();
  }, 2000));
}

function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay)
  }
}


document.addEventListener('DOMContentLoaded', init);