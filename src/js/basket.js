import template from '../templates/basketProductCard.hbs';
import { products } from '../data/basket.js';

if (document.location.pathname === '/basket.html') {
    const basketProductsList = document.getElementById('basket-products-list');

    products.forEach(product => {
        basketProductsList.insertAdjacentHTML('beforeend', template(product));
    });
}

const processingBtn = document.querySelectorAll('.basket__order-processing-button');
const processingBtnWrapper = document.getElementById('order-processing-button-wrapper');
const processingBtnWrapper1920 = document.getElementById('order-processing-button-wrapper1920');
const paymentBtnWrapper = document.getElementById('to-payment-button-wrapper');
const paymentBtnWrapper1920 = document.getElementById('to-payment-button-wrapper1920');
const productsBlock = document.getElementById('basket-products-block');
const processingBlock = document.getElementById('basket-processing-block');
const orderBottom = document.getElementById('order-bottom');
const orderBlock = document.getElementById('order-block');
const titleBlock = document.getElementById('title-block');

processingBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        const title = titleBlock.querySelector('.title-block__title');
        title.innerText = 'Оформление заказа';

        orderBlock.hidden = true;
        productsBlock.hidden = true;
        processingBlock.hidden = false;
        processingBtnWrapper.hidden = true;
        paymentBtnWrapper.hidden = false;

        if (window.innerWidth >= 980 && window.innerWidth < 1920) {
            orderBottom.hidden = true;
            orderBlock.hidden = false;
        }

        if (window.innerWidth >= 1920) {
            productsBlock.style.display = 'none';
            orderBottom.style.display = 'block';
            orderBlock.hidden = true;

            paymentBtnWrapper1920.hidden = false;
            processingBtnWrapper1920.hidden = true;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    });
});
