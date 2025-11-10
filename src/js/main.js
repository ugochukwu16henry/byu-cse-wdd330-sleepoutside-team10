import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert1.js';

document.addEventListener('DOMContentLoaded', () => {
    async () => {
        const alertSystem = new Alert();
        await alertSystem.init();
    }
});

const dataSource = new ProductData('tents');

const element = document.querySelector('.product-list');

const productList = new ProductList('Tents', dataSource, element);

productList.init();
