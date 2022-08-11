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
import { pagination } from './modules/pagination';

const paginationWrapper = document.querySelector('.pagination');
const pageUrl = new URL(location);

const page = pageUrl.searchParams.get('page') || 1;

pagination(paginationWrapper, 10, page, 6);

const thumbSwiper = new Swiper('.card__slider-thumb',{
    spaceBetween: 44,
    slidesPerView: 3,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    modules: [Scrollbar],
    
});
new Swiper('.card__image', {
    spaceBetween: 10,
    slidesPerView: 1,
    thumbs: {
        swiper: thumbSwiper,
        slideThumbActiveClass: 'card__thumb-btn-active',
    },
    modules: [Thumbs],

});

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
