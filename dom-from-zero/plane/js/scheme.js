'use strict';

const acSelect = document.querySelector('#acSelect'),
  btnSeatMap = document.querySelector('#btnSeatMap'),
  btnSetFull = document.querySelector('#btnSetFull'),
  btnSetEmpty = document.querySelector('#btnSetEmpty'),
  seatMapDiv = document.querySelector('#seatMapDiv'),
  seatMapTitle = document.querySelector('#seatMapTitle'),
  totalPax = document.querySelector('#totalPax'),
  totalAdult = document.querySelector('#totalAdult'),
  totalHalf = document.querySelector('#totalHalf');

function showScheme(data) {
  while(seatMapDiv.firstChild){
    seatMapDiv.removeChild(seatMapDiv.firstChild);
  }
  seatMapTitle.innerText = `${data.title} (${data.passengers} пассажиров)`;
  seatMapDiv.appendChild(createScheme(data));

  Array.from(document.querySelectorAll('.seat')).forEach(seat => {
    seat.addEventListener('click',onSeatClick);
  });
  enableButtons();
}

function updateSeatInfo() {
  const adultCount = seatMapDiv.querySelectorAll('.adult').length;
  const halfCount = seatMapDiv.querySelectorAll('.half').length;
  totalAdult.innerText = adultCount;
  totalHalf.innerText = halfCount;
  totalPax.innerText = adultCount + halfCount;
}

function createScheme(data) {
  const scheme = document.createDocumentFragment();

  for (let i = 0; i < data.scheme.length; i++) {
    scheme.appendChild(
      el('div', {class: 'row seating-row text-center'}, [
        el('div', {class: 'col-xs-1 row-number'}, [
          el('h2', {}, `${i + 1}`)
        ]),
        el('div', {class: 'col-xs-5'}, [
          getSeat('A',data.scheme[i],data),
          getSeat('B',data.scheme[i],data),
          getSeat('C',data.scheme[i],data)
        ]),
        el('div', {class: 'col-xs-5'}, [
          getSeat('D',data.scheme[i],data),
          getSeat('E',data.scheme[i],data),
          getSeat('F',data.scheme[i],data)
        ])
      ])
    );
  }

  return scheme;
}

function getSeat(letter, seatsCount, data) {
  const isSeatExist = (seatsCount === 0) ? false : data[`letters${seatsCount}`].includes(letter),
    innerSeat = isSeatExist ? [el('span', {class: 'seat-label'}, letter)] : '';

  return el('div', {class: `col-xs-4 ${isSeatExist ? 'seat' : 'no-seat'}`}, innerSeat);
}

function el(tagName, attributes, children) {
  const element = document
    .createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element
      .setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.innerText = children;
  } else if (children instanceof Array) {
    children.forEach(child => element
      .appendChild(child));
  }
  return element;
}

function onBtnSeatMapClick(event) {
  event.preventDefault();
  const planeId = acSelect.value;
  fetch(`https://neto-api.herokuapp.com/plane/${planeId}`)
    .then(res => res.json())
    .then(showScheme);
}

function onSeatClick(event) {
  const seat = event.currentTarget;

  if(event.altKey) {
    if(seat.classList.contains('half')) {
      seat.classList.remove('half');
    } else {
      seat.classList.remove('adult');
      seat.classList.add('half');
    }
  } else if(seat.classList.contains('adult') || seat.classList.contains('half')) {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  } else {
    seat.classList.add('adult');
  }

  updateSeatInfo();
}

function disableButtons() {
  btnSetFull.disabled = btnSetEmpty.disabled = true;
}

function enableButtons() {
  btnSetFull.disabled = btnSetEmpty.disabled = false;

}

function setFull(event) {
  event.preventDefault();
  Array.from(document.querySelectorAll('.seat')).forEach(seat => {
    seat.classList.remove('half');
    seat.classList.add('adult');
  });
  updateSeatInfo();
}

function setEmpty(event) {
  event.preventDefault();
  Array.from(document.querySelectorAll('.seat')).forEach(seat => {
    seat.classList.remove('half');
    seat.classList.remove('adult');
  });
  updateSeatInfo();
}

function init() {
  updateSeatInfo();
  disableButtons();
  btnSeatMap.addEventListener('click', onBtnSeatMapClick);
  btnSetFull.addEventListener('click', setFull);
  btnSetEmpty.addEventListener('click', setEmpty);
}

document.addEventListener('DOMContentLoaded', init);
