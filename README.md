# CodeAlpha_EcommerceStore 🛒

**CodeAlpha Full Stack Development Internship — Task 1: Simple E-commerce Store**

A complete e-commerce web application with product listings, product detail pages,
a shopping cart, checkout/order processing, and user authentication.

## ✨ Features

- **Product listings** with search and category filtering
- **Product details page** with stock info and quantity selection
- **Shopping cart** (persisted in the browser via `localStorage`)
- **Order processing** — checkout with shipping address, server-side re-pricing,
  stock validation, and stock deduction
- **User registration & login** using JWT authentication (passwords hashed with bcrypt)
- **My Orders** page with a simulated "Pay Now" flow
- **Admin-protected** product create/update/delete API endpoints
- **Database** (MongoDB) for products, users, and orders

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT + bcryptjs

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
# copy the example env and edit if needed
cp .env.example .env      # (Windows: copy .env.example .env)
```

> **No MongoDB installed?** No problem. If the app can't reach `MONGODB_URI`,
> it automatically starts an **in-memory MongoDB** so it runs with zero setup.
> (Data resets when the server stops — use a real MongoDB/Atlas URI to persist.)

### 3. Seed sample data (recommended)
```bash
npm run seed
```
This creates 8 sample products and two demo accounts:

| Role     | Email           | Password |
|----------|-----------------|----------|
| Admin    | admin@shop.com  | admin123 |
| Customer | user@shop.com   | user123  |

### 4. Run the server
```bash
npm start        # or: npm run dev  (auto-reload with nodemon)
```

Open **http://localhost:5000** in your browser.

## 📡 API Endpoints

### Auth
| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login, returns a token |
| GET    | `/api/auth/me`       | Current user (auth)    |

### Products
| Method | Endpoint                   | Description                 |
|--------|----------------------------|-----------------------------|
| GET    | `/api/products`            | List (`?search=&category=`) |
| GET    | `/api/products/categories` | Distinct categories         |
| GET    | `/api/products/:id`        | Product details             |
| POST   | `/api/products`            | Create (admin)              |
| PUT    | `/api/products/:id`        | Update (admin)              |
| DELETE | `/api/products/:id`        | Delete (admin)              |

### Orders
| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| POST   | `/api/orders`         | Place an order (auth)     |
| GET    | `/api/orders/mine`    | Current user's orders     |
| GET    | `/api/orders/:id`     | Single order (owner)      |
| PUT    | `/api/orders/:id/pay` | Mark as paid (auth)       |

## 📁 Project Structure

```
CodeAlpha_EcommerceStore/
├── config/db.js          # MongoDB connection (+ in-memory fallback)
├── middleware/auth.js    # JWT auth + admin guard
├── models/               # User, Product, Order schemas
├── routes/               # auth, products, orders APIs
├── public/               # Frontend (HTML/CSS/JS)
├── seed.js               # Sample data seeder
└── server.js             # App entry point
```

## 📝 Notes

Built as part of the **CodeAlpha** Full Stack Development internship.
