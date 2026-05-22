import './styling/ProductLightbox.css';

export const ProductLightbox = ({ isOpen, images, currentIdx, name, onNext, onPrev, onSelectIdx, onTouchStart, onTouchEnd, onClose }) => {
  if (!isOpen) return null;

  // Safely grab the current image URL string from the object structure
  const currentImageObj = images?.[currentIdx];
  const imageSrc = currentImageObj?.full || currentImageObj?.fit || currentImageObj;

  return (
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-window" onClick={(e) => e.stopPropagation()}>
        <div className="lb-top-bar">
          <span className="lb-title">{name} — Viewport Expand</span>
          <button className="lb-close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div 
          className="lb-content-wrapper"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt={name} 
              className="lb-image lb-clickable" 
              onClick={onClose}
            />
          )}
          
          {images.length > 1 && (
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