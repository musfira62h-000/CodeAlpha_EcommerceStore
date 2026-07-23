// Product listing page

const productsEl = document.getElementById('products');
const statusEl = document.getElementById('status');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');

let searchTimer;

async function loadCategories() {
  try {
    const cats = await apiFetch('/products/categories');
    cats.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      categoryEl.appendChild(opt);
    });
  } catch (e) { /* ignore */ }
}

async function loadProducts() {
  const params = new URLSearchParams();
  if (searchEl.value.trim()) params.set('search', searchEl.value.trim());
  if (categoryEl.value && categoryEl.value !== 'All') params.set('category', categoryEl.value);

  productsEl.innerHTML = '';
  statusEl.style.display = 'block';
  statusEl.textContent = 'Loading products...';

  try {
    const products = await apiFetch(`/products?${params.toString()}`);
    statusEl.style.display = products.length ? 'none' : 'block';
    if (!products.length) { statusEl.textContent = 'No products found.'; return; }

    productsEl.innerHTML = products.map(cardHtml).join('');
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
}

function cardHtml(p) {
  const stock = p.countInStock > 0
    ? `<span class="stock-in">In stock (${p.countInStock})</span>`
    : `<span class="stock-out">Out of stock</span>`;
  return `
    <div class="card">
      <a href="product.html?id=${p._id}">
        <img src="${escapeHtml(p.image) || 'https://via.placeholder.com/300'}" alt="${escapeHtml(p.name)}" />
      </a>
      <div class="card-body">
        <span class="card-cat">${escapeHtml(p.category)}</span>
        <a href="product.html?id=${p._id}"><span class="card-title">${escapeHtml(p.name)}</span></a>
        <span class="price">${money(p.price)}</span>
        ${stock}
        <button class="btn btn-block" ${p.countInStock === 0 ? 'disabled' : ''}
          onclick='quickAdd(${JSON.stringify(p).replace(/'/g, "&#39;")})'>
          Add to Cart
        </button>
      </div>
    </div>`;
}

function quickAdd(product) { addToCart(product, 1); }

searchEl.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadProducts, 300);
});
categoryEl.addEventListener('change', loadProducts);

loadCategories();
loadProducts();
