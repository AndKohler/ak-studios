import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { FAKE_PRODUCTS } from '../data'; 
import './styling/Shop.css';

export const Shop = ({ cart = [], onAddToCart }) => {
  const [products] = useState(FAKE_PRODUCTS);

  return (
    <div className="shop-container">
      <header className="shop-header">
        <p className="shop-subtitle-hero">
          Fully painted miniatures, completely finished and ready to ship out right away.
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