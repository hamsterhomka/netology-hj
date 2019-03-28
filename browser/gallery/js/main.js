'use strict';

const images = ['breuer-building.jpg', 'guggenheim-museum.jpg', 'headquarters.jpg', 'IAC.jpg', 'new-museum.jpg'];
const img = document.getElementById('currentPhoto');
let imgNum = 0;
setCurrentImageSrc();

function setCurrentImageSrc() {
    img.src = `./i/${images[imgNum]}`;
}

function prevImg() {
    if(imgNum === 0) {
        imgNum = images.length - 1;
    } else {
        imgNum--;
    }

    setCurrentImageSrc();
}

function nextImg() {
    if(imgNum + 1 === images.length) {
        imgNum = 0;
    } else {
        imgNum++;
    }

    setCurrentImageSrc();
}

const prevBtn = document.getElementById('prevPhoto');
const nextBtn = document.getElementById('nextPhoto');

prevBtn.onclick = prevImg;
nextBtn.onclick = nextImg;