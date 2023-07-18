import Glide from '@glidejs/glide';
import { products } from './data/catalog';
import template from './templates/productCatalogCard.hbs';

new Glide('.glide', {
    type: 'carousel',
    startAt: 2,
    autoplay: 5000,
    hoverpause: true,
}).mount();

const newProducts = document.getElementById('new-products');
const сonsumables = document.getElementById('сonsumables-list');

updateContent();

window.addEventListener('resize', () => {
    if (newProducts.children.length < 5 && window.innerWidth >= 980 && products.length >= 5) updateContent();
    if (newProducts.children.length > 4 && window.innerWidth < 980) updateContent();
    if (newProducts.children.length < 4 && window.innerWidth >= 640 && products.length >= 4) updateContent();
    if (newProducts.children.length > 3 && window.innerWidth < 640) updateContent();
});

function updateContent() {
    removeChildrenElement();

    products.forEach((product, index) => {
        if (index > 2 && window.innerWidth < 640) return;
        if (index > 3 && window.innerWidth < 980) return;
        if (index > 5) return;
        newProducts.insertAdjacentHTML('beforeend', template(product));
    });
    products.forEach((product, index) => {
        if (index > 2 && window.innerWidth < 640) return;
        if (index > 3 && window.innerWidth < 980) return;
        if (index > 5) return;
        сonsumables.insertAdjacentHTML('beforeend', template(product));
    });
}

function removeChildrenElement() {
    if (newProducts && newProducts.children.length) {
        newProducts.replaceChildren();
        сonsumables.replaceChildren();
    }
}

const moreHistoryTextBtn = document.getElementById('more-history-text-button');
const historyTextAddition = document.getElementById('history-text-addition');

moreHistoryTextBtn.addEventListener('click', e => {
    const arrow = e.currentTarget.lastElementChild;
    console.log(arrow);

    if (!historyTextAddition.hasAttribute('hidden')) {
        historyTextAddition.hidden = true;
        arrow.classList.remove('rotate');
    } else {
        historyTextAddition.hidden = false;
        arrow.classList.add('rotate');
    }
});
