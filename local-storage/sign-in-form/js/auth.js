'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');
const signInOutput = signInForm.querySelector('.error-message');
const signUpOutput = signUpForm.querySelector('.error-message');

function onSignInSubmit(event) {
  event.preventDefault();
  const signInUrl = 'https://neto-api.herokuapp.com/signin';
  const formData = new FormData(signInForm);
  let user = {};
  formData.forEach((value,key) => user[key] = value);
  user = JSON.stringify(user);

  fetch(signInUrl,{
    method: 'POST',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (200 <= res.status && res.status < 300) {
        return res;
      }
      throw new Error(res.statusText);
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if(data.error) {
        signInOutput.textContent = data.message;
      } else {
        signInOutput.textContent = `Пользователь ${data.name} успешно авторизован`;
      }
    })
}

function onSignUpSubmit(event) {
  event.preventDefault();
  const signUpUrl = 'https://neto-api.herokuapp.com/signup';
  const formData = new FormData(signUpForm);
  let user = {};
  formData.forEach((value,key) => user[key] = value);
  user = JSON.stringify(user);

  fetch(signUpUrl,{
    method: 'POST',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (200 <= res.status && res.status < 300) {
        return res;
      }
      throw new Error(res.statusText);
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if(data.error) {
        signUpOutput.textContent = data.message;
      } else {
        signUpOutput.textContent = `Пользователь ${data.name} успешно зарегистрирован`;
      }
    })
}

function initAuth() {
  signInForm.addEventListener('submit',onSignInSubmit);
  signUpForm.addEventListener('submit',onSignUpSubmit);
}

document.addEventListener('DOMContentLoaded',initAuth);
