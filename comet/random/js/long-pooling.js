'use strict';

const longPoolling = document.querySelector('.long-pooling');
const longNumbers = Array.from(longPoolling.querySelectorAll('div'));

setNumber();

function setNumber() {
  fetch('https://neto-api.herokuapp.com/comet/long-pooling')
    .then(response => {
      if(response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => Number(data))
    .then(data => {
      longNumbers.forEach(div => {
          div.classList.remove('flip-it');
        });
      longNumbers[data - 1].classList.add('flip-it');

      setNumber();
    })
    .catch(error => {
      console.log(error.message);
    });
}
