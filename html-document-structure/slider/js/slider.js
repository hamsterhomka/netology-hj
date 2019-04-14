const currentSlideClassName = 'slide-current';
const disabledButtonClassName = 'disabled';

const slider = document.querySelector('.slider');
const sliderNav = slider.querySelector('.slider-nav');
const prevButton = sliderNav.querySelector('a[data-action="prev"]');
const nextButton = sliderNav.querySelector('a[data-action="next"]');
const firstButton = sliderNav.querySelector('a[data-action="first"]');
const lastButton = sliderNav.querySelector('a[data-action="last"]');
const slidesBlock = slider.querySelector('.slides');
const slides = Array.from(slider.querySelectorAll('.slide'));
const firstSlide = slidesBlock.firstElementChild;
const lastSlide = slidesBlock.lastElementChild;

function getActiveSlide() {
    return slider.querySelector('.slides .slide.' + currentSlideClassName);
}

function disableButton(button) {
    button.classList.add(disabledButtonClassName);
}

function enableButton(button) {
    button.classList.remove(disabledButtonClassName);
}

function onNextButtonClick(event) {
    const button = event.currentTarget;
    if(button.classList.contains(disabledButtonClassName)) {
        return;
    }
    const nextSlide = getActiveSlide().nextElementSibling;

    if(nextSlide) {
        setCurrentSlide(nextSlide);
    }
}

function onPrevButtonClick() {
    const button = event.currentTarget;
    if(button.classList.contains(disabledButtonClassName)) {
        return;
    }
    const prevSlide = getActiveSlide().previousElementSibling;

    if(prevSlide) {
        setCurrentSlide(prevSlide);
    }
}

function onFirstButtonClick() {
    const button = event.currentTarget;
    if(button.classList.contains(disabledButtonClassName)) {
        return;
    }
    setCurrentSlide(firstSlide);
}

function onLastButtonClick() {
    const button = event.currentTarget;
    if(button.classList.contains(disabledButtonClassName)) {
        return;
    }

    setCurrentSlide(lastSlide);
}

function setDefaultCurrentSlide() {
    setCurrentSlide(slidesBlock.firstElementChild);
}

function setCurrentSlide(slide) {
    slides.forEach(slide => {
        slide.classList.remove('slide-current');
    });

    slide.classList.add(currentSlideClassName);
    updateButtonsState();
}

function updateButtonsState() {
    const slide = getActiveSlide();

    if(!slide.previousElementSibling) {
        disableButton(prevButton);
        disableButton(firstButton);
    } else {
        enableButton(prevButton);
        enableButton(firstButton);
    }

    if(!slide.nextElementSibling) {
        disableButton(nextButton);
        disableButton(lastButton);
    } else {
        enableButton(nextButton);
        enableButton(lastButton);
    }
}

function initSlider() {
    setDefaultCurrentSlide();
    nextButton.addEventListener('click',onNextButtonClick);
    prevButton.addEventListener('click',onPrevButtonClick);
    firstButton.addEventListener('click',onFirstButtonClick);
    lastButton.addEventListener('click',onLastButtonClick);
}

document.addEventListener('DOMContentLoaded',initSlider);