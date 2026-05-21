import './styling/Navbar.css';

export const Navbar = ({ currentPage, setCurrentPage, cartCount }) => {
  return (
    <nav className="nb-navbar">
      <div className="nb-nav-container">
        <div className="nb-nav-logo" onClick={() => setCurrentPage('shop')}>
          AK <span>STUDIOS</span>
        </div>
        <div className="nb-nav-links">
          <button 
            className={`nb-nav-btn ${currentPage === 'shop' ? 'nb-active' : ''}`}
            onClick={() => setCurrentPage('shop')}
          >
            Shop
          </button>
          <button 
            className={`nb-nav-btn ${currentPage === 'gallery' ? 'nb-active' : ''}`}
            onClick={() => setCurrentPage('gallery')}
          >
            Gallery
          </button>
          <button 
            className={`nb-nav-btn ${currentPage === 'request' ? 'nb-active' : ''}`}
            onClick={() => setCurrentPage('request')}
          >
            Custom Request
          </button>
          <button 
            className={`nb-nav-btn nb-cart-btn ${currentPage === 'cart' ? 'nb-active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            Cart <span className="nb-cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};