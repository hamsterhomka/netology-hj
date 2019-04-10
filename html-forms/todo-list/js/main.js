const listBlock = document.querySelector('.list-block');
const listItems = Array.from(listBlock.querySelectorAll('li'));
const output = listBlock.querySelector('output');

function refreshInfo() {
    const totalItemsCount = listItems.length;

    let doneItemsCount = listItems.reduce((total, item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');

        return  checkbox.checked === true ? total + 1 : total;
    }, 0);

    if(doneItemsCount === totalItemsCount) {
        listBlock.classList.add('complete');
    } else {
        listBlock.classList.remove('complete');
    }

    output.value = `${doneItemsCount} / ${totalItemsCount}`;
}

function init() {
    refreshInfo();

    listItems.forEach(item => {
        item.querySelector('input[type="checkbox"]').addEventListener('change',refreshInfo);
    })
}

document.addEventListener('DOMContentLoaded',init);