import template from '../templates/paymentQuestionCard.hbs';
import { paymentQuestions } from '../data/payment.js';

const paymentQuestionList = document.getElementById('payment-question-list');

paymentQuestions.forEach(question => {
    paymentQuestionList.insertAdjacentHTML('beforeend', template(question));
});

const title = document.getElementById('title-block-text');
title.textContent = 'Об оплате';
