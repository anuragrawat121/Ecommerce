# Ecommerce Project Documentation

Welcome to the documentation for the **Luxury Ecommerce** project. This document provides a detailed overview of the project's architecture, code flow, and important implementation details.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State Management**: [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [React Spring](https://www.react-spring.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
src/
├── assets/           # Static assets (images, icons) and the product database (assets.js)
├── components/       # Reusable UI components
│   ├── UI/           # Low-level UI components (BlurText, Searchbar)
│   ├── Utils/        # Utility components/hooks
│   ├── Hero.jsx      # Immersive hero section
│   ├── Navbar.jsx    # Responsive navigation with scroll logic
│   ├── ProductCard.jsx # Card for product display
│   └── VideoBackground.jsx # Premium background effect
├── ContextApi/       # State management (ProductContext)
├── pages/            # Application views (Home, Collection, Product, etc.)
├── App.jsx           # Root component and routing configuration
└── main.jsx          # Entry point and context providers
```

---

## 🔄 Code Flow Overview

### 1. Initialization (`main.jsx`)
The application is bootstrapped in `main.jsx`.
- The `ProductContextProvider` wraps the entire application to provide global access to product data and search state.
- `BrowserRouter` is used to enable client-side routing.
- The `App` component is rendered inside these providers.

### 2. Routing (`App.jsx`)
Routing is managed using `react-router-dom`.
- **Dynamic Routes**: `/product/:productId` allows the application to render specific product details based on the ID.
- **Catch-all**: Any undefined route redirects to the home page (`/`).

### 3. Home Page Lifecycle (`Home.jsx`)
The `Home.jsx` page is designed as a **Single Page Application (SPA) container**:
- It imports and renders multiple sections (`Collection`, `About`, `Contact`) on a single page.
- It uses `VideoBackground` to create an immersive feel for the `Hero` and `Navbar`.
- Section IDs (e.g., `home-section`, `collection-section`) are used for smooth scrolling.

---

## 💡 Important Code & Logic

### 🌐 Global State (`ProductContext.jsx`)
The `ProductContext` manages the following state globally:
- `products`: The complete list of products from `assets.js`.
- `search`: The current search query string.
- `showSearch`: A boolean to toggle the search bar visibility.

### 🔍 Product Filtering & Sorting (`Collection.jsx`)
The `Collection` page contains the most complex logic for data manipulation:
- **`useMemo` for Performance**: Products are filtered and sorted inside a `useMemo` hook to avoid unnecessary recalculations during re-renders.
- **Filtering**: Supports category filtering, price range filtering ($0 - $2000), and real-time global search.
- **Sorting**: Provides options for "Featured", "Price: Low to High", "Price: High to Low", and "Highest Rated".

### ⚓ Smooth Scrolling Logic (`Navbar.jsx`)
The `Navbar` includes a robust `scrollToSection` helper:
```javascript
const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  if (location.pathname !== "/") {
    // If not on home page, navigate to home then scroll
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    // If already on home page, just scroll
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }
};
```
This ensures that users can jump to specific sections from any page in the app.

### 🖼️ Dynamic Product Details (`Product.jsx`)
When a user visits `/product/:productId`:
- `useParams` extracts the `productId`.
- An `useEffect` finds the matching product from the global context.
- The page features a premium **Image Gallery** where users can click thumbnails to swap the main image.
- It also uses **Framer Motion's `AnimatePresence`** for smooth transitions between "Description" and "Reviews" tabs.

---

## 🎨 Design Philosophy

The project prioritizes a **Premium & Luxury** feel:
- **Dark Mode**: A deep black background (`bg-black`) with high-contrast white text.
- **Typography**: Bold, black, and uppercase headings with tracking-tighter effects.
- **Micro-interactions**: Subtle hover effects on cards, animated sort dropdowns, and pulsing indicators for "Premium Pieces" count.
- **Responsive Design**: Custom grid layouts that adapt from mobile (1 col) to ultra-wide (5 cols).

---

## 🛠️ Key Components Highlights

- **`BlurText`**: A custom UI component using `framer-motion` to reveal text with a blur-to-focus animation.
- **`VideoBackground`**: Uses a high-quality video loop to elevate the brand image in the hero section.
- **`ProductCard`**: Features an overlay "View Details" button and smooth image transitions.
