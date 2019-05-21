'use strict';

const app = document.querySelector('.app'),
  controls = document.querySelector('.controls'),
  takePhoto = document.querySelector('#take-photo'),
  list = document.querySelector('.list');

let video;

function onTakePhotoClick(event) {
  const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
  canvas.classList.add('photo-box');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  list.innerHTML += getImageItem(canvas.toDataURL());
}

function initVideo() {
  if(!navigator.mediaDevices) {
    console.log('Взаимодействие с камерой в вашем браузере не поддерживается');
    return;
  }

  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {
      video = document.createElement('video');
      video.srcObject = stream;
      video.onloadedmetadata = (event) => {
        video.play();
      };

      app.appendChild(video);
      controls.style.display = 'flex';
    })
    .catch(err => console.warn(err));
}

function onFileRemoveClick(event) {
  let target = event.target;
  while(target !== list) {//идем вверх пока не найдем элемент с классом file-delete
    if(target.classList.contains('file-delete')) {
      let listItemTarget = target.parentNode;
      while(listItemTarget !== list) {
        if(listItemTarget.tagName.toLowerCase() === 'figure') {
          list.removeChild(listItemTarget);
          return;
        }
        listItemTarget = listItemTarget.parentNode;
      }
    }

    target = target.parentNode;
  }
}

function onFileUploadClick(event) {
  let target = event.target;
  while(target !== list) {//идем вверх пока не найдем элемент с классом file-upload
    if(target.classList.contains('file-upload')) {
      let listItemTarget = target.parentNode;
      let imgSrc;
      while(listItemTarget !== list) {
        if(listItemTarget.tagName.toLowerCase() === 'figure') {
          imgSrc = listItemTarget.querySelector('img');
        }
        listItemTarget = listItemTarget.parentNode;
      }

      fetch(imgSrc)
        .then(res => res.blob())
        .then(blob => {
          const formData = new FormData;
          formData.append('image',blob);

          fetch('https://neto-api.herokuapp.com/photo-booth',{
            method: 'POST',
            headers: {'Content-Type':'multipart/form-data'},
            body: formData
          })
          //.then(response => response.json())
            .then(data => console.log(data));
        });
    }

    target = target.parentNode;
  }
}

function init() {
  initVideo();
  takePhoto.addEventListener('click', onTakePhotoClick);
  list.addEventListener('click',onFileRemoveClick);
  list.addEventListener('click',onFileUploadClick);
}

function getImageItem(src) {
  return `
  <figure>
    <img src="${src}">
    <figcaption>
      <a href="${src}" download="snapshot.png">
        <i class="material-icons">file_download</i>
      </a>
      <a class="file-upload"><i class="material-icons">file_upload</i></a>
      <a class="file-delete"><i class="material-icons">delete</i></a>
    </figcaption>
  </figure>
  `;
}

document.addEventListener('DOMContentLoaded', init);
