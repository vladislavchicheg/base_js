'use strict';

class Basket {
    items = {};
    basketCounterEl = document.querySelector('.cartIconWrap span');
    basketTotalEl = document.querySelector('.basketTotal');
    basketTotalValueEl = document.querySelector('.basketTotalValue');
    basketEl = document.querySelector('.basket');

    /**
     *
     * @param id
     * @param name
     * @param price
     */
    addToCart(id, name, price) {
        if (!(id in this.items)) {
            this.items[id] = {id: id, name: name, price: price, count: 0};
        }
        this.items[id].count++;
        this.basketCounterEl.textContent = this.getTotalBasketCount().toString();
        this.basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
        this.renderProductInBasket(id);
    }

    getTotalBasketCount() {
        return Object.values(this.items).reduce((acc, product) => acc + product.count, 0);
    }

    /**
     *
     * @returns {number}
     */
    getTotalBasketPrice() {
        return Object
            .values(this.items)
            .reduce((acc, product) => acc + product.price * product.count, 0);
    }

    /**
     *
     * @param productId
     */
    renderProductInBasket(productId) {
        const basketRowEl = this.basketEl
            .querySelector(`.basketRow[data-id="${productId}"]`);
        if (!basketRowEl) {
            this.renderNewProductInBasket(productId);
            return;
        }
        const product = this.items[productId];
        basketRowEl.querySelector('.productCount').textContent = product.count;
        basketRowEl
            .querySelector('.productTotalRow')
            .textContent = (product.price * product.count).toFixed(2);
    }

    /**
     *
     * @param productId
     */
    renderNewProductInBasket(productId) {
        const productRow = `
        <div class="basketRow" data-id="${productId}">
            <div>${this.items[productId].name}</div>
          <div>
            <span class="productCount">${this.items[productId].count}</span> шт.
          </div>
          <div>$${this.items[productId].price}</div>
          <div>
            $<span class="productTotalRow">${(this.items[productId].price * this.items[productId].count).toFixed(2)}</span>
          </div>
        </div>
         `;
        this.basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
    }

    showBasket() {
        this.basketEl.classList.toggle('hidden');
    }
}

const basket = new Basket();

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basket.showBasket()
});

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.classList.contains("addToCart")) {
        return;
    }

    const id = +event.target.dataset.id;
    const name = event.target.dataset.name;
    const price = +event.target.dataset.price;
    basket.addToCart(id, name, price);
});