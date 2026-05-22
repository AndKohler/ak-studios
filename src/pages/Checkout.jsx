import { useState } from 'react';
import './styling/Checkout.css';

export const Checkout = ({ cartItems = [], totalCartPrice, onClearCart, setCurrentPage }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field, val) => {
    if (field === 'postalCode') {
      val = val.replace(/\D/g, '');
    }

    setFormData(prev => ({ ...prev, [field]: val }));
    
    if (field === 'email' && val.includes('@')) {
      setErrors(prev => ({ ...prev, email: '' }));
    } else if (field === 'postalCode' && val.trim().length >= 3) {
      setErrors(prev => ({ ...prev, postalCode: '' }));
    } else if (field !== 'email' && field !== 'postalCode' && val.trim().length >= 2) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let currentErrors = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: ''
    };
    let isValid = true;

    if (formData.firstName.trim().length < 2) {
      currentErrors.firstName = 'First name must be at least 2 characters.';
      isValid = false;
    }

    if (formData.lastName.trim().length < 2) {
      currentErrors.lastName = 'Last name must be at least 2 characters.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      currentErrors.email = 'Email address is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      currentErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (formData.address.trim().length < 5) {
      currentErrors.address = 'Please provide a valid street address.';
      isValid = false;
    }

    if (formData.city.trim().length < 2) {
      currentErrors.city = 'City name is required.';
      isValid = false;
    }

    if (formData.postalCode.trim().length < 3) {
      currentErrors.postalCode = 'Please enter a valid numeric postal code.';
      isValid = false;
    }

    if (formData.country.trim().length < 2) {
      currentErrors.country = 'Country selection is required.';
      isValid = false;
    }

    setErrors(currentErrors);

    if (isValid) {
      setIsSuccess(true);
      onClearCart();
    }
  };

if (isSuccess) {
    return (
      <div className="co-page-layout co-success-state animate-fade">
        <div className="co-success-card">
          <div className="co-success-icon">✓</div>
          <h2>Purchase Completed!</h2>
          <p>Thank you for your purchase, {formData.firstName}.</p>
          <p>A confirmation email has been sent to {formData.email}.</p>
          <p className="co-notice">Note: This is a demo. No payment was processed, and no real items will be shipped.</p>
          <button className="co-action-button" onClick={() => setCurrentPage('shop')}>
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="co-page-layout co-empty-state animate-fade">
        <p>Your cart is empty. You cannot proceed to checkout.</p>
        <button className="co-action-button" onClick={() => setCurrentPage('shop')}>
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="co-page-layout animate-fade">
      <div className="co-header-area">
        <h1 className="co-title">Checkout</h1>
        <div className="co-demo-banner">
          <i className="fa-solid fa-circle-info"></i>
          <div>
            <strong>This is a demo store.</strong>
            <div>No real orders will be placed or shipped.</div>
          </div>
        </div>
      </div>
      
      <div className="co-container">
        <form className="co-form" onSubmit={handleSubmit} noValidate>
          <h2 className="co-section-title">Shipping Information</h2>
          
          <div className="co-row">
            <div className="co-group">
              <label>First Name</label>
              <input 
                type="text" 
                value={formData.firstName} 
                onChange={(e) => handleInputChange('firstName', e.target.value)} 
                className={errors.firstName ? 'co-input-error' : ''}
              />
              {errors.firstName && <span className="co-error-text">{errors.firstName}</span>}
            </div>
            
            <div className="co-group">
              <label>Last Name</label>
              <input 
                type="text" 
                value={formData.lastName} 
                onChange={(e) => handleInputChange('lastName', e.target.value)} 
                className={errors.lastName ? 'co-input-error' : ''}
              />
              {errors.lastName && <span className="co-error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="co-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => handleInputChange('email', e.target.value)} 
              className={errors.email ? 'co-input-error' : ''}
            />
            {errors.email && <span className="co-error-text">{errors.email}</span>}
          </div>

          <div className="co-group">
            <label>Street Address</label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={(e) => handleInputChange('address', e.target.value)} 
              className={errors.address ? 'co-input-error' : ''}
            />
            {errors.address && <span className="co-error-text">{errors.address}</span>}
          </div>

          <div className="co-row">
            <div className="co-group">
              <label>City</label>
              <input 
                type="text" 
                value={formData.city} 
                onChange={(e) => handleInputChange('city', e.target.value)} 
                className={errors.city ? 'co-input-error' : ''}
              />
              {errors.city && <span className="co-error-text">{errors.city}</span>}
            </div>
            
            <div className="co-group">
              <label>Postal Code</label>
              <input 
                type="text" 
                inputMode="numeric"
                placeholder="Numbers only"
                value={formData.postalCode} 
                onChange={(e) => handleInputChange('postalCode', e.target.value)} 
                className={errors.postalCode ? 'co-input-error' : ''}
              />
              {errors.postalCode && <span className="co-error-text">{errors.postalCode}</span>}
            </div>
          </div>

          <div className="co-group">
            <label>Country</label>
            <input 
              type="text" 
              value={formData.country} 
              onChange={(e) => handleInputChange('country', e.target.value)} 
              className={errors.country ? 'co-input-error' : ''}
            />
            {errors.country && <span className="co-error-text">{errors.country}</span>}
          </div>

          <h2 className="co-section-title co-payment-title">Payment Method</h2>
          <div className="co-payment-options">
            <label className={`co-radio-label ${formData.paymentMethod === 'card' ? 'co-radio-active' : ''}`}>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="card" 
                checked={formData.paymentMethod === 'card'} 
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)} 
              />
              <span>Credit / Debit Card</span>
            </label>
            <label className={`co-radio-label ${formData.paymentMethod === 'paypal' ? 'co-radio-active' : ''}`}>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="paypal" 
                checked={formData.paymentMethod === 'paypal'} 
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)} 
              />
              <span>PayPal</span>
            </label>
          </div>

          {formData.paymentMethod === 'card' && (
            <div className="co-card-fields animate-fade">
              <div className="co-group">
                <label>Card Number</label>
                <input type="text" placeholder="ffff ffff ffff ffff" value="4242 4242 4242 4242" readOnly className="co-readonly-input" />
              </div>
              <div className="co-row">
                <div className="co-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" value="12/29" readOnly className="co-readonly-input" />
                </div>
                <div className="co-group">
                  <label>CVC</label>
                  <input type="text" placeholder="fff" value="123" readOnly className="co-readonly-input" />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="co-action-button co-submit-btn">
            Complete Purchase
          </button>
        </form>

        <div className="co-summary-panel">
          <h2 className="co-section-title">Order Summary</h2>
          <div className="co-summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="co-summary-item">
                <div className="co-summary-item-info">
                  <span className="co-summary-item-name">{item.name}</span>
                  <span className="co-summary-item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="co-summary-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="co-summary-total">
            <span>Total:</span>
            <span className="co-total-amount">${totalCartPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};