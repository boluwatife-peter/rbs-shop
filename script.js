const products = [
  {
    id: 1,
    name: "Modern Watch",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Wireless Headset",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Smart Speaker",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=400&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ELEMENTS */
const productGrid = document.querySelector(".product-grid");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

/* RENDER PRODUCTS */
function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach(p => {
    productGrid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

/* CART TOGGLE */
function toggleCart() {
  cartBox.classList.toggle("show");
}

/* ADD TO CART */
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCart();
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

/* CLEAR CART */
function clearCart() {
  cart = [];
  saveCart();
  updateCart();
}

/* SAVE CART */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* UPDATE CART UI */
function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;

    cartItems.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin:10px 0;">
        ${item.name} - $${item.price}
        <button onclick="removeItem(${i})">x</button>
      </div>
    `;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);

  /* CHECKOUT BUTTON */
  if (cart.length > 0) {
    cartItems.innerHTML += `
      <button onclick="checkout()" style="
        width:100%;
        margin-top:15px;
        padding:10px;
        background:#16a34a;
        color:white;
        border:none;
        border-radius:8px;
        cursor:pointer;
      ">
        Checkout
      </button>
    `;
  }
}

/* CHECKOUT PAGE REDIRECT */
function checkout() {
  window.location.href = "checkout.html";
}

/* INIT */
renderProducts();
updateCart();
}
