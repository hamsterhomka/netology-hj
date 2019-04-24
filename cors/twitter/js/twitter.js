'use strict';

const wallpaper = document.querySelector('[data-wallpaper]');
const username = document.querySelector('[data-username]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const tweets = document.querySelector('[data-tweets]');
const followers = document.querySelector('[data-followers]');
const following = document.querySelector('[data-following]');
const userJsonpFuncName = 'parseUser';

window[userJsonpFuncName] = user => {
  wallpaper.src = user.wallpaper;
  username.textContent = user.username;
  description.textContent = user.description;
  pic.src = user.pic;
  tweets.textContent = user.tweets;
  followers.textContent = user.followers;
  following.textContent = user.following;
};

function init() {
  const jsonpScript = document.createElement('script');
  jsonpScript.src = `https://neto-api.herokuapp.com/twitter/jsonp?callback=${userJsonpFuncName}`;
  document.body.appendChild(jsonpScript);
}


document.addEventListener('DOMContentLoaded',init);