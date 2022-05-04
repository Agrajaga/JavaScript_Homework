"use strict";

class Cart {
    addItem(itemDataSet) {
        if (itemDataSet["id"] in this) {
            this[itemDataSet["id"]].count++;
            return;
        }
        this[itemDataSet["id"]] = {
            id: itemDataSet["id"],
            name: itemDataSet["name"],
            price: itemDataSet["price"],
            count: 1,   
        };
    }
    count() {
        let count = 0;
        Object.values(this).forEach(v => {
            count += v.count;
        });
        return count;
    }
    fillCartElement(cartElement) {
        let sumTotal = 0;
        const footerElement = cartElement.querySelector(".cartTotal");
        const totalElement = footerElement.querySelector(".cartTotalValue");

        cartElement
            .querySelectorAll("div.cartRow:not(.cartHeader)")
            .forEach(el => el.remove());
        
        Object.values(this).forEach(v => {
            const newRowElement = document.createElement("div");
            newRowElement.classList.add("cartRow");
            cartElement.insertBefore(newRowElement, footerElement);

            const nameElement = document.createElement("div");
            nameElement.textContent = v.name;
            newRowElement.appendChild(nameElement);
            const countElement = document.createElement("div");
            countElement.textContent = v.count;
            newRowElement.appendChild(countElement);
            const priceElement = document.createElement("div");
            priceElement.textContent = v.price;
            newRowElement.appendChild(priceElement);
            const sumElement = document.createElement("div");
            const sum = Math.round(v.price * v.count * 100) / 100;
            sumElement.textContent = sum;
            newRowElement.appendChild(sumElement);
            sumTotal += sum;
        });
        totalElement.textContent = sumTotal;
    }
}

const cart = new Cart;
const cartElement = document.querySelector(".cart");
const cartIcon = document.querySelector(".cartIcon");
const cartCount = document.querySelector("span.cartCount");
const itemsElement = document.querySelector(".featuredItems");

cartIcon.addEventListener("click", () => {
    cartElement.classList.toggle("hidden");
});

itemsElement.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;
    const itemElement = event.target.closest(".featuredItem");
    cart.addItem(itemElement.dataset);
    cartCount.textContent = cart.count();
    cart.fillCartElement(cartElement);
});

