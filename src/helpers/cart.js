module.exports = class Cart {
    constructor(cart) {
        this.items = cart.item;
        this.quantity = cart.quantity;
        this.total = cart.total;
    }

    add(item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item, quantity: 0, price: 0 };
        }
        storedItem.quantity++;
        storedItem.price = storedItem.item.price * storedItem.quantity;
        this.quantity++;
        this.total += storedItem.price;
    }

    generateArray() {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};