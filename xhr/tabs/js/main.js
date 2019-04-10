'use strict';

const tabs = Array.from(document.querySelectorAll('.tabs a'));
const activeTab = document.querySelector('.tabs a.active');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');

function openTab(e,tab) {
    if(!tab) {
        e.preventDefault();
        tab = e.currentTarget;
    }

    const link = tab.href;

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    tab.classList.add('active');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('loadstart',onXhrLoadStart);
    xhr.addEventListener('load',onXhrLoad);
    xhr.addEventListener('loadend',onXhrLoadEnd);
    xhr.addEventListener('error',onXhrError);
    xhr.open('GET', link, true);
    xhr.send();
}
function onXhrError(e) {
    console.log('error');
}

function onXhrLoadStart() {
    preloader.classList.remove('hidden');
}

function onXhrLoadEnd() {
    preloader.classList.add('hidden');
}

function onXhrLoad(e) {
    const xhr = e.currentTarget;

    if(xhr.status === 200) {
        content.innerHTML = xhr.responseText;
    }
}

function init() {
    openTab(null,activeTab);

    tabs.forEach(tab => {
        tab.addEventListener('click',openTab);
    })
}

document.addEventListener('DOMContentLoaded', init);