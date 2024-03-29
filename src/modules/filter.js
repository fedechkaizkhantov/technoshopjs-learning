
import { getCategory, getGoods } from "./goodsService";
import { renderGoods } from "./renderGoods";
import { startPagination } from "./pagination";
import { showOverlay, hideOverlay } from "./overlay";


const toggleFilter = (filter, catalogFilterBtn, filterTitle) => {
    catalogFilterBtn.addEventListener('click', () => {
        filter.classList.add('filter_show');
        showOverlay();
    });
    filterTitle.addEventListener('click', () => {
        filter.classList.remove('filter_show');
        hideOverlay();
    });

}

export const filter = (goodsList, paginationWrapper) => {

    const filter = document.querySelector('.filter');

    const catalogFilterBtn = document.querySelector('.catalog__filter-btn');

    const category = document.querySelector('#category');

    const filterTitle = document.querySelector('.filter__title');

    toggleFilter(filter, catalogFilterBtn, filterTitle);

    getCategory().then(categoryList => {
        for (const categoryListKey in categoryList) {
            const option = document.createElement('option');
            option.value = categoryListKey;
            option.textContent = categoryList[categoryListKey];
            category.append(option);
                
            }
    });
    const filterForm = document.querySelector('.filter__form');
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const checkBoxes = new Set();
        [...filterForm.elements].forEach(elem => {
            if(elem.type === 'checkbox') {
                checkBoxes.add(elem.name);
            }
        })

        const data = {};

        const formData = new FormData(filterForm);

        for (const [name, value] of formData) {
            if (!value) continue;

            if (checkBoxes.has(name)) {
                if (Array.isArray(data[name])) {
                    data[name].push(value);
                } else {
                    data [name] = [value]
                }

            } else {
                data[name] = value;
            }
        }

        goodsList.innerHTML = `
        <div class = "goods__preload">
        <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100.72 17.281L91.45 26.5506C83.9433 19.0431 74.0658 14.3708 63.5004 13.3296C52.9349 12.2884 42.3354 14.9429 33.5077 20.8406C24.68 26.7384 18.1703 35.5145 15.0879 45.6738C12.0054 55.833 12.5409 66.7468 16.6031 76.5555C20.6653 86.3642 28.0029 94.4609 37.3655 99.4661C46.7282 104.471 57.5367 106.075 67.9495 104.005C78.3622 101.934 87.7349 96.3175 94.4706 88.1112C101.206 79.905 104.888 69.6171 104.889 59.0005H118C118 72.6504 113.267 85.8781 104.607 96.4295C95.9478 106.981 83.8976 114.203 70.5099 116.866C57.1222 119.529 43.2253 117.468 31.1872 111.033C19.1491 104.598 9.71447 94.1888 4.49096 81.5779C-0.732562 68.967 -1.42181 54.935 2.54066 41.8728C6.50312 28.8107 14.8721 17.5266 26.2217 9.94315C37.5713 2.35973 51.1992 -1.05378 64.7834 0.28423C78.3676 1.62225 91.0676 7.629 100.72 17.281V17.281Z" fill="black"/>
        </svg>

        </div>
    
        `;

        const url = new URL(location);

        const search = url.searchParams.get('search');

        url.search = '';

        url.searchParams.set('search', search);

        for (const key in data) {
            url.searchParams.set(key, data[key]);
        }



        history.pushState(null, null, url);

        getGoods().then(({goods, pages, page}) => {
            filter.classList.remove('filter_show');
            hideOverlay();
            renderGoods(goodsList, goods, 'goods__item');
            startPagination (paginationWrapper, pages, page);
        })
        
    });

}