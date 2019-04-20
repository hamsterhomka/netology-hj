'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');
const signInOutput = signInForm.querySelector('.error-message');
const signUpOutput = signUpForm.querySelector('.error-message');

function onSignInSubmit(event) {
  event.preventDefault();
  const signInUrl = 'https://neto-api.herokuapp.com/signin';
  const xhr = new XMLHttpRequest();
  const formData = new FormData(signInForm);

  xhr.addEventListener('load',onSignInXhrLoad);
  xhr.open('POST',signInUrl);
  xhr.send(formData);
}

function onSignInXhrLoad(event) {
  const xhr = event.currentTarget;
  const response = JSON.parse(xhr.responseText);
  if(response.error) {
    signInOutput.textContent = response.message;
  } else {
    signInOutput.textContent = `Пользователь ${response.name} успешно авторизован`;
  }
}

function onSignUpSubmit(event) {
  event.preventDefault();
  const signUpUrl = 'https://neto-api.herokuapp.com/signup';
  const xhr = new XMLHttpRequest();
  const formData = new FormData(signUpForm);

  xhr.addEventListener('load',onSignUpXhrLoad);
  xhr.open('POST',signUpUrl);
  xhr.send(formData);
}

function onSignUpXhrLoad(event) {
  const xhr = event.currentTarget;
  const response = JSON.parse(xhr.responseText);
  if(response.error) {
    signUpOutput.textContent = response.message;
  } else {
    signInOutput.textContent = `Пользователь ${response.name} успешно зарегистрирован`;
  }
}

function initAuth() {
  signInForm.addEventListener('submit',onSignInSubmit);
  signUpForm.addEventListener('submit',onSignUpSubmit);
}

document.addEventListener('DOMContentLoaded',initAuth);
