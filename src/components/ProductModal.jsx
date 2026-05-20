import { useState } from 'react';
import { ProductSlider } from './ProductSlider';
import { ProductLightbox } from './ProductLightbox';
import '../styling/ProductModal.css';

export const ProductModal = ({ isOpen, onClose, product, onAddToCart, triggerToast }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  if (!isOpen) return null;

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || product.images.length <= 1) return;
    
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
    
    onAddToCart(product); 
    triggerToast();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setCurrentImgIndex(0);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-window" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal-btn" onClick={handleCloseModal}>&times;</button>
          
          <div className="modal-grid">
            {/* ISOLATED IMAGE SLIDER PREVIEW */}
            <ProductSlider 
              images={product.images}
              currentIdx={currentImgIndex}
              name={product.name}
              onNext={handleNextImage}
              onPrev={handlePrevImage}
              onSelectIdx={setCurrentImgIndex}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onOpenLightbox={() => setIsLightboxOpen(true)}
            />

            {/* PRODUCT INFO PANEL */}
            <div className="modal-info-panel">
              <div className="modal-panel-wrapper">
                <div className="modal-text-content">
                  <span className="product-category">{product.category}</span>
                  <h2 className="modal-product-name">{product.name}</h2>
                  <span className="modal-product-price">${product.price.toFixed(2)}</span>
                  <p className="modal-product-description">{product.description}</p>
                </div>

                <button 
                  onClick={handleAddToCartClick} 
                  className="modal-action-button"
                  disabled={!product.isAvailable}
                >
                  {product.isAvailable ? 'Add to Cart' : 'Sold Out'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ISOLATED LIGHTBOX SYSTEM */}
      <ProductLightbox 
        isOpen={isLightboxOpen}
        images={product.images}
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