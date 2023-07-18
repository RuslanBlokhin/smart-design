import faqCardTemplate from '../templates/faqCard.hbs';
import { faqList } from '../data/faq.js';

const faqListInsert = document.getElementById('faq-list');

faqList.forEach(filter => {
    if (filter.id === '1') {
        faqListInsert.innerHTML = faqCardTemplate(filter);
    }
});

const faqBtn = document.querySelectorAll('.faq__faq-button');

faqBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const arrowIcon = btn.lastElementChild;

        if (btn.nextElementSibling.hasAttribute('hidden')) {
            btn.nextElementSibling.hidden = false;
            arrowIcon.classList.add('rotate');
        } else {
            btn.nextElementSibling.hidden = true;
            arrowIcon.classList.remove('rotate');
        }
    });
});

const navBtns = document.querySelectorAll('.faq__nav-item');

navBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        removeActiveClass();

        faqList.forEach(filter => {
            if (e.currentTarget.id === filter.id) {
                e.currentTarget.classList.add('active');

                faqListInsert.innerHTML = faqCardTemplate(filter);
            }
        });
    });
});

function removeActiveClass() {
    navBtns.forEach(btn => {
        btn.classList.remove('active');
    });
}
