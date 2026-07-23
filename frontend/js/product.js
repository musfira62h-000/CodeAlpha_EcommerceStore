// Product details page

const container = document.getElementById('product');
const id = new URLSearchParams(location.search).get('id');

async function loadProduct() {
  if (!id) { container.innerHTML = '<p class="empty">No product specified.</p>'; return; }
  container.innerHTML = '<p class="empty">Loading...</p>';

  try {
    const p = await apiFetch(`/products/${id}`);
    const stock = p.countInStock > 0
      ? `<span class="stock-in">In stock (${p.countInStock} available)</span>`
      : `<span class="stock-out">Out of stock</span>`;

    container.innerHTML = `
      <div class="detail">
        <div>
          <img src="${escapeHtml(p.image) || 'https://via.placeholder.com/500'}" alt="${escapeHtml(p.name)}" />
        </div>
        <div>
          <span class="badge">${escapeHtml(p.category)}</span>
          <h1>${escapeHtml(p.name)}</h1>
          <p class="muted">⭐ ${p.rating || 0} rating</p>
          <div class="price">${money(p.price)}</div>
          <p>${escapeHtml(p.description)}</p>
          <p style="margin:0.75rem 0;">${stock}</p>
          <div style="display:flex; gap:0.75rem; align-items:center; margin-top:1rem;">
            <label>Qty:</label>
            <input type="number" id="qty" class="qty-input" value="1" min="1" max="${p.countInStock}" />
            <button class="btn" id="add-btn" ${p.countInStock === 0 ? 'disabled' : ''}>Add to Cart</button>
          </div>
        </div>
      </div>`;

    document.getElementById('add-btn')?.addEventListener('click', () => {
      const qty = Math.max(1, parseInt(document.getElementById('qty').value) || 1);
      addToCart(p, qty);
    });
  } catch (err) {
    container.innerHTML = `<p class="empty">Error: ${escapeHtml(err.message)}</p>`;
  }
}

loadProduct();
