// Cart + checkout page

const content = document.getElementById('cart-content');
const alertBox = document.getElementById('alert');

function render() {
  const cart = getCart();

  if (!cart.length) {
    content.innerHTML = `<div class="empty">Your cart is empty. <a href="index.html">Browse products</a></div>`;
    return;
  }

  const rows = cart.map((item) => `
    <tr>
      <td>
        <img src="${escapeHtml(item.image) || 'https://via.placeholder.com/60'}" class="cart-item-img" alt="" />
        ${escapeHtml(item.name)}
      </td>
      <td>${money(item.price)}</td>
      <td>
        <input type="number" class="qty-input" min="1" value="${item.qty}"
          onchange="changeQty('${item.product}', this.value)" />
      </td>
      <td>${money(item.price * item.qty)}</td>
      <td><button class="btn btn-sm btn-danger" onclick="remove('${item.product}')">Remove</button></td>
    </tr>
  `).join('');

  const user = getUser();
  const checkoutSection = user ? checkoutFormHtml() : `
    <div class="panel">
      <p>Please <a href="login.html?redirect=cart.html">login</a> to place your order.</p>
    </div>`;

  content.innerHTML = `
    <div class="panel">
      <table>
        <thead>
          <tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <div class="panel">
      <div class="summary-row summary-total">
        <span>Total</span><span>${money(cartTotal())}</span>
      </div>
    </div>

    ${checkoutSection}
  `;
}

function checkoutFormHtml() {
  const user = getUser();
  return `
    <div class="panel">
      <h3 style="margin-bottom:1rem;">Shipping & Checkout</h3>
      <form id="checkout-form">
        <div class="form-group">
          <label>Full Name</label>
          <input class="form-control" name="fullName" value="${escapeHtml(user.name)}" required />
        </div>
        <div class="form-group">
          <label>Address</label>
          <input class="form-control" name="address" required />
        </div>
        <div class="toolbar">
          <div class="form-group" style="flex:1;">
            <label>City</label>
            <input class="form-control" name="city" required />
          </div>
          <div class="form-group" style="flex:1;">
            <label>Postal Code</label>
            <input class="form-control" name="postalCode" required />
          </div>
          <div class="form-group" style="flex:1;">
            <label>Country</label>
            <input class="form-control" name="country" required />
          </div>
        </div>
        <button type="submit" class="btn btn-block" id="place-btn">Place Order (${money(cartTotal())})</button>
      </form>
    </div>`;
}

window.changeQty = (id, val) => { updateCartQty(id, parseInt(val) || 1); render(); };
window.remove = (id) => { removeFromCart(id); render(); };

content.addEventListener('submit', async (e) => {
  if (e.target.id !== 'checkout-form') return;
  e.preventDefault();
  if (!requireAuth()) return;

  const fd = new FormData(e.target);
  const shippingAddress = Object.fromEntries(fd.entries());
  const items = getCart().map((i) => ({ product: i.product, qty: i.qty }));

  const btn = document.getElementById('place-btn');
  btn.disabled = true;
  btn.textContent = 'Placing order...';

  try {
    const order = await apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify({ items, shippingAddress }),
    });
    clearCart();
    alertBox.innerHTML = `<div class="alert alert-success">Order placed successfully! Redirecting...</div>`;
    setTimeout(() => (window.location.href = `orders.html`), 1200);
  } catch (err) {
    alertBox.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
    btn.disabled = false;
    btn.textContent = `Place Order (${money(cartTotal())})`;
  }
});

render();
