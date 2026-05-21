import './styling/Cart.css';

export const Cart = ({ cartItems = [], onUpdateQuantity, onRemoveItem, setCurrentPage }) => {
  const isCartEmpty = cartItems.length === 0;
  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="ct-page-layout animate-fade">
      <h1 className="ct-title">Your Cart</h1>

      {isCartEmpty ? (
        <div className="ct-empty-state">
          <p>Your cart is currently empty.</p>
          <button className="ct-action-button" onClick={() => setCurrentPage('shop')}>
            Return to Shop
          </button>
        </div>
      ) : (
        <div className="ct-container">
          <div className="ct-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="ct-item-row">
                <div className="ct-item-thumb-wrapper">
                  <img src={item.galleryImages[0].fit} alt={item.name} className="ct-item-thumb" />
                </div>
                
                <div className="ct-item-details">
                  <h3 className="ct-item-name">{item.name}</h3>
                  <span className="ct-item-category">{item.category}</span>
                </div>

                <div className="ct-item-right">
                  {/* Trash Can Button positioned to the left of the black box */}
                  <button 
                    className="ct-remove-btn" 
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>

                  <div className="ct-qty-controls">
                    <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>
                  
                  <span className="ct-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ct-summary-panel">
            <div className="ct-summary-row">
              <span>Total:</span>
              <span className="ct-summary-total-price">${totalCartPrice.toFixed(2)}</span>
            </div>
            <button className="ct-action-button ct-checkout-btn">
              Continue to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};