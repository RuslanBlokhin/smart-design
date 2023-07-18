import template from '../templates/deliveryCard.hbs';
import { delivery } from '../data/delivery';

const deliveryList = document.getElementById('delivery-list');

delivery.forEach(item => {
    deliveryList.insertAdjacentHTML('beforeend', template(item));
});

const title = document.getElementById('title-block-text');
title.textContent = 'О доставке';
