import Glide from '@glidejs/glide';
import template from '../templates/catalogCarouselCard.hbs';
import { lamy, twsbi, herbin, rhodia } from '../data/catalogCarousel';

const brandCarouselList = document.getElementById('brand-carousel-list');
const catalogCover = document.getElementById('catalog-cover');
catalogCover.hidden = true;

if (window.location.pathname === '/catalogLamy.html') {
    lamy.forEach(item => {
        brandCarouselList.insertAdjacentHTML('beforeend', template(item));
    });
}
if (window.location.pathname === '/catalogTwsbi.html') {
    twsbi.forEach(item => {
        brandCarouselList.insertAdjacentHTML('beforeend', template(item));
    });
}
if (window.location.pathname === '/catalogHerbin.html') {
    herbin.forEach(item => {
        brandCarouselList.insertAdjacentHTML('beforeend', template(item));
    });
}
if (window.location.pathname === '/catalogRhodia.html') {
    rhodia.forEach(item => {
        brandCarouselList.insertAdjacentHTML('beforeend', template(item));
    });
}

new Glide('.catalog__brand-carousel', {
    type: 'carousel',
    autoplay: 5000,
    hoverpause: true,
}).mount();
