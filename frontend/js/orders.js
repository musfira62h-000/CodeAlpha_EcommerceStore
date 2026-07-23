// My orders page

const ordersEl = document.getElementById('orders');

async function loadOrders() {
  if (!requireAuth()) return;
  ordersEl.innerHTML = '<p class="empty">Loading orders...</p>';

  try {
    const orders = await apiFetch('/orders/mine');
    if (!orders.length) {
      ordersEl.innerHTML = `<div class="empty">You have no orders yet. <a href="index.html">Start shopping</a></div>`;
      return;
    }

    ordersEl.innerHTML = orders.map(orderCard).join('');
  } catch (err) {
    ordersEl.innerHTML = `<div class="alert alert-error">${escapeHtml(err.message)}</div>`;
  }
}

function orderCard(o) {
  const date = new Date(o.createdAt).toLocaleString();
  const items = o.items.map((i) => `
    <tr>
      <td>${escapeHtml(i.name)}</td>
      <td>${i.qty}</td>
      <td>${money(i.price)}</td>
      <td>${money(i.price * i.qty)}</td>
    </tr>`).join('');

  const payBtn = o.isPaid
    ? `<span class="badge" style="background:#dcfce7;color:#16a34a;">Paid</span>`
    : `<button class="btn btn-sm" onclick="payOrder('${o._id}')">Pay Now</button>`;

  return `
    <div class="panel">
      <div class="summary-row">
        <div>
          <strong>Order #${o._id.slice(-6)}</strong>
          <span class="badge" style="margin-left:0.5rem;">${o.status}</span>
        </div>
        <span class="muted">${date}</span>
      </div>
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead>
        <tbody>${items}</tbody>
      </table>
      <div class="summary-row summary-total" style="margin-top:0.75rem;">
        <span>Total: ${money(o.totalPrice)}</span>
        <span>${payBtn}</span>
      </div>
      <p class="muted" style="margin-top:0.5rem;">
        Ship to: ${escapeHtml(o.shippingAddress.fullName)}, ${escapeHtml(o.shippingAddress.address)},
        ${escapeHtml(o.shippingAddress.city)} ${escapeHtml(o.shippingAddress.postalCode)},
        ${escapeHtml(o.shippingAddress.country)}
      </p>
    </div>`;
}

window.payOrder = async (id) => {
  try {
    await apiFetch(`/orders/${id}/pay`, { method: 'PUT' });
    toast('Payment successful!');
    loadOrders();
  } catch (err) {
    toast(err.message);
  }
};

loadOrders();
