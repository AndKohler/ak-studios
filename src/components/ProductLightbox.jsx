import '../styling/ProductLightbox.css';

export const ProductLightbox = ({ isOpen, images, currentIdx, name, onNext, onPrev, onSelectIdx, onTouchStart, onTouchEnd, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-window" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-top-bar">
          <span className="lightbox-title">{name} — Viewport Expand</span>
          <button className="close-lightbox-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div 
          className="lightbox-content-wrapper"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <img 
            src={images[currentIdx].full} 
            alt={name} 
            className="lightbox-image clickable" 
            onClick={onClose}
          />
          
          {images.length > 1 && (
            <>
              <button className="lightbox-arrow prev" onClick={onPrev}>&#8249;</button>
              <button className="lightbox-arrow next" onClick={onNext}>&#8250;</button>
              
              <div className="lightbox-dots">
                {images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`lightbox-dot ${idx === currentIdx ? 'active' : ''}`}
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