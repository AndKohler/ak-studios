import { useState } from 'react';
import { ProductModal } from './ProductModal';
import '../styling/ProductCard.css';

export const ProductCard = ({ product, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = () => {
    setToastMessage(`Added ${product.name} to cart.`);
    setTimeout(() => setToastMessage(""), 5000); 
  };

  const handleModalAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <>
      <div className={`card ${!product.isAvailable ? 'sold-out' : ''}`} onClick={() => setIsModalOpen(true)}>
        <div className="image-wrapper">
          {/* Updated to use cardImage */}
          <img src={product.cardImage} alt={product.name} className="card-image" />
          {!product.isAvailable && <span className="sold-badge">Sold Out</span>}
        </div>

        <div className="card-content-simple">
          <h3 className="product-name-simple">{product.name}</h3>
          <span className="product-price-simple">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
        onAddToCart={handleModalAddToCart}
        triggerToast={triggerToast}
      />

      {toastMessage && (
        <div className="global-toast-container">
          <div className="toast-popup-banner">
            <span className="toast-indicator-dot"></span>
            <p className="toast-text-body">{toastMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};