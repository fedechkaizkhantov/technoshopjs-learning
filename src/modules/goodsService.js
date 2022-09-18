import { API_URI } from "./var";

export const getGoods = () => {


    const pageURL = new URL(location);

    const url = new URL (`${API_URI}api/goods`);
    // console.log(pageURL.searchParams.entries());
    for (const [name, value] of pageURL.searchParams.entries()) {
        url.searchParams.set(name, value)

    }

    // if (page) url.searchParams.append('page', page);

    // if (category) url.searchParams.append('category', category);

    return fetch (url).then(response => response.json());
};

export const getGoodsItem = (id) => 
    fetch (`${API_URI}api/goods/${id}`).then(response => response.json())

export const getCategory = () => 
    fetch(`${API_URI}api/category`).then(response => response.json())

