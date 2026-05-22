import { useState } from 'react';
import './styling/Navbar.css';

export const Navbar = ({ currentPage, setCurrentPage, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="nb-navbar">
      <div className="nb-nav-container">
        <div className="nb-nav-logo" onClick={() => handleNavigate('shop')}>
          AK <span>STUDIOS</span>
        </div>

        {/* Right side container to align Mobile Cart & Hamburger nicely */}
        <div className="nb-mobile-controls">
          <button 
            className={`nb-mobile-cart-btn ${currentPage === 'cart' ? 'nb-active' : ''}`}
            onClick={() => handleNavigate('cart')}
            aria-label="View cart"
          >
            <span className="nb-cart-icon">🛒</span>
            <span className="nb-cart-badge">{cartCount}</span>
          </button>

          <button 
            className={`nb-hamburger ${isOpen ? 'nb-hamburger-active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="nb-bar"></span>
            <span className="nb-bar"></span>
            <span className="nb-bar"></span>
          </button>
        </div>

        {/* Desktop Links (Cart is hidden here on mobile) */}
        <div className={`nb-nav-links ${isOpen ? 'nb-nav-active' : ''}`}>
          <button 
            className={`nb-nav-btn ${currentPage === 'shop' ? 'nb-active' : ''}`}
            onClick={() => handleNavigate('shop')}
          >
            Shop
          </button>
          <button 
            className={`nb-nav-btn ${currentPage === 'gallery' ? 'nb-active' : ''}`}
            onClick={() => handleNavigate('gallery')}
          >
            Gallery
          </button>
          <button 
            className={`nb-nav-btn ${currentPage === 'request' ? 'nb-active' : ''}`}
            onClick={() => handleNavigate('request')}
          >
            Custom Request
          </button>
          <button 
            className={`nb-nav-btn nb-desktop-cart-btn ${currentPage === 'cart' ? 'nb-active' : ''}`}
            onClick={() => handleNavigate('cart')}
          >
            Cart <span className="nb-cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};