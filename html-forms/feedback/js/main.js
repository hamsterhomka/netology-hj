const form = document.querySelector('.contentform');
const output = document.getElementById('output');
const changeButton = output.querySelector('.button-contact');
const submitButton = form.querySelector('.button-contact');
const inputs = Array.from(form.querySelectorAll('input'));
const inputZip = form.querySelector('input[name="zip"]');

const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const company = document.getElementById('company');
const role = document.getElementById('role');
const zip = document.getElementById('zip');
const city = document.getElementById('city');
const address = document.getElementById('address');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

function checkForm() {
    let validate = inputs.every(input => {
        return input.value !== '';
    });

    if(validate) {
        submitButton.disabled = false;
    }
}

function onSubmit(e) {
    e.preventDefault();
    form.classList.add('hidden');
    output.classList.remove('hidden');

    name.value = form.querySelector('input[name="name"]').value;
    lastname.value = form.querySelector('input[name="lastname"]').value;
    company.value = form.querySelector('input[name="company"]').value;
    role.value = form.querySelector('input[name="role"]').value;
    zip.value = form.querySelector('input[name="zip"]').value;
    city.value = form.querySelector('input[name="city"]').value;
    address.value = form.querySelector('input[name="address"]').value;
    subject.value = form.querySelector('input[name="subject"]').value;
    message.value = form.querySelector('input[name="message"]').value;
}

function onChangeButtonClick(e) {
    e.preventDefault();
    output.classList.add('hidden');
    form.classList.remove('hidden');
}

function onZipKeydown(e) {
    console.log(e);
    const notProhibitedKeys = ['0','1','2','3','4','5','6','7','8','9','ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
        'Backspace','F5','Delete', 'Tab'];


    if(!notProhibitedKeys.includes(e.key) && !e.ctrlKey) {
        e.preventDefault();
    }
}

function init() {
    inputs.forEach(input => {
        input.addEventListener('input',checkForm);
    });

    inputZip.addEventListener('keydown',onZipKeydown);
    submitButton.addEventListener('click', onSubmit);
    changeButton.addEventListener('click', onChangeButtonClick);
}

document.addEventListener('DOMContentLoaded',init);