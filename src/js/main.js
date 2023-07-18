import template from '../templates/productCatalogCard.hbs';
import articleTemplate from '../templates/articleCatalogCard.hbs';
import infoTemplate from '../templates/infoCatalogCard.hbs';
import mobileMenuTemplate from '../templates/mobileMenuContent.hbs';
import mobileSubmenuTemplate from '../templates/mobileSubmenuContent.hbs';
import mobileMenuCard from '../templates/mobileMenuCard.hbs';
import { articles, info, filteredProducts } from '../data/catalog.js';
import desktopMenuTemplate from '../templates/desktopMenuList.hbs';
import { menuList, mobileMenuList, mobileSubmenuList } from '../data/menu.js';

const body = document.querySelector('body');

//Mobile Menu
const menuIcon = document.getElementById('menu-icon'),
    closeIcons = document.querySelectorAll('.modal__close-button'),
    mobileMenu = document.getElementById('underlay'),
    modalMainBlock = document.getElementById('modal-main-block'),
    modalSecondaryBlock = document.getElementById('modal-secondary-block'),
    modalSecondaryBlockList = document.getElementById('modal-secondary-block-list'),
    modalSubmenu = document.getElementById('modal-submenu'),
    mobileMenuMainList = document.getElementById('mobile-menu-main-list'),
    mobileMenuBackBtn = document.getElementById('mobile-menu-back-btn'),
    mobileMenuClear = document.getElementById('mobile-menu-clear-btn'),
    mobileMenuAcceptBtn = document.getElementById('mobile-menu-accept-btn'),
    mobileMenuAcceptBtnWrapper = document.getElementById('mobile-menu-accept-btn-wrapper'),
    mobileMenuClearBtnWrapper = document.getElementById('mobile-menu-clear-btn-wrapper'),
    mobileMenuCloseBtnWrapper = document.getElementById('mobile-menu-close-btn-wrapper'),
    mobileMenuAllResetBtn = document.getElementById('modal-reset-btn'),
    mobileMenuShowBtn = document.getElementById('modal-show-btn'),
    mobileSubmenu = document.getElementById('modal-submenu');

mobileMenuList.some(item => {
    mobileMenuMainList.insertAdjacentHTML('beforeend', mobileMenuCard(item));
});

menuList.some(menu => {
    modalSecondaryBlockList.insertAdjacentHTML('beforeend', mobileMenuTemplate(menu));
});

mobileSubmenuList.some(menu => {
    mobileSubmenu.insertAdjacentHTML('beforeend', mobileSubmenuTemplate(menu));
});

menuIcon.addEventListener('click', () => {
    mobileMenu.hidden = false;
});

closeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        mobileMenu.hidden = true;
    });
});

let currentMenu = '';

const mainBlockItems = document.querySelectorAll('.main-block-item');
mainBlockItems.forEach(item => {
    item.addEventListener('click', e => {
        const items = document.querySelectorAll('.modal__secondary-block-item');
        items.forEach(item => {
            const title = item.querySelector('.modal__title');

            if (!item.hasAttribute('hidden')) item.hidden = true;

            if (title.textContent === e.target.textContent.trim()) {
                currentMenu = title.textContent;
                modalMainBlock.hidden = true;
                modalSecondaryBlock.hidden = false;
                item.hidden = false;
            }

            if (currentMenu === 'Компания' || currentMenu === 'Бренды') {
                mobileMenuAcceptBtnWrapper.hidden = true;
                mobileMenuClearBtnWrapper.hidden = true;
                mobileMenuCloseBtnWrapper.hidden = false;
            } else {
                if (mobileMenuAcceptBtnWrapper.hasAttribute('hidden')) {
                    mobileMenuAcceptBtnWrapper.hidden = false;
                    mobileMenuClearBtnWrapper.hidden = false;
                    mobileMenuCloseBtnWrapper.hidden = true;
                }
            }
        });
    });
});

const submenuItems = document.querySelectorAll('.submenu-item');
submenuItems.forEach(item => {
    item.addEventListener('click', e => {
        e.stopPropagation();

        currentMenu = e.currentTarget.querySelector('.modal__item-text').textContent;
        modalSecondaryBlockList.hidden = true;
        modalSubmenu.hidden = false;
    });
});

mobileMenuAllResetBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.modal__item-input'),
        descriptions = document.querySelectorAll('.modal__item-description');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) checkbox.checked = false;
    });
    descriptions.forEach(description => {
        if (description.textContent !== '') description.innerText = '';
    });

    checkedItems = [];
});

mobileMenuShowBtn.addEventListener('click', () => {
    if (window.location.pathname !== '/catalog.html') {
        window.location.href = 'http://localhost:1234/catalog.html';
    } else {
        closeSecondaryBlock();
    }
});

mobileMenuBackBtn.addEventListener('click', e => {
    clearHandler();

    if (!modalSubmenu.hasAttribute('hidden')) {
        closeSubmenu();
    } else {
        currentMenu = '';
        closeSecondaryBlock();
    }
});

