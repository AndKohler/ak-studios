import './styling/RequestForm.css';

export const RequestForm = () => {
  return (
    <div className="rf-page-layout animate-fade">
      <div className="rf-header">
        <h1 className="rf-title">COMMISSION A PIECE</h1>
        <p className="rf-subtitle">Submit your model specifications for private tier-1 painting slots.</p>
      </div>
      
      <div className="rf-form-container">
        <form className="rf-form" onSubmit={(e) => e.preventDefault()}>
          <div className="rf-group">
            <label>MODEL NAME / GAME SYSTEM</label>
            <input type="text" placeholder="e.g., Warhammer 40k Abaddon" />
          </div>
          <div className="rf-group">
            <label>DESIRED SCHEME & DETAILS</label>
            <textarea placeholder="Describe the weathering, base type (snow, lava, mud), or specific box-art requirements..."></textarea>
          </div>
          <button type="submit" className="rf-action-button">SUBMIT INQUIRY</button>
        </form>
      </div>
    </div>
  );
};