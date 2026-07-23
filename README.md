# CodeAlpha_EcommerceStore 🛒

**CodeAlpha Full Stack Development Internship — Task 1: Simple E-commerce Store**

A complete e-commerce web app with product listings, product details, shopping cart,
order processing, and user authentication.

## 📁 Project structure

```
CodeAlpha_EcommerceStore/
├── frontend/          # HTML, CSS, JavaScript (UI)
│   ├── index.html
│   ├── product.html
│   ├── cart.html
│   ├── orders.html
│   ├── login.html
│   ├── register.html
│   ├── css/
│   └── js/
├── backend/           # Node.js + Express.js + MongoDB (API)
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── README.md
```

## 🧰 Tech stack

| Layer    | Technologies                                      |
|----------|---------------------------------------------------|
| Frontend | HTML, CSS, JavaScript                             |
| Backend  | Node.js, Express.js                               |
| Database | MongoDB (via Mongoose)                            |
| Auth     | JWT + bcryptjs                                    |

## ✨ Features

- Product listings with search & category filter
- Product details page
- Shopping cart (`localStorage`)
- Order processing (shipping address, stock checks, payment simulation)
- User registration / login
- Database for products, users, and orders

## 🚀 How to run

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
A `.env` file should already exist in `backend/`. If not:
```bash
copy .env.example .env
```

Default:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/codealpha_ecommerce
JWT_SECRET=super_secret_change_me
```

> If local MongoDB is not running, the server falls back to an in-memory database
> and auto-seeds demo data.

### 3. Start the server
```bash
cd backend
npm start
```

Open **http://localhost:5000** — the backend serves the `frontend/` folder automatically.

### Demo accounts (auto-created on first run)
| Role     | Email           | Password |
|----------|-----------------|----------|
| Admin    | admin@shop.com  | admin123 |
| Customer | user@shop.com   | user123  |

Optional full reset (needs a real MongoDB):
```bash
cd backend
npm run seed
```

## 📡 API endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me`

### Products
- `GET    /api/products`
- `GET    /api/products/categories`
- `GET    /api/products/:id`
- `POST   /api/products` (admin)
- `PUT    /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Orders
- `POST /api/orders`
- `GET  /api/orders/mine`
- `GET  /api/orders/:id`
- `PUT  /api/orders/:id/pay`

## 📝 Notes

Built for the **CodeAlpha** Full Stack Development internship.
