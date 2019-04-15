'use strict';

const itemsList = document.querySelector('.items-list');

function onAddToCartButtonClick(event) {
  const target = event.target;
  if(!target.classList.contains('add-to-cart')) {
    return;
  }

  event.preventDefault();
  addToCart({title: target.dataset.title, price: target.dataset.price});
}

function initCart() {
  itemsList.addEventListener('click',onAddToCartButtonClick);
}

document.addEventListener('DOMContentLoaded',initCart);
