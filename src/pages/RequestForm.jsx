export const RequestForm = () => {
  return (
    <div className="page-layout animate-fade">
      <h1 className="page-title">Commission a Piece</h1>
      <p className="page-subtitle">Submit your model specifications for private tier-1 painting slots.</p>
      <form className="request-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Model Name / Game System</label>
          <input type="text" placeholder="e.g., Warhammer 40k Abaddon" />
        </div>
        <div className="form-group">
          <label>Desired Scheme & Details</label>
          <textarea placeholder="Describe the weathering, base type (snow, lava, mud), or specific box-art requirements..."></textarea>
        </div>
        <button type="submit" className="action-button">Submit Inquiry</button>
      </form>
    </div>
  );
};