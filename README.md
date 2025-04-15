

# 🛍️ FashionFits - E-commerce Web App

**Live Demo:** [fashion-fits.vercel.app](https://fashion-fits-ten.vercel.app/)

FashionFits is a modern, responsive fashion e-commerce web application built using **React** and **Vite**, designed to deliver a seamless shopping experience with Firebase Authentication and dynamic product browsing features.

---

## ✨ Features

- 🔐 **Firebase Authentication**  
  Sign up and log in with secure Firebase auth (email & password).

- 👗 **Product Listings & Details**  
  Browse a curated collection of fashion products with detailed pages and image zoom functionality.

- 🛒 **Cart & Checkout System**  
  Add to cart, update quantities, and proceed through a multi-step checkout flow with shipping and payment forms.

- 👤 **User Dashboard**  
  View order history, wishlist, manage saved payment methods, and edit profile settings.

- 📱 **Responsive Design**  
  Fully responsive across desktops, tablets, and mobile devices.

- 🛠️ **Tech Stack**  
  - **React** for building UI components  
  - **Vite** for blazing-fast build and development  
  - **React Router** for client-side routing  
  - **Firebase** for authentication  
  - **React Icons** for UI elements

---

## 📂 Project Structure

```
fashion-fits/
├── public/
├── src/
│   ├── assets/              # Images, logos, etc.
│   ├── components/          # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   ├── pages/               # Page-level components (Home, Login, Signup, Dashboard, etc.)
│   ├── data/                # Static product data (products.js)
│   ├── firebase.js          # Firebase config and initialization
│   ├── App.jsx              # Root component with route definitions
│   └── main.jsx             # App entry point
├── package.json
└── vite.config.js
```

---

## 🛡️ Security & Maintenance

- Resolved all `npm audit` vulnerabilities by upgrading **vite** to `v6.2.6` using `npm audit fix --force`.
- Regular dependency checks and updates are recommended to maintain security.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/fashion-fits.git
cd fashion-fits
npm install
npm run dev
```

---

## 🔐 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Email/Password** authentication.
3. Copy your Firebase config and paste it into `src/firebase.js`.

```js
// Example
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  ...
};
```

---


## 📦 Deployment

Deployed on **Vercel**  
🔗 [https://fashion-fits-ten.vercel.app/](https://fashion-fits-ten.vercel.app/)



---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

