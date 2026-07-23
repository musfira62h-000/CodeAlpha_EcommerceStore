require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const { products, insertDemoUsers } = require('./config/bootstrap');

/**
 * Manual full reset + seed.
 *
 * NOTE: If MongoDB is NOT installed, the app uses an in-memory database and
 * this script seeds its OWN temporary instance (separate from the server).
 * In that case you don't even need to run this — the server auto-seeds itself
 * on startup. Run this only when you have a real/persistent MongoDB.
 */
async function seed() {
  await connectDB();

  console.log('🌱 Clearing existing products and users...');
  await Product.deleteMany({});
  await User.deleteMany({});

  console.log('🌱 Inserting products...');
  await Product.insertMany(products);

  console.log('🌱 Creating demo users...');
  await insertDemoUsers();

  console.log('\n✅ Seed complete!');
  console.log('   Admin login:    admin@shop.com / admin123');
  console.log('   Customer login: user@shop.com  / user123\n');

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
