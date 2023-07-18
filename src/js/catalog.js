import template from '../templates/productCatalogCard.hbs';
import { products } from '../data/catalog.js';

// Add content
const catalogProductsList = document.getElementById('catalog-products-list');

updateContent();

window.addEventListener('resize', () => {
    if (catalogProductsList.children.length < 7 && window.innerWidth >= 980 && products.length >= 7) updateContent();
    if (catalogProductsList.children.length < 13 && window.innerWidth >= 1920 && products.length >= 13) updateContent();
    if (catalogProductsList.children.length > 6 && window.innerWidth < 980) updateContent();
    if (catalogProductsList.children.length > 9 && window.innerWidth < 1920) updateContent();
});

function updateContent() {
    removeChildrenElement();

    products.some((product, index) => {
        if (index >= 6 && window.innerWidth < 980) return;
        if (index >= 9 && window.innerWidth < 1920) return;

        catalogProductsList.insertAdjacentHTML('beforeend', template(product));
    });
}

function removeChildrenElement() {
    if (catalogProductsList && catalogProductsList.children.length) {
        catalogProductsList.replaceChildren();
    }
}
