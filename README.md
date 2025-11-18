#  Listings Manager — Frontend Coding Exercise (Completed)

This repository contains my completed solution for the **iGnosis Tech Frontend Engineering Coding Exercise**.  
The goal was to build a fully functional Listings Manager with product listing, searching, filtering, pagination, and product detail views — all powered by a mocked API (MSW).

---

##  Features Implemented

###  Product List Page
- Paginated list of products (using server-side pagination).
- Each item displays:
  - Name  
  - Price  
  - Category  
  - Stock status  
- Sorting supported for:
  - Name  
  - Price (ascending/descending)  
- Fully responsive layout.

###  Product Details Page
- Clean, e-commerce–style product details layout.
- Displays price, category, availability, description, and metadata.
- Includes an improved **Back to Products** navigation link.
- Image section added with placeholder support.

###  Search & Filter
- Search by product name.
- Category-based filtering.
- Resets pagination on filter/search change.
- Debounced search behavior (optional improvement ready).

###  Loading, Empty & Error States
- Custom loading state  
- Error state with retry  
- Empty state when filters/search return no results  
- Fully accessible markup

###  Accessibility (A11y)
- Semantic HTML  
- Labels for all interactive controls  
- Keyboard-navigable controls (search, filter, pagination)  
- ARIA attributes where appropriate

---

##  Tech Stack

- **React + TypeScript**
- **Vite**
- **TailwindCSS** for styling
- **MSW (Mock Service Worker)** for API mocking
- **React Router v6** for routing
- **Jest + React Testing Library** (used for test examples)

---


