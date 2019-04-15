'use strict';

function handleTableClick(event) {
  if(event.target.tagName.toLowerCase() !== 'th') {
    return;
  }

  const target = event.target;
  const name = target.dataset.propName;
  target.dataset.dir === '1' ? target.dataset.dir = -1 : target.dataset.dir = 1;
  document.querySelector('table').dataset.sortBy = name;
  sortTable(name,target.dataset.dir);
}
