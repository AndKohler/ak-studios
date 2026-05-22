import { useState, useEffect } from 'react';
import './styling/ProductLightbox.css';

export const ProductLightbox = ({ isOpen, images, currentIdx, name, onNext, onPrev, onSelectIdx, onTouchStart, onTouchEnd, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setInitialDistance(null);
    }
  }, [isOpen, currentIdx]);

  if (!isOpen) return null;

  const currentImageObj = images?.[currentIdx];
  const imageSrc = currentImageObj?.full || currentImageObj?.fit || currentImageObj;

  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleCustomTouchStart = (e) => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e.touches));
    } else if (e.touches.length === 1 && scale > 1) {
      setStartTouch({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
    if (onTouchStart) onTouchStart(e);
  };

  const handleCustomTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistance !== null) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches);
      const newScale = Math.max(1, Math.min(3, (currentDistance / initialDistance) * scale));
      setScale(newScale);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && scale > 1) {
      e.preventDefault();
      const newX = e.touches[0].clientX - startTouch.x;
      const newY = e.touches[0].clientY - startTouch.y;
      
      const maxDragX = (scale - 1) * 150;
      const maxDragY = (scale - 1) * 150;
      
      setPosition({
        x: Math.max(-maxDragX, Math.min(maxDragX, newX)),
        y: Math.max(-maxDragY, Math.min(maxDragY, newY))
      });
    }
  };

  const handleCustomTouchEnd = (e) => {
    if (e.touches.length < 2) {
      setInitialDistance(null);
    }
    if (scale === 1 && onTouchEnd) {
      onTouchEnd(e);
    }
  };

  return (
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-window" onClick={(e) => e.stopPropagation()}>
        <div className="lb-top-bar">
          <span className="lb-title">{name} — Viewport Expand</span>
          <button className="lb-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div 
          className="lb-content-wrapper"
          onTouchStart={handleCustomTouchStart}
          onTouchMove={handleCustomTouchMove}
          onTouchEnd={handleCustomTouchEnd}
          style={{ overflow: 'hidden', position: 'relative' }}
        >
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt={name} 
              className="lb-image" 
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: initialDistance ? 'none' : 'transform 0.1s ease-out',
                touchAction: 'none',
                maxHeight: '75vh',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
          )}
          
          {images.length > 1 && scale === 1 && (
            <>
              <button className="lb-arrow lb-prev" onClick={onPrev}>&#8249;</button>
              <button className="lb-arrow lb-next" onClick={onNext}>&#8250;</button>
              
              <div className="lb-dots">
                {images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`lb-dot ${idx === currentIdx ? 'lb-active' : ''}`}
                    onClick={() => onSelectIdx(idx)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};