function closeSubmenu() {
    modalSubmenu.hidden = true;
    modalSecondaryBlockList.hidden = false;
}

let checkedItems = [];
function acceptButtonHandler(e) {
    if (!modalSubmenu.hasAttribute('hidden')) {
        const items = document.querySelectorAll('.modal__submenu-item');
        const submenuItems = document.querySelectorAll('.submenu-item');

        items.forEach(currentItem => {
            if (!currentItem.hasAttribute('hidden')) {
                const checkboxes = currentItem.querySelectorAll('.modal__item-input');

                closeSubmenu();

                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        const currentItemText = checkbox.previousElementSibling.textContent;
                        if (!checkedItems.includes(currentItemText)) checkedItems.push(currentItemText);
                    }
                });

                submenuItems.forEach(item => {
                    addDescription(item);
                });
            }
        });

        currentMenu = 'Чернила';
    } else {
        const items = document.querySelectorAll('.modal__secondary-block-item');

        items.forEach(currentItem => {
            if (!currentItem.hasAttribute('hidden')) {
                const checkboxes = currentItem.querySelectorAll('.modal__item-input');

                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        const currentItemText = checkbox.previousElementSibling.textContent;
                        if (!checkedItems.includes(currentItemText)) checkedItems.push(currentItemText);
                    }
                });

                mainBlockItems.forEach(item => {
                    addDescription(item);
                });

                closeSecondaryBlock();
            }
        });
    }

    checkedItems = [];
}

function addDescription(item) {
    if (checkedItems.length === 0) return;

    const title = item.querySelector('.modal__item-text');

    if (title.textContent === currentMenu) {
        const description = item.querySelector('.modal__item-description');
        if (checkedItems.length > 2) {
            description.innerText = `${checkedItems[0]}, ${checkedItems[1]} и ещё ${checkedItems.length - 2}`;
        } else {
            description.innerText = addTextHelper();
        }
    }
}

function addTextHelper() {
    if (checkedItems.length > 1 || checkedItems.length < 5) {
        let string = `${checkedItems[0]}`;
        checkedItems.forEach((item, index) => {
            if (index !== 0) string = string + ', ' + item;
        });
        return string;
    }
}

mobileMenuAcceptBtn.addEventListener('click', acceptButtonHandler);

function clearHandler() {
    if (!modalSubmenu.hasAttribute('hidden')) {
        modalSubmenu.childNodes.forEach(item => {
            if (!item.hasAttribute('hidden')) {
                clearCurrentCheckboxes(item);
                const title = item.querySelector('.modal__title').textContent;

                submenuItems.forEach(mainItem => {
                    clearDescription(mainItem, title);
                });
            }
        });
    } else {
        modalSecondaryBlockList.childNodes.forEach(item => {
            if (!item.hasAttribute('hidden')) {
                clearCurrentCheckboxes(item);
                const title = item.querySelector('.modal__title').textContent;

                mainBlockItems.forEach(mainItem => {
                    clearDescription(mainItem, title);
                });
                modalSubmenu.childNodes.forEach(item => {
                    const description = document
                        .querySelector('.submenu-item')
                        .querySelector('.modal__item-description');
                    description.innerText = '';
                    clearCurrentCheckboxes(item);
                });
            }
        });
    }

    checkedItems = [];
}

function clearDescription(mainItem, title) {
    const text = mainItem.querySelector('.modal__item-text').textContent;
    const description = mainItem.querySelector('.modal__item-description');

    if (text === 'Компания') return;
    if (text === title) {
        description.innerText = '';
    }
}

function clearCurrentCheckboxes(item) {
    if (!item.hasAttribute('hidden')) {
        const checkboxes = item.querySelectorAll('.modal__item-input');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) checkbox.checked = false;
        });
    }
}

mobileMenuClear.addEventListener('click', clearHandler);

function closeSecondaryBlock() {
    modalMainBlock.hidden = false;
    modalSecondaryBlock.hidden = true;
}

// Desktop Menu
const desktopMenuList = document.getElementById('desktop-menu-list'),
    desktopMenu = document.getElementById('desktop-menu'),
    desktopMenuOpenBtn = document.getElementById('desktop-menu-open'),
    desktopMenuInner = document.getElementById('desktop-menu-inner');

menuList.some(list => {
    if (list.title === 'Компания') return;
    desktopMenuList.insertAdjacentHTML('beforeend', desktopMenuTemplate(list));
});

desktopMenuOpenBtn.addEventListener('mouseenter', () => {
    desktopMenu.hidden = false;
});

desktopMenuInner.addEventListener('mouseleave', closeDesktopMenu);

function closeDesktopMenu(e) {
    if (!e.target.closest('.header')) {
        desktopMenu.hidden = true;
    }
}

// Informer
const informerError = document.getElementById('informer-error');
const informerErrorCloseBtn = document.getElementById('informer-error-close-button');
const informerSuccess = document.getElementById('informer-success');
const informerSuccessCloseBtn = document.getElementById('informer-success-close-button');
const accesRecoveryBtn = document.getElementById('access-recovery-btn');

