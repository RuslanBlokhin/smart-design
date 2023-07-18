import template from '../templates/personalOrderCard.hbs';
import tabletTemplate from '../templates/personalOrderTabletCard.hbs';
import orderProductTemplate from '../templates/orderProductsCard.hbs';
import { personalOrders } from '../data/orders.js';
import { products } from '../data/basket.js';

// Add content
const personalOrdersList = document.getElementById('personal-orders-list');
const personalOrdersListTablet = document.getElementById('personal-orders-list-tablet');
const orderProductsList = document.getElementById('order-products-list');

personalOrders.forEach(order => {
    personalOrdersList.insertAdjacentHTML('beforeend', template(order));
});
personalOrders.forEach(order => {
    personalOrdersListTablet.insertAdjacentHTML('beforeend', tabletTemplate(order));
});
products.forEach(product => {
    orderProductsList.insertAdjacentHTML('beforeend', orderProductTemplate(product));
});

// Blocks Logic
const savePersonalDataBtn = document.getElementById('save-personal-data');
const personalRecipientData = document.getElementById('personal-recipient-data');
const personalUserData = document.getElementById('personal-user-data');

savePersonalDataBtn.addEventListener('click', () => {
    personalRecipientData.hidden = true;
    personalUserData.hidden = false;

    window.scrollTo({
        top: 270,
        left: 0,
        behavior: 'smooth',
    });
});

// Tabs
const tabs = document.querySelectorAll('.personal__navigation-item');
const tabBlocks = document.querySelectorAll('.personal__block');
const filter = document.getElementById('orders-filter');
const closeOrderBtn = document.getElementById('close-order-btn');
const personalOrder = document.getElementById('personal-order');

tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        remooveActive();
        closeBlock();

        if (!tab.classList.contains('active')) {
            tab.classList.add('active');
            closeOrderBtn.hidden = true;
            personalOrder.hidden = true;
            orderBlock.hidden = false;

            tabBlocks.forEach(block => {
                if (block.id === tab.dataset.name && block.hasAttribute('hidden')) {
                    block.hidden = false;

                    if (block.id !== 'personal-orders') {
                        filter.hidden = true;
                    } else {
                        filter.hidden = false;
                    }
                }
            });
        }
    });
});

function remooveActive() {
    tabs.forEach(tab => {
        if (tab.classList.contains('active')) tab.classList.remove('active');
    });
}

function closeBlock() {
    tabBlocks.forEach(block => {
        if (!block.hasAttribute('hidden')) block.hidden = true;
    });
}

// Order
const openOrderBtns = document.querySelectorAll('.personal__orders-item-btn');
const orderBlock = document.querySelector('.personal__orders-block');

openOrderBtns.forEach(openBtn => {
    openBtn.addEventListener('click', () => {
        if (!orderBlock.hasAttribute('hidden')) orderBlock.hidden = true;

        filter.hidden = true;
        personalOrder.hidden = false;
        closeOrderBtn.hidden = false;
    });
});

closeOrderBtn.addEventListener('click', () => {
    personalOrder.hidden = true;
    closeOrderBtn.hidden = true;
    orderBlock.hidden = false;
    filter.hidden = false;
});

// Filter
const openFilter = document.getElementById('orders-filter-title');
const body = document.querySelector('body');
const ordersFilterOptions = document.getElementById('orders-filter-options');

openFilter.addEventListener('click', e => {
    const options = openFilter.nextElementSibling;
    const arrowIcon = openFilter.lastElementChild;

    if (options.hasAttribute('hidden')) {
        options.hidden = false;
        arrowIcon.classList.add('rotate');
    } else {
        options.hidden = true;
        arrowIcon.classList.remove('rotate');
    }
});

body.addEventListener('click', e => {
    const arrowIcon = ordersFilterOptions.previousElementSibling.lastElementChild;

    if (!e.target.closest('.personal__orders-filter') && !ordersFilterOptions.hasAttribute('hidden')) {
        ordersFilterOptions.hidden = true;
        arrowIcon.classList.remove('rotate');
    }
});
