import { agreement } from '../data/agreement.js';
import template from '../templates/agreementCard.hbs';

const agreementList = document.getElementById('agreement-list');

agreement.forEach(item => {
    agreementList.insertAdjacentHTML('beforeend', template(item));
});
