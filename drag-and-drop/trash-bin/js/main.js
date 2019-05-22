'use strict';

const trashBin = document.querySelector('#trash_bin');

let movedLogo;

function init() {
  document.addEventListener('mousedown', event => {
    if(event.target.classList.contains('logo')) {
      movedLogo = event.target;
    }
  });

  document.addEventListener('mousemove', event => {
    if(movedLogo) {
      event.preventDefault();
      movedLogo.style.left = `${event.pageX - movedLogo.clientWidth / 2}px`;
      movedLogo.style.top = `${event.pageY - movedLogo.clientHeight / 2}px`;
      movedLogo.classList.add('moving');
    }
  });

  document.addEventListener('mouseup', event => {
    if(movedLogo) {
      const dragEndElement = document.elementFromPoint(event.clientX,event.clientY);

      console.log(dragEndElement);

      if(dragEndElement === trashBin) {
        movedLogo.classList.remove('moving');
        movedLogo.style.display = 'none';
        movedLogo = null;
      }
    }
  })
}


document.addEventListener('DOMContentLoaded', init);