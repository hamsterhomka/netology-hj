'use strict';

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const cart = document.querySelector('#quick-cart');
const addToCartButton = document.querySelector('#AddToCart');
const form = document.querySelector('#AddToCartForm');
const productId = form.dataset.productId;

function addProductToStorage() {
  if(!localStorage.products) {
    localStorage.products = JSON.stringify([]);
  }

  const productsInStorage = JSON.parse(localStorage.products);
  const thisProductInStorage = productsInStorage.find(product => {
    return product.id = productId;
  });

  if(!thisProductInStorage) {
    const thisProductInStorage = {id: productId};
    productsInStorage.push(thisProductInStorage);
    localStorage.products = JSON.stringify(productsInStorage);
  }
}

function updateProductInStorage(size,color) {
  const products = JSON.parse(localStorage.products);
  const currentProduct = products.find(product => {
    return product.id = productId;
  });

  currentProduct.size = size;
  currentProduct.color = color;
  localStorage.products = JSON.stringify(products);
}

function getCurrentProductInStorage() {
  const productsInStorage = JSON.parse(localStorage.products);
  return productsInStorage.find(product => {
    return product.id = productId;
  });
}

function addColorSwatch() {
  const colorSwatchUrl = 'https://neto-api.herokuapp.com/cart/colors';
  fetch(colorSwatchUrl)
    .then(res => {
      return res.json();
    })
    .then(colors => {
      colors.forEach(color => {
        colorSwatch.innerHTML += getColorItem(color);
      });

      const colorInputs = Array.from(form.querySelectorAll('input[name="color"]'));
      colorInputs.forEach(size => {
        size.addEventListener('change',onFormStateChange);
      })
    })
}

function addSizes() {
  const sizesUrl = 'https://neto-api.herokuapp.com/cart/sizes';

  fetch(sizesUrl)
    .then(res => { return res.json(); })
    .then(sizes => {
      sizes.forEach(size => {
        sizeSwatch.innerHTML += getSizeItem(size);
      });

      const sizeInputs = Array.from(form.querySelectorAll('input[name="size"]'));
      sizeInputs.forEach(size => {
        size.addEventListener('change',onFormStateChange);
      })
    });
}

function onAddToCartClick(event) {
  event.preventDefault();
  const cartUrl = 'https://neto-api.herokuapp.com/cart';
  const formData = new FormData(form);
  formData.append('productId', productId);

  fetch(cartUrl, {
    body: formData,
    method: 'POST'
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      updateCartState(data);
    });
}

function updateCartState(products) {
  if(products.error) {
    console.error(products.message);
    return;
  }

  cart.innerHTML = '';

  products.forEach(product => {
    cart.innerHTML += getCartProductItem(product);
  });

  cart.innerHTML += getCart(products);
}

function onProductRemoveButtonClick(event) {
  const target = event.target;
  if (!target.classList.contains('remove')) {
    return;
  }

  const removeProductUrl = 'https://neto-api.herokuapp.com/cart/remove';
  const formData = new FormData();
  formData.append('productId', target.dataset.id);

  fetch(removeProductUrl, {
    body: formData,
    method: 'POST'
  })
    .then(res => {
    return res.json();
  })
    .then(data => {
      updateCartState(data);
    });
}

function onFormStateChange(event) {
  const input = event.currentTarget;
  const checkedColor = form.querySelector('input[name="color"]:checked');
  const checkedSize = form.querySelector('input[name="size"]:checked');

  const sizeValue = checkedSize ? checkedSize.value : null;
  const colorValue = checkedColor ? checkedColor.value : null;
  updateProductInStorage(sizeValue,colorValue);
}

function getPriceFormatted(value) {
  return `$${value.toFixed(2)}`;
}

function getColorItem(color) {
  return `
    <div data-value="${color.type}" class="swatch-element color ${color.type} ${color.isAvailable ? 'available': 'soldout'}">
      <div class="tooltip">${color.title}</div>
      <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${color.isAvailable ? '' : 'disabled'}
      ${getCurrentProductInStorage().color === color.type ? 'checked' : ''}>
      <label for="swatch-1-${color.type}" style="border-color: red;"">
        <span style="background-color: ${color.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>
    `;
}

function getSizeItem(size) {
  return `
    <div data-value="${size.type}" class="swatch-element plain ${size.type} ${size.isAvailable ? 'available': 'soldout'}">
      <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${size.isAvailable ? '' : 'disabled'}
      ${getCurrentProductInStorage().size === size.type ? 'checked' : ''} >
      <label for="swatch-0-${size.type}">
        ${size.title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>
    `;
}

function getCartProductItem(product) {
  return `
    <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${product.id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src="${product.pic}" title="${product.title}">
        <span class="s1" style="background-color: #000; opacity: .5">${getPriceFormatted(product.price)}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
    </div>
    `;
}

function getCart(products) {
  const totalPrice = products.reduce((total,product) => {
    return total + product.price * product.quantity;
  }, 0);

  return `
  <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${products.length !== 0 ? 'open' : ''}">
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">${getPriceFormatted(totalPrice)}</span>
    </span>
  </a>
  `;
}

function init() {
  addProductToStorage();
  addColorSwatch();
  addSizes();
  addToCartButton.addEventListener('click',onAddToCartClick);
  cart.addEventListener('click',onProductRemoveButtonClick);
}

document.addEventListener('DOMContentLoaded',init);
