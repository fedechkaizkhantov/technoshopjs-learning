import { getCategory } from "./goodsService";
import { API_URI } from "./var";


export const footerCatalog = () => {

    const category = document.querySelector('#categoryFooter');

    getCategory().then(categoryList => {
        // console.log(categoryList);//выводится лист категорий типа notebook: 'Ноутбуки', smartphone: 'Смартфоны', smartwatch: 'Умные часы'
        for (const categoryListKey in categoryList) {  //для каждого ключа
            const li = document.createElement('li'); //создаем переменную li
            li.className = 'footer__item'; 
            
            const itemLink = document.createElement('a');
            itemLink.href = `index.html?category=${categoryListKey}`;
            itemLink.className = 'footer__link';
            itemLink.textContent = categoryList[categoryListKey];

            li.append(itemLink);
            
            category.append(li);
                
                }
            });

    }

