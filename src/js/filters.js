import filterTemplate from '../templates/filter.hbs';
import mobileFiltersTemplate from '../templates/mobileFiltersCard.hbs';
import { filters } from '../data/filters.js';

const filtersDesktop = document.getElementById('filters-desktop');
const body = document.querySelector('body');

filters.forEach(filter => {
    filtersDesktop.insertAdjacentHTML('beforeend', filterTemplate(filter));
});

const filterOpenButtons = document.querySelectorAll('.filter-desktop__title');

filterOpenButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        const options = btn.nextElementSibling;
        const arrow = btn.lastElementChild.firstElementChild;

        if (!btn.classList.contains('active')) {
            closeAllFilters();
            btn.classList.add('active');
            arrow.classList.add('rotate');
            options.hidden = false;
        } else {
            btn.classList.remove('active');
            arrow.classList.remove('rotate');
            options.hidden = true;
        }
    });
});

function closeAllFilters() {
    const filterDesktop = document.querySelectorAll('.filter-desktop');

    filterDesktop.forEach(filter => {
        const btn = filter.firstElementChild;
        if (!btn.classList.contains('active')) return;

        const options = filter.lastElementChild;
        const arrow = filter.firstElementChild.lastElementChild.firstElementChild;

        btn.classList.remove('active');
        arrow.classList.remove('rotate');
        options.hidden = true;
    });
}

body.addEventListener('click', e => {
    if (!e.target.closest('.filter-desktop')) {
        closeAllFilters();
    }
});

const acceptBtns = document.querySelectorAll('.filter-desktop__button');

acceptBtns.forEach(btn => {
    const parent = btn.closest('.filter-desktop__options'),
        filter = parent.closest('.filter-desktop'),
        title = parent.previousElementSibling,
        titleName = title.querySelector('.filter-desktop__title-name'),
        selectedColors = title.querySelector('.filter-desktop__title-colors'),
        checkboxes = parent.querySelectorAll('.filter-desktop__input'),
        arrowIcon = title.querySelector('.filter-desktop__arrow-icon'),
        crossIcon = title.querySelector('.filter-desktop__cross-icon'),
        checkboxesQuantity = title.querySelector('.filter-desktop__title-checkboxes-quantity'),
        inputMin = document.querySelector('.input-min'),
        inputMax = document.querySelector('.input-max');

    let checkedInputs = [];

    btn.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            if (checkedInputs.includes(checkbox.name)) return;

            if (checkbox.checked) {
                checkedInputs.push(checkbox.name);
                acceptFilters();

                if (filter.id === 'type-filter') {
                    checkboxesQuantity.classList.add('active');

                    if (checkedInputs.length === 1) {
                        checkboxesQuantity.innerText = `${checkedInputs[0]}`;
                    } else {
                        checkboxesQuantity.innerText = ` ${checkedInputs[0]} и еще ${checkedInputs.length - 1}`;
                    }
                } else {
                    checkboxesQuantity.innerText = `(${checkedInputs.length})`;
                }

                if (filter.id === 'color-filter') {
                    const colorMin = document.createElement('div');
                    selectedColors.hidden = false;
                    titleName.classList.add('open');

                    colorMin.classList.add('filter-desktop__title-color');
                    colorMin.setAttribute('style', `background-color: ${checkbox.dataset.color};`);

                    selectedColors.insertAdjacentElement('beforeend', colorMin);
                }
            }
        });

        if (filter.id === 'price-filter') {
            if (inputMin.value === '1200' && inputMax.value === '18000') return;

            acceptFilters();

            checkboxesQuantity.innerText = `(${inputMin.value} — ${inputMax.value})`;
        }
    });

    function acceptFilters() {
        title.classList.add('checked');
        title.classList.remove('active');
        arrowIcon.classList.remove('rotate');

        parent.hidden = true;
        arrowIcon.hidden = true;
        crossIcon.hidden = false;

        resetFilters();
    }

    function resetFilters() {
        crossIcon.addEventListener('click', e => {
            e.stopPropagation();
            closeFilters();

            if (filter.id === 'price-filter') {
                unActivatingPriceFilter();
                return;
            }

            checkedInputs = [];

            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkbox.checked = false;
                }
            });
        });
    }

    function closeFilters() {
        title.classList.remove('checked');
        titleName.classList.remove('open');

        if (filter.id === 'color-filter') {
            selectedColors.hidden = true;
            selectedColors.innerHTML = '';
        }

        crossIcon.hidden = true;
        arrowIcon.hidden = false;

        checkboxesQuantity.innerText = '';
    }
});

// Price Filter

const rangeInput = document.querySelectorAll('.range-input input'),
    priceInput = document.querySelectorAll('.price-wrapper input'),
    filterPriceBtn = document.querySelector('.filter-desktop__button');

