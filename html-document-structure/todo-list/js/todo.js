const todoList = document.querySelector('.todo-list');
const checks = Array.from(todoList.getElementsByTagName('input'));
const undone = todoList.querySelector('.undone');
const done = todoList.querySelector('.done');

function onItemChange(event) {
    const input = event.currentTarget;
    const label = input.parentElement;

    if(input.checked === true) {
        done.appendChild(label);
    } else {
        undone.appendChild(label);
    }
}

function init() {
    checks.forEach(check => {
        check.addEventListener('change',onItemChange)
    })
}

document.addEventListener('DOMContentLoaded',init);