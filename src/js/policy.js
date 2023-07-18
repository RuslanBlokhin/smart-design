import { policy } from '../data/policy.js';
import template from '../templates/policyCard.hbs';

const poliList = document.getElementById('policy-list');

policy.forEach(item => {
    poliList.insertAdjacentHTML('beforeend', template(item));
});
