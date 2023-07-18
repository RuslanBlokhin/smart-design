import Glide from '@glidejs/glide';

new Glide('.glide', {
    type: 'carousel',
}).mount();

const similarProducts = document.getElementById('similar-products-wrapper');
const arrowLeft = document.getElementById('icon-left');
const arrowRight = document.getElementById('icon-right');

arrowRight.addEventListener('click', e => {
    similarProducts.scrollBy({
        top: 0,
        left: 310,
        behavior: 'smooth',
    });
});

arrowLeft.addEventListener('click', e => {
    similarProducts.scrollBy({
        top: 0,
        left: -310,
        behavior: 'smooth',
    });
});

const tabs = document.querySelectorAll('.product__description640-title');
const aboutBlock = document.getElementById('about-block');
const videoBlock = document.getElementById('video-block');
const reviewsBlock = document.getElementById('reviews-block');
const aboutTab = document.getElementById('about-tab');
const videoTab = document.getElementById('video-tab');
const reviewsTab = document.getElementById('reviews-tab');

tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        if (e.target.id === 'video-tab') {
            aboutBlock.hidden = true;
            videoBlock.hidden = false;
            reviewsBlock.hidden = true;

            aboutTab.classList.remove('active');
            reviewsTab.classList.remove('active');
            tab.classList.add('active');
        }
        if (e.target.id === 'about-tab') {
            aboutBlock.hidden = false;
            videoBlock.hidden = true;
            reviewsBlock.hidden = true;

            videoTab.classList.remove('active');
            reviewsTab.classList.remove('active');
            tab.classList.add('active');
        }
        if (e.target.id === 'reviews-tab') {
            aboutBlock.hidden = true;
            videoBlock.hidden = true;
            reviewsBlock.hidden = false;

            aboutTab.classList.remove('active');
            videoTab.classList.remove('active');
            tab.classList.add('active');
        }
    });
});

const descriptionList = document.getElementById('description-list');
const moreBtn = document.getElementById('more-button');
const arrowDown = document.getElementById('arrow-down');
const descriptionList640 = document.getElementById('description-list640');
const moreBtn640 = document.getElementById('more-button640');
const arrowDown640 = document.getElementById('arrow-down640');

moreBtn.addEventListener('click', e => {
    if (descriptionList.hidden) {
        descriptionList.hidden = false;
        arrowDown.classList.add('rotate');
    } else {
        if (arrowDown.classList.contains('rotate')) {
            descriptionList.hidden = true;
            arrowDown.classList.remove('rotate');
        }
    }
});
moreBtn640.addEventListener('click', e => {
    if (descriptionList640.hidden) {
        descriptionList640.hidden = false;
        arrowDown640.classList.add('rotate');
    } else {
        if (arrowDown640.classList.contains('rotate')) {
            descriptionList640.hidden = true;
            arrowDown640.classList.remove('rotate');
        }
    }
});

const titles = document.querySelectorAll('.title-wrapper');

titles.forEach(title => {
    title.addEventListener('click', e => {
        const arrow = e.currentTarget.lastElementChild;
        const content = e.currentTarget.nextElementSibling;

        if (arrow.classList.contains('rotate')) {
            content.hidden = true;
            arrow.classList.remove('rotate');
        } else {
            content.hidden = false;
            arrow.classList.add('rotate');
        }
    });
});
