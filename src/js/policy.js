import { policy } from '../data/policy.js';
import template from '../templates/policyCard.hbs';

const moreBtn = document.getElementById('more-btn');
const policyTextDesktop = document.getElementById('policy-text-desktop');

moreBtn.addEventListener('click', e => {
    if (policyTextDesktop.style.display === 'none') {
        e.currentTarget.lastElementChild.classList.add('rotate');
        policyTextDesktop.style.display = 'block';
    } else {
        policyTextDesktop.style.display = 'none';
        e.currentTarget.lastElementChild.classList.remove('rotate');
    }
});

const poliList = document.getElementById('policy-list');

policy.forEach(item => {
    poliList.insertAdjacentHTML('beforeend', template(item));
});
