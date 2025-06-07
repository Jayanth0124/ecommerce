# Aurora Mobile Hub

Welcome to **Aurora Mobile Hub**, a premium mobile phone e-commerce web application built with React and Vite. This project offers a modern, sleek, and user-friendly interface to browse, filter, and purchase the latest smartphones from top brands. It integrates Firebase for authentication and state management with Zustand, providing a seamless shopping experience.

---

## Demo

Check out the live demo here: [https://auroramobilehub.netlify.app/](https://auroramobilehub.netlify.app/)

---

## Features

- **Browse Phones:** Explore a curated collection of premium mobile devices with detailed specifications and images.
- **Advanced Filtering & Sorting:** Filter phones by brand, price, RAM, storage, battery, rating, colors, network, and discounts. Sort by popularity, price, rating, and newest arrivals.
- **Responsive Design:** Fully responsive UI optimized for desktop and mobile devices with smooth animations using Framer Motion.
- **Phone Detail Page:** View detailed information about each phone, including specs, pricing, reviews, and availability.
- **Shopping Cart & Wishlist:** Add phones to your cart or wishlist with easy management.
- **User Authentication:** Secure login and registration using Firebase Authentication with email/password and Google sign-in.
- **User Profile:** View user details and logout functionality.
- **SEO Optimized:** Enhanced SEO with meta tags, Open Graph, Twitter Cards, and structured data for better search engine visibility.
- **Dark Mode Toggle:** (Removed as per user request)
- **Smooth Navigation:** Client-side routing with React Router for fast and seamless page transitions.

---

## Technologies Used

- React 18
- Vite
- TypeScript
- Firebase Authentication
- Zustand (State Management)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Router DOM (Routing)
- Lucide React (Icons)

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/aurora-mobile-hub.git
cd aurora-mobile-hub
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure Firebase:

- Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Enable Authentication (Email/Password and Google Sign-In)
- Copy your Firebase config and update `src/firebase.ts`

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Build & Deployment

To create a production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` folder, ready for deployment on platforms like Netlify or Vercel.

---

## Deployment on Netlify

- Connect your Git repository to Netlify.
- Set the build command to `npm run build`.
- Set the publish directory to `dist`.
- Add a `_redirects` file in the `public` folder with the following content to support client-side routing:

```
/*    /index.html   200
```

---

## Folder Structure

```
src/
├── components/       # Reusable UI components
├── data/             # Static data like phone listings
├── pages/            # Page components (Home, Phones, Profile, etc.)
├── store/            # Zustand state management
├── types/            # TypeScript types
├── firebase.ts       # Firebase configuration and utilities
├── App.tsx           # Main app component with routing
└── main.tsx          # Entry point
public/
├── favicon.png       # Favicon used across the app
└── logo.png          # Logo image
```

---

## Author

**Donavalli Jayanth**  
[https://jayanth.site](https://jayanth.site)

---

## License

This project is licensed under the MIT License.

---

Thank you for exploring Aurora Mobile Hub! Feel free to contribute or raise issues.
