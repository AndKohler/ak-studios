import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { FAKE_PRODUCTS } from '../data'; 
import './styling/Shop.css';

export const Shop = ({ cart = [], onAddToCart }) => {
  const [products] = useState(FAKE_PRODUCTS);

  return (
    <div className="shop-container">
      <div className="demo-banner">
        <span className="status-dot-wrapper">
          <span className="status-dot-ping"></span>
          <span className="status-dot-core"></span>
        </span>
        <span className="demo-text">Demo Site only.</span>
      </div>

      <header className="shop-header">
        <h1 className="shop-title-hero">
          Fully painted miniatures & scale models. 
        </h1>
        <p className="shop-subtitle-hero">
          Completely finished and ready to ship out right away.
        </p>
      </header>

      <main className="shop-grid">
        {products.map(product => {
          const cartItem = cart.find(item => item.id === product.id);
          const cartQuantity = cartItem ? cartItem.quantity : 0;

          return (
            <ProductCard 
              key={product.id} 
              product={product} 
              cartQuantity={cartQuantity}
              onAddToCart={onAddToCart} 
            />
          );
        })}
      </main>
    </div>
  );
};