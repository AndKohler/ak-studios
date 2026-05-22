import { useState } from 'react';
import { ProductModal } from './ProductModal';
import './styling/ProductCard.css';

export const ProductCard = ({ product, cartQuantity, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = () => {
    setToastMessage(`Added ${product.name} to cart.`);
    setTimeout(() => setToastMessage(""), 5000); 
  };

  const handleModalAddToCart = (productWithQty) => {
    onAddToCart(productWithQty);
  };

  return (
    <>
      <div className={`pc-card ${!product.isAvailable ? 'pc-sold-out' : ''}`} onClick={() => setIsModalOpen(true)}>
        <div className="pc-image-wrapper">
          <img src={product.cardImage} alt={product.name} className="pc-card-image" />
          {!product.isAvailable && <span className="pc-sold-badge">Sold Out</span>}
        </div>

        <div className="pc-content-simple">
          <div className="pc-title-block">
            <span className="pc-product-category">{product.category}</span>
            <h3 className="pc-product-name-simple">{product.name}</h3>
          </div>
          <span className="pc-product-price-simple">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
        cartQuantity={cartQuantity}
        onAddToCart={handleModalAddToCart}
        triggerToast={triggerToast}
      />

      {toastMessage && (
        <div className="pc-toast-container">
          <div className="pc-toast-popup-banner">
            <span className="pc-toast-indicator-dot"></span>
            <p className="pc-toast-text-body">{toastMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};