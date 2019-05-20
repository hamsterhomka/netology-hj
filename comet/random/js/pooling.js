'use strict';

const poolling = document.querySelector('.pooling');
const poolingNumbers = Array.from(poolling.querySelectorAll('div'));
let number;

setNumber();
setInterval(setNumber, 1000);

function setNumber() {
  fetch('https://neto-api.herokuapp.com/comet/pooling')
    .then(response => {
      if(response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => Number(data))
    .then(data => {
      if(data !== number) {
        number = data;
        poolingNumbers.forEach(div => {
          div.classList.remove('flip-it');
        });
        poolingNumbers[data - 1].classList.add('flip-it');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}
