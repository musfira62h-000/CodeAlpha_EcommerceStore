// Shared demo data + auto-seeding.
// Used by server.js (seed only if empty) and seed.js (full reset + seed).

const User = require('../models/User');
const Product = require('../models/Product');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Over-ear Bluetooth headphones with active noise cancellation and 30h battery.',
    price: 129.99,
    category: 'Electronics',
    countInStock: 25,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking, heart-rate monitor and notifications on your wrist.',
    price: 89.99,
    category: 'Electronics',
    countInStock: 40,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight breathable running shoes with cushioned soles.',
    price: 74.5,
    category: 'Fashion',
    countInStock: 60,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  },
  {
    name: 'Backpack',
    description: 'Durable water-resistant laptop backpack with USB charging port.',
    price: 49.99,
    category: 'Fashion',
    countInStock: 35,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with 12-cup glass carafe.',
    price: 59.0,
    category: 'Home',
    countInStock: 20,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80',
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with hot-swappable switches.',
    price: 99.99,
    category: 'Electronics',
    countInStock: 30,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    price: 34.99,
    category: 'Home',
    countInStock: 50,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
  },
  {
    name: 'Sunglasses',
    description: 'Polarized UV400 sunglasses with a classic design.',
    price: 24.99,
    category: 'Fashion',
    countInStock: 80,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
  },
];

const demoUsers = [
  { name: 'Admin User', email: 'admin@shop.com', password: 'admin123', isAdmin: true },
  { name: 'Demo Customer', email: 'user@shop.com', password: 'user123' },
];

async function insertDemoUsers() {
  // create() (not insertMany) so the password-hashing pre-save hook runs
  for (const u of demoUsers) await User.create(u);
}

/**
 * Seed demo data ONLY if the database is empty.
 * Called on server startup so the app always has products + demo logins,
 * even when using the ephemeral in-memory database.
 */
async function seedIfEmpty() {
  const productCount = await Product.countDocuments();
  const userCount = await User.countDocuments();
  if (productCount === 0) {
    console.log('🌱 No products found — seeding demo products...');
    await Product.insertMany(products);
  }
  if (userCount === 0) {
    console.log('🌱 No users found — creating demo accounts...');
    await insertDemoUsers();
    console.log('   Admin:    admin@shop.com / admin123');
    console.log('   Customer: user@shop.com  / user123');
  }
}

module.exports = { products, demoUsers, insertDemoUsers, seedIfEmpty };
