const from = document.getElementById('from');
const to = document.getElementById('to');
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const source = document.getElementById('source');
const result = document.getElementById('result');


function init() {
    const request = new XMLHttpRequest();
    request.addEventListener('load',onRequestLoad);
    request.addEventListener('loadstart',onRequestLoadStart);
    request.addEventListener('loadend',onRequestLoadEnd);
    request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
    request.send();

    from.addEventListener('change',convertCurrency);
    to.addEventListener('change',convertCurrency);
    source.addEventListener('input',convertCurrency);
}

function onRequestLoad(e) {
    const request = e.currentTarget;
    if(request.status === 200) {
        const currenciesList = JSON.parse(request.responseText);
        currenciesList.forEach(currency => {
            const option = `<option value="${currency.value}">${currency.code}</option>`;

            from.innerHTML += option;
            to.innerHTML += option;
        });

        convertCurrency();
    }
}

function onRequestLoadStart() {
    loader.classList.remove('hidden');
}

function onRequestLoadEnd() {
    loader.classList.add('hidden');
    content.classList.remove('hidden');
}

function convertCurrency() {
    result.value = Math.round(source.value * from.value / to.value * 100) / 100;
}

document.addEventListener('DOMContentLoaded',init);