import Glide from '@glidejs/glide';
import template from '../templates/articleCatalogCard.hbs';
import blogArticleTemplate from '../templates/blogArticleCard.hbs';
import similarArticleTemplate from '../templates/similarArticlesCard.hbs';
import { articles } from '../data/blog.js';

const blogList = document.getElementById('blog-list');
const blogArticle = document.getElementById('blog-article');
const similarArticles = document.getElementById('similar-articles');
const similarArticlesList = document.getElementById('similar-articles-list');

articles.forEach(article => {
    blogList.insertAdjacentHTML('beforeend', template(article));
    similarArticlesList.insertAdjacentHTML('beforeend', similarArticleTemplate(article));
});

const openArticleBtns = document.querySelectorAll('.catalog__articles-link-wrapper');

let isMount = false;
openArticleBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        blogList.hidden = true;

        const currentElemId = e.currentTarget.parentElement.id;

        articles.forEach(article => {
            if (article.id === currentElemId) {
                blogArticle.innerHTML = blogArticleTemplate(article);
            }
        });

        blogArticle.hidden = false;
        similarArticles.hidden = false;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        if (!isMount) {
            new Glide('.glide', {
                type: 'slider',
                gap: 49,
                perView: 3,
                peek: {
                    before: 0,
                    after: 0,
                },
                breakpoints: {
                    1289: {
                        gap: 30,
                        perView: 1,
                        peek: {
                            before: 0,
                            after: 562,
                        },
                    },
                    979: {
                        gap: 30,
                        perView: 1,
                        peek: {
                            before: 0,
                            after: 222,
                        },
                    },
                    639: {
                        gap: 15,
                        perView: 1,
                        peek: {
                            before: 0,
                            after: 110,
                        },
                    },
                },
            }).mount();
        }

        isMount = true;
    });
});
