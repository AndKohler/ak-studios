export const Gallery = () => {
  return (
    <div className="page-layout animate-fade">
      <h1 className="page-title">Previous Vault</h1>
      <p className="page-subtitle">A showcase of privately commissioned and sold masterworks.</p>
      <div className="gallery-grid">
        <div className="gallery-item">
          <img src="https://placehold.co/600x400/171622/fff?text=Sold+Masterpiece+1" alt="Past Work" />
          <div className="gallery-info">
            <h3>Archangel Dreadnought</h3>
            <p>Commissioned — 2025</p>
          </div>
        </div>
        <div className="gallery-item">
          <img src="https://placehold.co/600x400/171622/fff?text=Sold+Masterpiece+2" alt="Past Work" />
          <div className="gallery-info">
            <h3>Sith Lord Malgus</h3>
            <p>Commissioned — 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};