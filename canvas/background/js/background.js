'use strict';

const MIN_OBJECTS_VALUE = 50,
  MAX_OBJECTS_VALUE = 200,
  OBJECTS_TYPES_COUNT = 2,
  OBJECTS_COLOR = '#fff',
  SIZE_MIN_VALUE = 0.1,
  SIZE_MAX_VALUE = 0.6,
  ARC_RADIUS_MULTIPLIER = 12,
  OBJECT_WIDTH_MULTIPLIER = 5,
  CROSS_SIDE_MULTIPLIER = 20,
  CROSS_MIN_ROTATE_ANGLE = 0,
  CROSS_MAX_ROTATE_ANGLE = 360,
  CROSS_MIN_SPEED_VALUE = -0.2,
  CROSS_MAX_SPEED_VALUE = 0.2,
  FPS = 20,
  crosses = [],
  circles = [];

const canvas = document.querySelector('#wall'),
  ctx = canvas.getContext('2d');

function getObjectSize() {
  return randomArbitrary(SIZE_MIN_VALUE, SIZE_MAX_VALUE);
}

function getObjectPosition() {
  return [
    randomArbitrary(0, canvas.width),
    randomArbitrary(0, canvas.height)
  ]
}

function getTimeFunction() {
  const timeFunctions =  [
    function timeF1(time) {
      return {
        x: this.x + Math.sin((50 + this.x + (time / 10)) / 100) * 3,
        y: this.y + Math.sin((45 + this.x + (time / 10)) / 100) * 4
      };
    },
    function timeF2(time) {
      return {
        x: this.x + Math.sin((this.x + (time / 10)) / 100) * 5,
        y: this.y + Math.sin((10 + this.x + (time / 10)) / 100) * 2
      }
    }
  ];

  return timeFunctions[randomInteger(0,timeFunctions.length - 1)];
}

function renderCircle(circle) {
  ctx.beginPath();
  ctx.strokeStyle = OBJECTS_COLOR;
  ctx.lineWidth = OBJECT_WIDTH_MULTIPLIER * circle.size;
  ctx.arc(circle.timeFunction(Date.now()).x, circle.timeFunction(Date.now()).y, circle.radius, 0, Math.PI * 2);
  ctx.stroke();
}

function renderCross(cross) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(cross.timeFunction(Date.now()).x, cross.timeFunction(Date.now()).y);
  ctx.rotate(cross.angle);
  cross.angle += cross.speed;
  ctx.strokeStyle = OBJECTS_COLOR;
  ctx.lineWidth = OBJECT_WIDTH_MULTIPLIER * cross.size;
  ctx.moveTo(-cross.sideSize / 2, 0);
  ctx.lineTo(cross.sideSize / 2, 0);
  ctx.moveTo(0, -cross.sideSize / 2);
  ctx.lineTo(0, cross.sideSize / 2);
  ctx.stroke();
  ctx.restore();
}

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.size = getObjectSize();
  this.radius = this.size * ARC_RADIUS_MULTIPLIER;
  this.timeFunction = getTimeFunction();
}

function Cross(x, y) {
  this.x = x;
  this.y = y;
  this.size = getObjectSize();
  this.sideSize = this.size * CROSS_SIDE_MULTIPLIER;
  this.speed = randomArbitrary(CROSS_MIN_SPEED_VALUE, CROSS_MAX_SPEED_VALUE);
  this.angle = inRad(randomInteger(CROSS_MIN_ROTATE_ANGLE, CROSS_MAX_ROTATE_ANGLE));
  this.timeFunction = getTimeFunction();
}

function renderObjects() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  crosses.forEach(cross => {
    renderCross(cross);
  });

  circles.forEach(circle => {
    renderCircle(circle);
  })
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const objectsCount = randomInteger(MIN_OBJECTS_VALUE / OBJECTS_TYPES_COUNT, MAX_OBJECTS_VALUE / OBJECTS_TYPES_COUNT);
  for (let i = 0; i < objectsCount; i++) {
    circles.push(new Circle(...getObjectPosition()));
    crosses.push(new Cross(...getObjectPosition()));
  }
  console.log(circles);

  renderObjects();
  setInterval(() => {
    renderObjects();
  }, 1000 / FPS)
}

function inRad(num) {
  return num * Math.PI / 180;
}

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function randomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener('DOMContentLoaded', init);