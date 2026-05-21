import './styling/ProductSlider.css';

export const ProductSlider = ({ images, currentIdx, name, onNext, onPrev, onSelectIdx, onTouchStart, onTouchEnd, onOpenLightbox }) => {
  return (
    <div 
      className="ps-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img 
        src={images[currentIdx].fit} 
        alt={name} 
        className="ps-image ps-clickable" 
        onClick={onOpenLightbox}
      />
      
      {images.length > 1 && (
        <>
          <button className="ps-arrow ps-prev" onClick={onPrev}>&#8249;</button>
          <button className="ps-arrow ps-next" onClick={onNext}>&#8250;</button>
          
          <div className="ps-dots">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`ps-dot ${idx === currentIdx ? 'ps-active' : ''}`}
                onClick={() => onSelectIdx(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};