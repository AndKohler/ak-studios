import '../styling/Cart.css';

export const Cart = ({ cartItems = [], onRemoveFromCart, setCurrentPage }) => {
  const isCartEmpty = cartItems.length === 0;

  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-layout animate-fade">
      <h1 className="page-title">Your Cart</h1>

      {isCartEmpty ? (
        <div className="cart-empty-state">
          <p>Your cart is currently empty.</p>
          <button className="action-button" onClick={() => setCurrentPage('shop')}>
            Return to Shop
          </button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item-row">
                <div className="cart-item-thumb-wrapper">
                  <img src={item.images[0]} alt={item.name} className="cart-item-thumb" />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <span className="cart-item-category">{item.category}</span>
                </div>

                <div className="cart-item-right">
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  <button 
                    className="cart-remove-btn" 
                    onClick={() => onRemoveFromCart(index)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-panel">
            <div className="summary-row">
              <span>Total:</span>
              <span className="summary-total-price">${totalCartPrice.toFixed(2)}</span>
            </div>
            <button className="action-button checkout-btn">
              Continue to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};