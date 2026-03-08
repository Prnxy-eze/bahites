function toggleCart() {
  const cart = document.getElementById("cart-panel");
  if (!cart) return;
  cart.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const cartPanel = document.getElementById("cart-panel");
  if (!cartPanel) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutMessage = document.getElementById("checkout-message");
  const orderModal = document.getElementById("order-modal");
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");
  const confirmOrderBtn = document.getElementById("confirm-order");
  const cancelOrderBtn = document.getElementById("cancel-order");
  const receiptModal = document.getElementById("receipt-modal");
  const receiptItems = document.getElementById("receipt-items");
  const receiptTotal = document.getElementById("receipt-total");
  const receiptPayment = document.getElementById("receipt-payment");
  const closeReceiptBtn = document.getElementById("close-receipt");

  /* ADD TO CART */
  const buttons = document.querySelectorAll(".add-btn");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = parseFloat(this.dataset.price);
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
      cartPanel.classList.add("open");
    });
  });

  /* UPDATE CART UI */
  function updateCartUI() {
    cartItems.innerHTML = "";
    let total = 0;

    // Group items by name
    const grouped = {};
    cart.forEach((item) => {
      if (!grouped[item.name]) {
        grouped[item.name] = { name: item.name, price: item.price, qty: 0 };
      }
      grouped[item.name].qty++;
      total += item.price;
    });

    Object.values(grouped).forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">₱${(item.price * item.qty).toFixed(2)}</span>
                <div class="cart-controls">
                    <button class="qty-btn minus-btn" onclick="changeQty('${item.name}', -1)">−</button>
                    <span class="qty-display">${item.qty}</span>
                    <button class="qty-btn plus-btn" onclick="changeQty('${item.name}', 1)">+</button>
                    <button class="qty-btn delete-btn" onclick="removeAllOfItem('${item.name}')">✕</button>
                </div>
            `;
      cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
  }

  // Change quantity (+1 or -1)
  window.changeQty = function (name, delta) {
    if (delta > 0) {
      const sample = cart.find(i => i.name === name);
      if (sample) cart.push({ name: sample.name, price: sample.price });
    } else {
      const idx = cart.findLastIndex ? cart.findLastIndex(i => i.name === name) : (() => {
        let last = -1;
        cart.forEach((i, idx) => { if (i.name === name) last = idx; });
        return last;
      })();
      if (idx !== -1) cart.splice(idx, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  };

  // Remove all of one item
  window.removeAllOfItem = function (name) {
    cart = cart.filter(i => i.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  };

  /* CHECKOUT */
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cart.length === 0) { checkoutMessage.textContent = "Your cart is empty!"; return; }
    summaryItems.innerHTML = "";
    let total = 0;

    // Group by name for summary display
    const summaryGrouped = {};
    cart.forEach(item => {
      if (!summaryGrouped[item.name]) summaryGrouped[item.name] = { price: item.price, qty: 0 };
      summaryGrouped[item.name].qty++;
      total += item.price;
    });

    Object.entries(summaryGrouped).forEach(([name, data]) => {
      const li = document.createElement("li");
      li.textContent = `${name} × ${data.qty} — ₱${(data.price * data.qty).toFixed(2)}`;
      summaryItems.appendChild(li);
    });

    summaryTotal.textContent = total.toFixed(2);
    orderModal.classList.add("active");
  });

  cancelOrderBtn.addEventListener("click", () => orderModal.classList.remove("active"));

  confirmOrderBtn.addEventListener("click", () => {
    const payment = document.getElementById("payment-method").value;
    const custName = document.getElementById("cust-name") ? document.getElementById("cust-name").value : "";
    const custPhone = document.getElementById("cust-phone") ? document.getElementById("cust-phone").value : "";
    const custAddress = document.getElementById("cust-address") ? document.getElementById("cust-address").value : "";

    receiptItems.innerHTML = "";
    let total = 0;

    const receiptGrouped = {};
    cart.forEach(item => {
      if (!receiptGrouped[item.name]) receiptGrouped[item.name] = { price: item.price, qty: 0 };
      receiptGrouped[item.name].qty++;
      total += item.price;
    });

    Object.entries(receiptGrouped).forEach(([name, data]) => {
      const li = document.createElement("li");
      li.textContent = `${name} × ${data.qty} — ₱${(data.price * data.qty).toFixed(2)}`;
      receiptItems.appendChild(li);
    });

    receiptTotal.textContent = total.toFixed(2);
    receiptPayment.textContent = payment;

    // Fire-and-forget save to Firestore — don't block the receipt UI
    const cartSnapshot = cart.slice(); // snapshot before clearing
    if (typeof window.placeOrder === "function") {
      window.placeOrder({
        name: custName,
        contact: custPhone,
        address: custAddress,
        payment: payment,
        items: cartSnapshot,
        total: total.toFixed(2)
      }).catch(e => console.error("Firestore save failed:", e));
    }

    orderModal.classList.remove("active");
    receiptModal.classList.add("active");
    cart = [];
    localStorage.removeItem("cart");
    updateCartUI();
  });

  closeReceiptBtn.addEventListener("click", () => receiptModal.classList.remove("active"));

  updateCartUI();
});