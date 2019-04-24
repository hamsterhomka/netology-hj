'use strict';

const pic = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumersBlock = document.querySelector('[data-consumers]');
const recipeJsonpFuncName = 'parseRecipe';
const ratingJsonpFuncName = 'parseRating';
const consumersJsonpFuncName = 'parseConsumers';
let recipeId;

window[recipeJsonpFuncName] = recipe => {
  recipeId = recipe.id;
  pic.style.backgroundImage = `url("${recipe.pic}")`;
  ingredients.textContent = recipe.ingredients.join(',');
  title.textContent = recipe.title;

  const jsonpScript = document.createElement('script');
  jsonpScript.src = `https://neto-api.herokuapp.com/food/${recipeId}/rating?callback=${ratingJsonpFuncName}`;
  document.body.appendChild(jsonpScript);
};

window[ratingJsonpFuncName] = ratingInfo => {
  const MAX_RATING = 10;
  rating.textContent = Math.round(ratingInfo.rating * 100) /100;
  votes.textContent = ratingInfo.votes;
  star.style.width = `${ratingInfo.rating / MAX_RATING * 100}%`;

  const jsonpScript = document.createElement('script');
  jsonpScript.src = `https://neto-api.herokuapp.com/food/${recipeId}/consumers?callback=${consumersJsonpFuncName}`;
  document.body.appendChild(jsonpScript);
};

window[consumersJsonpFuncName] = consumersInfo => {
  consumersInfo.consumers.forEach(consumer => {
    const img = document.createElement('img');
    img.src = consumer.pic;
    img.title = consumer.name;
    consumersBlock.appendChild(img);
  });
  const span = document.createElement('span');
  span.textContent = `(+${consumersInfo.total - consumersInfo.consumers.length})`;
  consumersBlock.appendChild(span);
};

function init() {
  const jsonpScript = document.createElement('script');
  jsonpScript.src = `https://neto-api.herokuapp.com/food/42?callback=${recipeJsonpFuncName}`;
  document.body.appendChild(jsonpScript);
}

document.addEventListener('DOMContentLoaded',init);