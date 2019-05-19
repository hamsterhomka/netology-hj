'use strict';

const canvas = document.querySelector('#draw'),
  ctx = canvas.getContext('2d');

let curves = [],
  drawing = false,
  needsRepaint = false,
  hue = 0,
  lineWidth = 100,
  lineWidthInc = false;

function resizeCanvas() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  curves = [];
}

function circle(point) {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${point.hue},100%,50%)`;
  ctx.arc(point.x, point.y, point.lineWidth / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function smoothCurve(points) {
  for(let i = 1; i < points.length - 1; i++) {
    const pointFrom = points[i],
      pointTo = points[i + 1];

    ctx.beginPath();
    ctx.lineWidth = pointFrom.lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = `hsl(${pointFrom.hue},100%,50%)`;
    ctx.lineTo(pointFrom.x, pointFrom.y);
    ctx.stroke();

    ctx.lineWidth = pointTo.lineWidth;
    ctx.lineTo(pointTo.x,pointTo.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  curves.forEach(curve => {
    circle(curve[0]);
    smoothCurve(curve);
  })
}

function tick() {
  if (needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  window.requestAnimationFrame(tick);
}

function Point(x,y,hue,lineWidth) {
  this.x = x;
  this.y = y;
  this.hue = hue;
  this.lineWidth = lineWidth;
}

function setHue(shiftKey) {
  if(shiftKey) {
    hue--;
    if(hue < 0) {
      hue = 359;
    }
  } else {
    hue++;
    if(hue > 359) {
      hue = 0;
    }
  }
}

function setLineWidth() {
  if(lineWidthInc) {
    lineWidth++;
    if(lineWidth === 100) {
      lineWidthInc = false;
    }
  } else {
    lineWidth--;
    if(lineWidth === 5) {
      lineWidthInc = true;
    }
  }
}

function init() {
  canvas.style.display = 'block';
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    const shiftKey = event.shiftKey;

    const curve = [];

    curve.push(new Point(event.offsetX, event.offsetY, hue, lineWidth));
    curves.push(curve);
    needsRepaint = true;

    setHue(shiftKey);
    setLineWidth();
  });

  canvas.addEventListener('mouseup', (event) => {
    drawing = false;
  });

  canvas.addEventListener('mouseleave', (event) => {
    drawing = false;
  });

  canvas.addEventListener('mousemove', (event) => {
    if (drawing) {
      const shiftKey = event.shiftKey;
      curves[curves.length - 1].push(new Point(event.offsetX, event.offsetY, hue, lineWidth));
      needsRepaint = true;

      setHue(shiftKey);
      setLineWidth();
    }
  });

  tick();
}

document.addEventListener('DOMContentLoaded', init);