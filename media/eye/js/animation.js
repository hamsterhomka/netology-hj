'use strict';

const eye = document.querySelector('.big-book__eye'),
  pupil = document.querySelector('.big-book__pupil');

const MAX_SIZE_VALUE = 3,
  MIN_SIZE_VALUE = 1,
  OFFSET_MAX_VALUE = 30;

function getEyePos() {
  const rect = eye.getBoundingClientRect();

  return [
    (rect.left + rect.right) / 2,
    (rect.top + rect.bottom) / 2
  ]
}

function setAnimationProperties(progressX, progressY) {
  const maxProgress = Math.max(Math.abs(progressX), Math.abs(progressY));

  pupil.style.setProperty(
    '--pupil-size',
    MAX_SIZE_VALUE - (MAX_SIZE_VALUE - MIN_SIZE_VALUE) * maxProgress
  );
  pupil.style.setProperty('--pupil-x', OFFSET_MAX_VALUE * progressX + 'px');
  pupil.style.setProperty('--pupil-y', OFFSET_MAX_VALUE * progressY + 'px');
}

function animatePupil(event) {
  const [pupilX, pupilY] = getEyePos(),
    maxLengthX = (event.clientX > pupilX) ? window.innerWidth - pupilX : pupilX,
    maxLengthY = (event.clientY > pupilY) ? window.innerHeight - pupilY : pupilY,
    progressX = (event.clientX - pupilX) / maxLengthX,
    progressY = (event.clientY - pupilY) / maxLengthY;

  requestAnimationFrame(() => {
    setAnimationProperties(progressX, progressY);
  });
}

function init() {
  document.addEventListener('mousemove',animatePupil);
}

document.addEventListener('DOMContentLoaded',init);