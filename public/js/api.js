// Shared helpers: API calls, auth token, cart storage, navbar, toast.

const API = '/api';

// ---------- Auth token / user ----------
function getToken() { return localStorage.getItem('token'); }
function setAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}
function getUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// ---------- Fetch wrapper ----------
async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  let data;
  try { data = await res.json(); } catch { data = null; }

  if (!res.ok) {
    throw new Error((data && data.message) || `Request failed (${res.status})`);
  }
  return data;
}

// ---------- Cart (localStorage) ----------
function getCart() {
  try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.product === product._id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
      countInStock: product.countInStock,
    });
  }
  saveCart(cart);
  toast(`${product.name} added to cart`);
}
function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.product === productId);
  if (item) item.qty = Math.max(1, qty);
  saveCart(cart);
}
function removeFromCart(productId) {
  saveCart(getCart().filter((i) => i.product !== productId));
}
function clearCart() { saveCart([]); }
function cartCount() { return getCart().reduce((sum, i) => sum + i.qty, 0); }
function cartTotal() { return getCart().reduce((sum, i) => sum + i.price * i.qty, 0); }

// ---------- Navbar ----------
function renderNavbar() {
  const user = getUser();
  const nav = document.getElementById('nav-links');
  if (!nav) return;

  let links = `
    <a href="index.html">Products</a>
    <a href="cart.html">Cart <span class="cart-badge" id="cart-badge">0</span></a>
  `;
  if (user) {
    links += `
      <a href="orders.html">My Orders</a>
      <span class="muted">Hi, ${escapeHtml(user.name.split(' ')[0])}</span>
      <button class="btn btn-sm btn-outline" onclick="logout()">Logout</button>
    `;
  } else {
    links += `
      <a href="login.html">Login</a>
      <a href="register.html" class="btn btn-sm">Sign Up</a>
    `;
  }
  nav.innerHTML = links;
  updateCartBadge();
}
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = cartCount();
}

// ---------- Utilities ----------
function money(n) { return `$${Number(n).toFixed(2)}`; }
function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}
function requireAuth() {
  if (!getToken()) {
    window.location.href = `login.html?redirect=${encodeURIComponent(location.pathname.replace('/', ''))}`;
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', renderNavbar);