let priceGap = 1000;

rangeInput.forEach(input => {
    const rangeInpuMin = input.parentElement.firstElementChild,
        rangeInputMax = input.parentElement.lastElementChild,
        priceContainer = input.parentElement.nextElementSibling,
        priceInpuMin = priceContainer.querySelector('.input-min'),
        priceInpuMax = priceContainer.querySelector('.input-max'),
        range = input.parentElement.previousElementSibling.firstElementChild;

    input.addEventListener('input', e => {
        activatingPriceFilter();

        let minVal = parseInt(rangeInpuMin.value),
            maxVal = parseInt(rangeInputMax.value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === 'range-min') {
                rangeInpuMin.value = maxVal - priceGap;
            } else {
                rangeInputMax.value = minVal + priceGap;
            }
        } else {
            priceInpuMin.value = minVal;
            priceInpuMax.value = maxVal;
            range.style.left = (minVal / rangeInpuMin.max) * 100 + '%';
            range.style.right = 100 - (maxVal / rangeInputMax.max) * 100 + '%';
        }
    });
});

priceInput.forEach(input => {
    const priceContainer = input.parentElement.parentElement,
        rangeContainer = priceContainer.previousElementSibling,
        rangeInpuMin = rangeContainer.firstElementChild,
        rangeInputMax = rangeContainer.lastElementChild,
        range = priceContainer.previousElementSibling.previousElementSibling.firstElementChild,
        priceInpuMin = priceContainer.querySelector('.input-min'),
        priceInpuMax = priceContainer.querySelector('.input-max');

    input.addEventListener('input', e => {
        activatingPriceFilter();

        let minPrice = parseInt(priceInpuMin.value),
            maxPrice = parseInt(priceInpuMax.value);

        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInputMax.max) {
            if (e.target.className.includes('input-min')) {
                rangeInpuMin.value = minPrice;
                range.style.left = (minPrice / rangeInpuMin.max) * 100 + '%';
            } else {
                rangeInputMax.value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInputMax.max) * 100 + '%';
            }
        }
    });
});

function activatingPriceFilter() {
    priceInput.forEach(input => {
        const priceContainer = input.parentElement.parentElement,
            range = priceContainer.previousElementSibling.previousElementSibling.firstElementChild;

        if (!input.classList.contains('active')) {
            input.classList.add('active');
            range.classList.add('active');
            filterPriceBtn.classList.add('active');
        }
    });
}

function unActivatingPriceFilter() {
    filterPriceBtn.classList.remove('active');

    priceInput.forEach(input => {
        input.classList.remove('active');

        if (input.className.includes('input-min')) {
            input.value = 1200;
        } else {
            input.value = 18000;
        }
    });

    rangeInput.forEach(input => {
        const range = input.parentElement.previousElementSibling.firstElementChild;
        range.classList.remove('active');

        range.style.left = 0;
        range.style.right = 0;

        if (input.className.includes('range-min')) {
            input.value = 1200;
        } else {
            input.value = 18000;
        }
    });
}

// Mobile Filters

const mobileFilters = document.getElementById('mobile-filters');
const mobileFiltersBlock = document.getElementById('mobile-filters-block');
const mobileFiltersOpenBtn = document.getElementById('mobile-filters-open-btn');
const mobileFiltersBackBtn = document.getElementById('mobile-filters-back-btn');
const mobileFiltersClearBtn = document.getElementById('mobile-filters-clear-btn');

filters.forEach(filter => {
    mobileFiltersBlock.insertAdjacentHTML('beforeend', mobileFiltersTemplate(filter));
});

mobileFiltersOpenBtn.addEventListener('click', e => {
    e.stopPropagation();
    mobileFilters.hidden = false;
});
mobileFiltersBackBtn.addEventListener('click', () => {
    mobileFilters.hidden = true;
});
if (window.innerWidth < 640) {
    body.addEventListener('click', e => {
        if (!e.target.closest('.mobileFilters') && !mobileFilters.hasAttribute('hidden')) {
            mobileFilters.hidden = true;
        }
    });
}
mobileFiltersClearBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.mobileFilters__filters-input');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) checkbox.checked = false;
    });

    unActivatingPriceFilter();
});

const titles = document.querySelectorAll('.mobileFilters__card-title-block');
titles.forEach(title => {
    title.addEventListener('click', () => {
        const arrowDown = title.lastElementChild;
        const list = title.nextElementSibling;

        if (!list.hasAttribute('hidden')) {
            arrowDown.classList.remove('rotate');
            list.hidden = true;
        } else {
            arrowDown.classList.add('rotate');
            list.hidden = false;
        }
    });
});