informerErrorCloseBtn.addEventListener('click', e => {
    informerError.hidden = true;
});
informerSuccessCloseBtn.addEventListener('click', e => {
    informerSuccess.hidden = true;
    if (accesRecoveryBtn) accesRecoveryBtn.disabled = false;
});

//Basket Modal
const basketButton = document.getElementById('basket-button'),
    baskeetModal = document.getElementById('basket-modal'),
    basketModalClose = document.getElementById('basket-modal-close');

basketButton.addEventListener('click', e => {
    e.stopPropagation();
    baskeetModal.hidden = false;
});
basketModalClose.addEventListener('click', () => {
    baskeetModal.hidden = true;
});

body.addEventListener('click', e => {
    if (
        (!e.target.closest('.basket-modal') && !baskeetModal.hasAttribute('hidden')) ||
        !e.target.closest('.informer')
    ) {
        baskeetModal.hidden = true;
        informerSuccess.hidden = true;
        informerError.hidden = true;
        if (accesRecoveryBtn) accesRecoveryBtn.disabled = false;
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 1920 && (!baskeetModal.hasAttribute('hidden') || !desktopMenu.hasAttribute('hidden'))) {
        baskeetModal.hidden = true;
        desktopMenu.hidden = true;
    }
});

//Search Modal
const searchButton = document.getElementById('search-btn'),
    searchModal = document.getElementById('search-modal'),
    searchCloseButton = document.getElementById('search-close'),
    search = document.getElementById('search'),
    searchInput = document.getElementById('search-input'),
    searchInputDesktop = document.getElementById('search-input-desktop'),
    searchValues = document.querySelectorAll('.search-value'),
    mainBlock = document.getElementById('main-block'),
    searchBlock = document.getElementById('search-block'),
    notFoundBlock = document.getElementById('notfound-block'),
    catalogCover = document.getElementById('catalog-cover');

searchButton.addEventListener('click', e => {
    e.stopPropagation();
    searchModal.hidden = false;
});
searchCloseButton.addEventListener('click', () => {
    searchModal.hidden = true;
});

function inputHandler(e) {
    if (e.key === 'Enter') {
        const value = e.target.value.toLowerCase();
        if (!value.length) return;

        searchValues.forEach(searchValue => {
            searchValue.innerText = value.trim();
        });

        if (!searchModal.hasAttribute('hidden')) {
            searchModal.hidden = true;
        }

        if (!filteredProducts.length || value !== 'чернила') {
            catalogCover.hidden = true;
            mainBlock.hidden = true;
            searchBlock.hidden = true;
            notFoundBlock.hidden = false;
            e.target.value = '';
            return;
        }

        searchHandler();

        e.target.value = '';
    }
}

searchInputDesktop.addEventListener('keyup', inputHandler);
searchInput.addEventListener('keyup', inputHandler);

function searchHandler() {
    const catalogArticlesList = document.getElementById('catalog-articles-list'),
        catalogSearchInfoList = document.getElementById('catalog-search-info-list'),
        searchBlockList = document.getElementById('search-block-list');

    if (window.location.pathname !== '/catalog.html') {
        window.location.href = '/catalog.html';
    }

    if (searchBlockList && searchBlockList.children.length) {
        searchBlockList.replaceChildren();
        catalogArticlesList.replaceChildren();
        catalogSearchInfoList.replaceChildren();
    }

    filteredProducts.some(product => {
        searchBlockList.insertAdjacentHTML('beforeend', template(product));
    });
    articles.some(article => {
        catalogArticlesList.insertAdjacentHTML('beforeend', articleTemplate(article));
    });
    info.some(item => {
        catalogSearchInfoList.insertAdjacentHTML('beforeend', infoTemplate(item));
    });

    catalogCover.hidden = true;
    mainBlock.hidden = true;
    notFoundBlock.hidden = true;
    searchBlock.hidden = false;
}

search.addEventListener('click', searchHandler);

body.addEventListener('click', e => {
    if (!e.target.closest('.searchModal')) {
        searchModal.hidden = true;
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 640 && !searchModal.hasAttribute('hidden')) {
        searchModal.hidden = true;
    }
});

// Inputs
function inputValidation() {
    const inputs = document.querySelectorAll('.input-required');
    if (inputs.length === 0) return;
    inputs.forEach(input => {
        input.addEventListener('input', e => {
            if (e.target.value.length === 0) {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
    });
}

inputValidation();

// Show alternative product image
const images = document.querySelectorAll('.card__image-block');

images.forEach(image => {
    image.addEventListener('mouseenter', mouseImageHandler);
    image.addEventListener('mouseleave', mouseImageHandler);
});

function mouseImageHandler(e) {
    const primaryImage = e.currentTarget.querySelector('.card__image-primary'),
        secondaryImage = e.currentTarget.querySelector('.card__image-secondary');

    if (e.type === 'mouseenter') {
        primaryImage.hidden = true;
        secondaryImage.hidden = false;
    } else {
        primaryImage.hidden = false;
        secondaryImage.hidden = true;
    }
}
