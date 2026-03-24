# 🛍️ Footwear Store – Full Stack E-Commerce Website

A *production-ready full stack e-commerce web application* that enables users to browse products, make secure online payments, and store order data in the cloud.

This project demonstrates real-world implementation of *payment gateway integration, backend APIs, and cloud database deployment*.

---

## 🌐 Live Application

- 🖥️ Frontend: https://footwear-store-84z9.vercel.app  
- ⚙️ Backend API: https://footwear-store-13.onrender.com  

---

## ✨ Key Features

- Interactive product browsing experience  
-  Product customization (size & color selection)  
-  Secure online payments via Razorpay  
-  Dynamic order creation using backend APIs  
- Cloud database storage with MongoDB Atlas  
-  Fully responsive (mobile + desktop)  
-  Smooth animations and optimized UI  

---

## 🧠 What This Project Demonstrates

- Full stack architecture (Frontend + Backend + Database)  
- REST API integration  
- Payment gateway workflow (order → payment → database)  
- Deployment on cloud platforms  
- Environment variable security handling  

---

## 🧰 Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | HTML, CSS, JavaScript |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas |
| Payment    | Razorpay |
| Deployment | Vercel, Render |

---

## 🔄 Application Flow

```text
User → Select Product → Click Buy  
     → Backend creates order (Razorpay
 API)
      Payment popup opens  
     → Payment successful  
     → Data stored in MongoDB Atlas


Project Structure
footwear-store/
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── assets/
│
├── .gitignore
└── README.md

Environment Variables
Create a .env file inside backend:
Environment
MONGO_URI=your_mongodb_connection_string
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_secret

Local Setup
Bash
git clone https://github.com/pradeep-patel06/Footwear-Store.git
cd Footwear-Store
npm install
node server.js
📊 Sample Database Record
JSON
{
  "payment_id": "pay_xxxxxx",
  "razorpay_order_id": "order_xxxxxx",
  "amount": 11900,
  "date": "2026-03-23T05:56:07.097Z"
}

Author
Pradeep Patel
GitHub: https://github.com/pradeep-patel06⁠�
Project Repository: https://github.com/pradeep-patel06/Footwear-Store⁠�
     → Payment popup opens  
     → Payment successful  
     → Data stored in MongoDB Atlas
