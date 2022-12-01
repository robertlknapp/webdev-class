
const { getProduct } = require('./products');

const list = [];


const get = (userId) => {
    return list.filter((cartItem) => cartItem.userId === userId)
               .map((cartItem) => ({
                    ...cartItem, product: getProduct(cartItem.productId)
               }));
};

const add = (userId, productId, quantity) => {
    let cartItem = list.find((cartItem) => cartItem.userId === userId && cartItem.productId === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cartItem = { id: list.length + 1, quantity, productId, userId };
        list.push(cartItem);
    }
    return { ...cartItem, product: getProduct(productId) };
};

const update = (userId, productId, quantity) => {
    const index = list.findIndex((cartItem) => cartItem.userId === userId && cartItem.productId === productId);
    if (index !== -1) {
        if(quantity === 0) {
            list.splice(index, 1);
            return "null";
        } else {
            list[index].quantity = quantity;
        }
    } else {
        throw new Error('Item not found');
    }
    return { ...list[index], product: getProduct(productId) };
}

module.exports = { add, get, update };