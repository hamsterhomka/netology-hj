'use strict';

const canvas = document.querySelector('canvas');
let ctx;

function createStars() {
  //bg
  ctx.fillStyle = '#000000';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  //stars
  const starsCount = getRandomInt(200,401);
  const starColors = ['#ffe9c4','#ffffff','#d4fbff'];

  for(let i = 0;i < starsCount;i++) {
    const starSize = getRandomArbitrary(0,1.1);
    const starRadius = starSize / 2;
    const [...starPos] = [
      getRandomArbitrary(starRadius,canvas.width - starRadius),
      getRandomArbitrary(starRadius,canvas.height - starRadius)
    ];
    ctx.globalAlpha = getRandomArbitrary(0.8,1);
    ctx.fillStyle = starColors[getRandomInt(0,starColors.length)];
    ctx.beginPath();
    ctx.arc(starPos[0],starPos[1],starRadius,0,Math.PI * 2);
    ctx.fill();
  }
}

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');

  canvas.addEventListener('click',createStars);
  createStars();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener('DOMContentLoaded',initStars);