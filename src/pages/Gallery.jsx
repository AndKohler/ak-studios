import { galleryItems } from '../galleryData';
import './styling/Gallery.css';

export const Gallery = () => {
  return (
    <div className="gal-page-layout animate-fade">
      <div className="gal-header">
        <h1 className="gal-title">My Projects</h1>
        <p className="gal-subtitle">A collection of completed work.</p>
      </div>
      
      <div className="gal-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className="gal-item">
            <img src={item.image} alt={item.name} />
            <div className="gal-info">
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};