import template from '../templates/sitemapCard.hbs';
import { sitemapList } from '../data/sitemap.js';

const sitemapListElem = document.getElementById('sitemap-list');

sitemapList.forEach(sitemap => {
    sitemapListElem.insertAdjacentHTML('beforeend', template(sitemap));
});
