'use strict';

const content = document.getElementById('content');

function onLoad(e) {
    const request = e.currentTarget;
    if(request.status === 200) {
        content.innerHTML = '';
        const books = JSON.parse(request.responseText);

        books.forEach(book => {
            content.innerHTML += `
                <li
                     data-title="${book.title}"
                     data-author="${book.author.name}"
                     data-info="${book.info}"
                     data-price="${book.price}">
                   <img src="${book.cover.small}">
                </li>
            `
        })
    }
}

function init() {
    const request = new XMLHttpRequest();
    request.addEventListener('load',onLoad);
    request.open('GET', 'https://neto-api.herokuapp.com/book/', true);
    request.send();
}

document.addEventListener('DOMContentLoaded',init);