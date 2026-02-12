# 🌿 ScrapCo Frontend

A modern, full-featured web application for scrap material trading and management. ScrapCo provides a comprehensive platform for dealers to buy, sell, and manage scrap materials with an intuitive user interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Features Documentation](#key-features-documentation)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

ScrapCo Frontend is a React-based single-page application (SPA) designed to facilitate the buying and selling of scrap materials. The platform provides features for dealers to browse available scrap materials, manage their cart, place orders, and track their transactions. Built with modern web technologies, it offers a responsive, fast, and user-friendly experience.

## ✨ Features

### Core Features
- 🔐 **User Authentication**: Secure login and registration system with protected routes
- 🛒 **Shopping Cart**: Add, remove, and manage scrap materials in cart with quantity tracking
- 📦 **Product Catalog**: Browse and search scrap materials with detailed information
- 💳 **Checkout System**: Complete checkout process with address and payment details
- 📋 **Order Management**: View and track order history
- 🏪 **Shop Interface**: Dedicated shop page for browsing available materials
- 📍 **Location Services**: Integration with Leaflet for map-based features
- 🎨 **Interactive UI**: Beautiful animations and 3D elements using Spline

### User Experience
- ⚡ **Fast Loading**: Optimized with Vite for rapid development and build times
- 📱 **Responsive Design**: Fully responsive layout using Tailwind CSS and DaisyUI
- 🎭 **Loading States**: Smooth loading transitions and user feedback
- 🔔 **Notifications**: Sweet alerts for user actions and confirmations
- 🎨 **Modern UI Components**: Beautiful components with Lucide React icons

### Developer Features
- 🔄 **State Management**: Redux Toolkit for predictable state management
- 🌐 **API Integration**: Axios for HTTP requests and Supabase for backend services
- 🛣️ **Routing**: React Router DOM for seamless navigation
- 📊 **Data Visualization**: Chart.js integration for analytics
- 🎯 **Form Handling**: React Hook Form for efficient form management

## 🛠️ Technology Stack

### Frontend Framework
- **React** (v18.2.0) - UI library for building component-based interfaces
- **Vite** (v5.0.10) - Next-generation frontend build tool
- **React Router DOM** (v6.29.0) - Client-side routing

### State Management
- **Redux Toolkit** (v2.6.0) - State management with Redux best practices
- **React Redux** (v9.0.4) - Official React bindings for Redux

### Styling & UI
- **Tailwind CSS** (v3.3.6) - Utility-first CSS framework
- **DaisyUI** (v4.4.19) - Tailwind CSS component library
- **Lucide React** (v0.294.0) - Beautiful, consistent icons
- **React Icons** (v4.12.0) - Icon library

### Forms & Validation
- **React Hook Form** (v7.54.2) - Performant form validation library

### Backend & Database
- **Supabase** (v2.49.1) - Backend-as-a-Service platform
- **Axios** (v1.6.2) - Promise-based HTTP client

### Additional Libraries
- **Leaflet** (v1.9.4) - Interactive maps
- **Leaflet Routing Machine** (v3.2.12) - Routing and directions
- **Chart.js** (v5.3.0 via react-chartjs-2) - Data visualization
- **SweetAlert2** (v11.17.2) - Beautiful, customizable alerts
- **Swiper** (v11.2.4) - Modern mobile touch slider
- **Spline** (v4.0.0) - 3D design tool integration
- **Firebase** (v10.7.0) - Google's app development platform

### Development Tools
- **ESLint** (v8.55.0) - JavaScript linter
- **PostCSS** (v8.5.3) - CSS transformation tool
- **Autoprefixer** (v10.4.20) - PostCSS plugin to parse CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jjf2009/ScrapCo_Frontend.git
   cd ScrapCo_Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your configuration:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🔐 Environment Variables

The application requires the following environment variables to be set in your `.env` file:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public API key | Yes |

**Note**: Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it.

## 📜 Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server with hot module replacement (HMR).
- Opens on `http://localhost:5173`
- Changes are reflected instantly

### `npm run build`
Builds the application for production.
- Creates optimized bundle in `dist` folder
- Minifies and optimizes all assets
- Ready for deployment

### `npm run preview`
Locally previews the production build.
- Serves the `dist` folder
- Test production build before deployment

### `npm run lint`
Runs ESLint to check code quality.
- Identifies code issues
- Enforces coding standards
- Helps maintain code quality

## 📁 Project Structure

```
ScrapCo_Frontend/
├── public/                     # Static assets
├── src/
│   ├── assets/                # Images, fonts, and other assets
│   ├── components/            # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   └── Register.jsx
│   ├── context/               # React Context providers
│   │   └── AuthContext.jsx   # Authentication context
│   ├── pages/                 # Page components
│   │   ├── AddItem/          # Add scrap item pages
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── EditItem/
│   │   │   ├── manageItems/
│   │   │   └── users/
│   │   ├── home/             # Home page components
│   │   │   ├── Banner.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Recommened.jsx
│   │   ├── scrapitem/        # Scrap item related pages
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrderPage.jsx
│   │   │   └── SingleScrapMaterial.jsx
│   │   └── shop/             # Shop pages
│   │       ├── Banner.jsx
│   │       ├── Recommened.jsx
│   │       └── Shop.jsx
│   ├── redux/                 # Redux state management
│   │   ├── features/         # Redux slices
│   │   │   ├── cart/
│   │   │   ├── dealer/
│   │   │   ├── items/
│   │   │   ├── orders/
│   │   │   ├── points/
│   │   │   └── shop/
│   │   └── store.js          # Redux store configuration
│   ├── routers/              # Routing configuration
│   │   ├── PrivateRoute.jsx  # Protected route wrapper
│   │   └── router.jsx        # Main router configuration
│   ├── utils/                # Utility functions
│   ├── App.css               # Global styles
│   ├── App.jsx               # Root component
│   ├── index.css             # Tailwind directives
│   ├── main.jsx              # Application entry point
│   └── supabaseClient.js     # Supabase client configuration
├── images/                    # Product and scrap images
│   └── scrap/
├── .env                       # Environment variables (not in git)
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🎨 Key Features Documentation

### Authentication System
The application uses a context-based authentication system:
- **AuthContext**: Manages user authentication state
- **PrivateRoute**: Protects routes that require authentication
- User data is stored in localStorage for persistence

### Shopping Cart
- **Add to Cart**: Add scrap materials with quantity
- **Update Quantity**: Modify item quantities in cart
- **Remove Items**: Remove individual items or clear entire cart
- **Price Calculation**: Automatic total price calculation based on quantity

### Routing Structure
The application uses the following route structure:
- `/` - Home page with featured scrap materials
- `/shop` - Browse all available scrap materials
- `/scrap/:id` - Individual scrap material details
- `/cart` - Shopping cart (protected)
- `/checkout` - Checkout process (protected)
- `/orders` - Order history (protected)
- `/login` - User login
- `/register` - User registration
- `/create` - Add new scrap item

### State Management with Redux
The application uses Redux Toolkit for state management with the following slices:
- **cart**: Shopping cart state and actions
- **dealer**: Dealer information and authentication
- **items**: Scrap items catalog
- **orders**: Order management
- **points**: Points/rewards system
- **shop**: Shop-related state

## 🔒 Authentication

The application implements a dual authentication strategy:

1. **Local Authentication**: Using React Context API
   - Stores user session in localStorage
   - Provides sign-in and sign-out functionality
   
2. **Supabase Authentication**: Backend authentication
   - Integrated with Supabase for secure authentication
   - Dealer management through API

Protected routes require authentication to access cart, checkout, and order pages.

## 🎯 State Management

Redux Toolkit is used for global state management:

```javascript
// Example: Adding item to cart
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/features/cart/cartSlice';

const dispatch = useDispatch();
dispatch(addToCart(item));
```

The store is configured in `src/redux/store.js` and includes:
- RTK Query for API calls
- Middleware for async operations
- DevTools integration for debugging

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Coding Standards
- Follow the existing code style
- Use ESLint for code linting
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ using React, Vite, and modern web technologies**
