import data from '../data/products.json';

export function getProducts() {
    return data.products;
};

export function getProduct(id: number) {
    return data.products.find((product) => product.id === id); //pass in product get does product id have the id we passed into the overall method
};

export function deleteProduct(id: number) {
    data.products = data.products.filter( (product) => product.id  !== id);
};