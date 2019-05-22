'use strict';

const cat = document.querySelector('.cat'),
  positionForLeftEye = cat.querySelector('.cat_position_for_left_eye'),
  leftEye = cat.querySelector('.cat_eye_left'),
  positionForRightEye = cat.querySelector('.cat_position_for_right_eye'),
  rightEye = cat.querySelector('.cat_eye_right');

function getEyePos(el) {
  const rect = el.getBoundingClientRect();

  return [
    (rect.left + rect.right) / 2,
    (rect.top + rect.bottom) / 2
  ]
}

function animateEye(positionForEye,eye) {
  const [centerX, centerY] = getEyePos(positionForEye),
    maxLengthX = (event.clientX > centerX) ? window.innerWidth - centerX : centerX,
    maxLengthY = (event.clientY > centerY) ? window.innerHeight - centerY : centerY,
    progressX = (event.clientX - centerX) / maxLengthX,
    progressY = (event.clientY - centerY) / maxLengthY;

  requestAnimationFrame(() => {
    const distanceToEyeCenterX = positionForEye.clientWidth / 2,
      allFreeSpaceX = distanceToEyeCenterX - eye.offsetWidth / 2,
      distanceToEyeCenterY = positionForEye.clientHeight / 2,
      allFreeSpaceY = distanceToEyeCenterY - eye.offsetHeight / 2;

    eye.style.setProperty('left', allFreeSpaceX + allFreeSpaceX * progressX + 'px');
    eye.style.setProperty('top', allFreeSpaceY + allFreeSpaceY * progressY + 'px');
  });
}

function onMouseMove(event) {
  animateEye(positionForLeftEye,leftEye);
  animateEye(positionForRightEye,rightEye);
}

function init() {
  document.addEventListener('mousemove', throttle(onMouseMove));
}

function throttle(callback) {
  let isWaiting = false;
  return function() {
    if(!isWaiting) {
      callback.apply(this,arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
