'use strict';

const container = document.getElementById('container');
const addButtons = Array.from(container.querySelectorAll('.add'));
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

const products = [];

function addProduct(e) {
    const button = e.currentTarget;
    const price = Number(button.dataset.price);

    products.push({'price': price});

    let totalPrice = products.reduce((total,product) => total + product.price, 0);

    cartCount.innerHTML = products.length;
    cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);
}

function init() {
    addButtons.forEach(button => {
        button.addEventListener('click',addProduct);
    })
}

document.addEventListener('DOMContentLoaded',init);