'use strict';

const name = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');
const profileJsonpFuncName = 'parseProfile';
const technologiesJsonpFuncName = 'parseTechnologies';

window[profileJsonpFuncName] = profile => {
  name.textContent = profile.name;
  description.textContent = profile.description;
  pic.src = profile.pic;
  position.textContent = profile.position;

  const jsonpScript = document.createElement('script');
  jsonpScript.src = `https://neto-api.herokuapp.com/profile/${profile.id}/technologies?callback=${technologiesJsonpFuncName}`;
  document.body.appendChild(jsonpScript);
};

window[technologiesJsonpFuncName] = profileTechnologies => {
  profileTechnologies.forEach(tech => {
    const technologyNode = document.createElement('span');
    technologyNode.classList.add('devicons','devicons-' + tech);
    technologies.appendChild(technologyNode);
  });

  content.style.display = 'initial';
};

function init() {
  const jsonpScript = document.createElement('script');
  jsonpScript.src = `https://neto-api.herokuapp.com/profile/me?callback=${profileJsonpFuncName}`;
  document.body.appendChild(jsonpScript);
}

document.addEventListener('DOMContentLoaded',init);