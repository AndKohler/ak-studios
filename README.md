# AK Studios - Frontend Demo Application

Welcome to the frontend repository for **AK Studios**, a demonstration storefront application built with React and Vite. This version of the repository is configured to use mock/fake data for preview and easy hosting purposes.

## 🔗 Project Links
* **Live Frontend Demo:** [ak-studios.vercel.app](https://ak-studios.vercel.app/) *(Live preview using fake data)*
* **Full Microservices Repository:** [github.com/AndKohler/ak-studios-demo](https://github.com/AndKohler/ak-studios-demo/tree/main) *(The complete version featuring the 3 ASP.NET Core backends)*

---

## 🏗️ Project Structure

This repository focuses strictly on the client-side presentation layers of the application:

```text
AK-MINIATURES-STORE/
├── frontend/			# React (Vite) Frontend Application
    ├── src/
    │   ├── components/		# Reusable UI parts (Navbar, ProductCard, Modals, Sliders)
    │   │   └── styling/	# CSS styles for the specific components
    │   ├── pages/		# Main views (Cart, Checkout, Gallery, Shop, RequestForm)
    │   │   └── styling/	# CSS styles for the specific pages
    │   ├── App.jsx		# Main application router and root layout
    │   ├── data.js		# Mock data script for local shop items
    │   ├── galleryData.js	# Mock data script for local gallery pictures
    │   ├── index.css		# Global base styles
    │   └── main.jsx		# Application entry point
    └── public/			# Static assets and images
