import '../styling/ProductSlider.css';

export const ProductSlider = ({ images, currentIdx, name, onNext, onPrev, onSelectIdx, onTouchStart, onTouchEnd, onOpenLightbox }) => {
  return (
    <div 
      className="slider-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img 
        src={images[currentIdx].fit} 
        alt={name} 
        className="slider-image clickable" 
        onClick={onOpenLightbox}
      />
      
      {images.length > 1 && (
        <>
          <button className="slider-arrow prev" onClick={onPrev}>&#8249;</button>
          <button className="slider-arrow next" onClick={onNext}>&#8250;</button>
          
          <div className="slider-dots">
            {images.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIdx ? 'active' : ''}`}
                onClick={() => onSelectIdx(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};