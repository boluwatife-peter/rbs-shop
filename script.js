let cart = [];
let count = 0;

const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function toggleCart() {
  cartBox.classList.toggle("show");
}

function addToCart(name, price) {
  cart.push({ name, price });
  count++;
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;

    cartItems.innerHTML += `
      <div>
        ${item.name} - $${item.price}
        <button onclick="removeItem(${i})">x</button>
      </div>
    `;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  count--;
  updateCart();
}

function clearCart() {
  cart = [];
  count = 0;
  updateCart();
}