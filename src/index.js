// import '@babel/polyfill';
import './index.html';
import './index.scss';
import './card.html';
import './cart.html';
import Swiper, { Thumbs, Scrollbar, Pagination } from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import { startPagination } from './modules/pagination';
import { getGoods, getGoodsItem, getGoodsList, getGoodsCategoryItem, getCategory } from './modules/goodsService';
import { renderGoods } from './modules/renderGoods';
import { renderItem } from './modules/renderItem';
import { filter } from './modules/filter';
import { cartControl } from './modules/cartControl';
import { serviceCounter } from './modules/counterControl';
import { searchWithoutReload } from './modules/search';
import { renderCart } from './modules/cartControl';
import { renderRecommended } from './modules/renderRecommended';
import { footerCatalog } from './modules/footer';


try {

    const footerCategoryList = document.querySelector ('.footer__list');
    if (footerCategoryList) {

        footerCatalog();

    }

} catch (e) {
    console.warn(e);
}


try {
    const goodsList = document.querySelector('.goods__list');

    if (goodsList) {
    
    const paginationWrapper = document.querySelector('.pagination');

    searchWithoutReload(goodsList, paginationWrapper);



    filter(goodsList, paginationWrapper); 
   
    
    // const page = +pageUrl.searchParams.get('page') || 1;

    goodsList.innerHTML = `
        <div class = "goods__preload">
        <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100.72 17.281L91.45 26.5506C83.9433 19.0431 74.0658 14.3708 63.5004 13.3296C52.9349 12.2884 42.3354 14.9429 33.5077 20.8406C24.68 26.7384 18.1703 35.5145 15.0879 45.6738C12.0054 55.833 12.5409 66.7468 16.6031 76.5555C20.6653 86.3642 28.0029 94.4609 37.3655 99.4661C46.7282 104.471 57.5367 106.075 67.9495 104.005C78.3622 101.934 87.7349 96.3175 94.4706 88.1112C101.206 79.905 104.888 69.6171 104.889 59.0005H118C118 72.6504 113.267 85.8781 104.607 96.4295C95.9478 106.981 83.8976 114.203 70.5099 116.866C57.1222 119.529 43.2253 117.468 31.1872 111.033C19.1491 104.598 9.71447 94.1888 4.49096 81.5779C-0.732562 68.967 -1.42181 54.935 2.54066 41.8728C6.50312 28.8107 14.8721 17.5266 26.2217 9.94315C37.5713 2.35973 51.1992 -1.05378 64.7834 0.28423C78.3676 1.62225 91.0676 7.629 100.72 17.281V17.281Z" fill="black"/>
        </svg>

        </div>
    
    `;
    getGoods().then(({goods, pages, page}) => {
        
        renderGoods(goodsList, goods);
        startPagination (paginationWrapper, pages, page);
        cartControl({
            wrapper: goodsList, 
            classAdd: 'goods-item__to-cart', 
            classDelete: 'goods-item__to-cart_remove',
            })
        })

    
    
    }


    

} catch (e) {
    console.warn(e);
}

try {
    const card = document.querySelector('.card');

    if (card) {
        const recommended = document.querySelector('.recommended'); 
        const pageUrl = new URL(location);
        const id = +pageUrl.searchParams.get('id');

        const preload = document.createElement('div');
        preload.className = 'preload';
        preload.innerHTML = 
        `<svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100.72 17.281L91.45 26.5506C83.9433 19.0431 74.0658 14.3708 63.5004 13.3296C52.9349 12.2884 42.3354 14.9429 33.5077 20.8406C24.68 26.7384 18.1703 35.5145 15.0879 45.6738C12.0054 55.833 12.5409 66.7468 16.6031 76.5555C20.6653 86.3642 28.0029 94.4609 37.3655 99.4661C46.7282 104.471 57.5367 106.075 67.9495 104.005C78.3622 101.934 87.7349 96.3175 94.4706 88.1112C101.206 79.905 104.888 69.6171 104.889 59.0005H118C118 72.6504 113.267 85.8781 104.607 96.4295C95.9478 106.981 83.8976 114.203 70.5099 116.866C57.1222 119.529 43.2253 117.468 31.1872 111.033C19.1491 104.598 9.71447 94.1888 4.49096 81.5779C-0.732562 68.967 -1.42181 54.935 2.54066 41.8728C6.50312 28.8107 14.8721 17.5266 26.2217 9.94315C37.5713 2.35973 51.1992 -1.05378 64.7834 0.28423C78.3676 1.62225 91.0676 7.629 100.72 17.281V17.281Z" fill="black"/>
        </svg>`;
        card.append(preload);

        serviceCounter({
            wrapper: '.card__count',
            number: '.card__number',
            selectorDec: '.card__btn_dec',
            selectorInc: '.card__btn_inc',
        })

        getGoodsItem(id).then(item => {
            renderItem(item);
            cartControl({
                classAdd: 'card__add-cart',
                classCount: 'card__number',
            })
            preload.remove();
            return item.category;

        }).then(category => {
            return getGoodsCategoryItem( category );

        }).then(data => {
            renderRecommended(recommended, data, id);
        })

    }

} catch (e) {
    console.warn(e);
    // console.log ('это не страница карт товаров');
}

try {
    const cart = document.querySelector('.cart');

    if (cart) {
        const cartGoods = localStorage.getItem('cart-ts') ? 
        JSON.parse(localStorage.getItem('cart-ts')) :
        {};

        const list = Object.keys(cartGoods);
        
        if (list.length) {
            const preload = document.createElement('div');
            preload.className = 'preload';
            preload.innerHTML = 
            `<svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100.72 17.281L91.45 26.5506C83.9433 19.0431 74.0658 14.3708 63.5004 13.3296C52.9349 12.2884 42.3354 14.9429 33.5077 20.8406C24.68 26.7384 18.1703 35.5145 15.0879 45.6738C12.0054 55.833 12.5409 66.7468 16.6031 76.5555C20.6653 86.3642 28.0029 94.4609 37.3655 99.4661C46.7282 104.471 57.5367 106.075 67.9495 104.005C78.3622 101.934 87.7349 96.3175 94.4706 88.1112C101.206 79.905 104.888 69.6171 104.889 59.0005H118C118 72.6504 113.267 85.8781 104.607 96.4295C95.9478 106.981 83.8976 114.203 70.5099 116.866C57.1222 119.529 43.2253 117.468 31.1872 111.033C19.1491 104.598 9.71447 94.1888 4.49096 81.5779C-0.732562 68.967 -1.42181 54.935 2.54066 41.8728C6.50312 28.8107 14.8721 17.5266 26.2217 9.94315C37.5713 2.35973 51.1992 -1.05378 64.7834 0.28423C78.3676 1.62225 91.0676 7.629 100.72 17.281V17.281Z" fill="black"/>
            </svg>`;
            cart.append(preload);

            getGoodsList(list).then(goods => {
                renderCart(goods, cartGoods);
                cartControl();
                preload.remove();
            })

        }
    }

} catch (e) {
    console.warn(e);
}

new Swiper('.recommended__carousel',{
    modules: [Pagination],
    spaceBetween: 30,
    slidesPerView: 5,
    pagination: {
        el: '.swiper-pagination',
    },
        
});

// new Swiper('.mySwiper', {
//     pagination: {
//       el: '.swiper-pagination',
//     },
//   });

// // core version + navigation, pagination modules:
// import Swiper, { Navigation, Pagination } from 'swiper';
// // import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // init Swiper:
// const swiper = new Swiper('.swiper', {
//   // configure Swiper to use modules
//   modules: [Navigation, Pagination],
//   ...
// });
