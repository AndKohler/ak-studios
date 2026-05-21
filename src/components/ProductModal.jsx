import { useState, useEffect } from 'react';
import { ProductSlider } from './ProductSlider';
import { ProductLightbox } from './ProductLightbox';
import './styling/ProductModal.css';

export const ProductModal = ({ isOpen, onClose, product, cartQuantity = 0, onAddToCart, triggerToast }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQty(cartQuantity > 0 ? cartQuantity : 1);
    }
  }, [isOpen, cartQuantity]);

  if (!isOpen) return null;

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % product.galleryImages.length);
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + product.galleryImages.length) % product.galleryImages.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || product.galleryImages.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const swipeThreshold = 50;
    if (diffX > swipeThreshold) {
      handleNextImage();
    } else if (diffX < -swipeThreshold) {
      handlePrevImage();
    }
    setTouchStartX(null);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (!product.isAvailable) return;
    
    const qtyToAdd = qty - cartQuantity;
    if (qtyToAdd !== 0 || cartQuantity === 0) {
      onAddToCart({ ...product, quantity: qtyToAdd }); 
    }
    
    triggerToast();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setCurrentImgIndex(0);
    onClose();
  };

  return (
    <>
      <div className="pm-overlay" onClick={handleCloseModal}>
        <div className="pm-window" onClick={(e) => e.stopPropagation()}>
          <button className="pm-close-btn" onClick={handleCloseModal}>&times;</button>
          
          <div className="pm-grid">
            <ProductSlider 
              images={product.galleryImages}
              currentIdx={currentImgIndex}
              name={product.name}
              onNext={handleNextImage}
              onPrev={handlePrevImage}
              onSelectIdx={setCurrentImgIndex}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onOpenLightbox={() => setIsLightboxOpen(true)}
            />

            <div className="pm-info-panel">
              <div className="pm-panel-wrapper">
                <div className="pm-text-content">
                  <span className="pm-category">{product.category}</span>
                  <h2 className="pm-product-name">{product.name}</h2>
                  <span className="pm-product-price">${product.price.toFixed(2)}</span>
                  <p className="pm-product-description">{product.description}</p>
                </div>

                <div className="pm-actions">
                  <div className="ct-qty-controls">
                    <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCartClick} 
                    className="pm-action-button"
                    disabled={!product.isAvailable}
                  >
                    {product.isAvailable ? (cartQuantity > 0 ? 'Update Cart' : 'Add to Cart') : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductLightbox 
        isOpen={isLightboxOpen}
        images={product.galleryImages}
        currentIdx={currentImgIndex}
        name={product.name}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        onSelectIdx={setCurrentImgIndex}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
};