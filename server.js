require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { seedIfEmpty } = require('./config/bootstrap');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve the static frontend (public/)
app.use(express.static(path.join(__dirname, 'public')));

// Fallback: send index.html for any non-API route (simple SPA-ish behavior)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedIfEmpty(); // ensures demo products + logins exist (esp. for in-memory DB)
  app.listen(PORT, () => {
    console.log(`\n🛒 E-commerce server running: http://localhost:${PORT}\n`);
  });
});
