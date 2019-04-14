const undone = document.querySelector('.undone');
const done = document.querySelector('.done');

const undoneItems = Array.from(undone.querySelectorAll('label'));
const doneItems = Array.from(done.querySelectorAll('label'));

function onUndoneItemChange(event) {
    const input = event.currentTarget;
    const label = input.parentElement;

    input.removeEventListener('change',onUndoneItemChange);
    input.addEventListener('change',ondoneItemChange);
    done.appendChild(label);
}

function ondoneItemChange(event) {
    const input = event.currentTarget;
    const label = input.parentElement;

    input.removeEventListener('change',ondoneItemChange);
    input.addEventListener('change',onUndoneItemChange);
    undone.appendChild(label);
}

function init() {
    undoneItems.forEach(item => {
        item.querySelector('input[type="checkbox"]').addEventListener('change',onUndoneItemChange);
    });

    doneItems.forEach(item => {
        item.querySelector('input[type="checkbox"]').addEventListener('change',ondoneItemChange);
    })
}

document.addEventListener('DOMContentLoaded',init);