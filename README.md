# Footwear Store – Full Stack E-Commerce Website

A **production-ready full stack e-commerce application** that allows users to browse products, make secure online payments, manage orders, and for admins to control the store operations.  

This project demonstrates **real-world e-commerce functionalities**, including payment integration, authentication & authorization, cloud database usage, and admin dashboard management.

---

## 🌐 Live Application

- **Backend API:**  https://footwear-store-14.onrender.com
- **frontend**      https://footwear-store-v3zd.vercel.app

---

## ✨ Key Features

### User Features
- **User Authentication & Authorization** – Secure login/signup using JWT  
- **Product Browsing & Customization** – Choose size, color, quantity  
- **Cart System** – Add, remove, or update products  
- **Secure Payments** – Razorpay integration for online payments  
- **Order Management** – View order history, cancel orders, request refunds  
- **Cloud Storage** – User orders and payment info stored in MongoDB Atlas  
  
### Admin Features
- **Admin Panel** – Manage products, users, and orders  
- **Order Operations** – Cancel orders, mark as shipped, process refunds  
- **Analytics Overview** – See total orders, revenue, and status of payments  

---

## 🧠 What This Project Demonstrates
- Full stack architecture: **Frontend + Backend + Database**  
- **REST APIs** for product, cart, order, and payment handling  
- Payment workflow: **Order → Payment → Database**  
- Role-based access control: **Admin vs User**  
- Cloud deployment  backend on **Render** and frontend on vercel 
- Secure management of **environment variables**

---

## 🧰 Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | HTML, CSS, JavaScript         |
| Backend    | Node.js, Express.js           |
| Database   | MongoDB Atlas                 |
| Payment    | Razorpay                      |
| Deployment |  Render ,   vercel            |

---

## 🔄 Application Flow
User → Browse Products → Add to Cart → Buy Now
→ Backend Creates Razorpay Order
→ Payment Popup Opens
→ Payment Successful
→ Order + Payment Data Stored in MongoDB Atlas
→ Admin Can View / Cancel / Ship / Refund


---

## Project Structure
footwear-store/
│
├── backend/
│ ├── server.js
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ ├── app.js
│ └── assets/
│
├── .gitignore
└── README.md


---

## Environment Variables
Create a `.env` file inside `backend/`:
MONGO_URI=your_mongodb_connection_string
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret

Author

Pradeep Patel

GitHub: https://github.com/pradeep-patel06




