import '../styling/Navbar.css';

export const Navbar = ({ currentPage, setCurrentPage, cartCount }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => setCurrentPage('shop')}>
          AK <span>STUDIOS</span>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-btn ${currentPage === 'shop' ? 'active' : ''}`}
            onClick={() => setCurrentPage('shop')}
          >
            Shop
          </button>
          <button 
            className={`nav-btn ${currentPage === 'gallery' ? 'active' : ''}`}
            onClick={() => setCurrentPage('gallery')}
          >
            Gallery
          </button>
          <button 
            className={`nav-btn ${currentPage === 'request' ? 'active' : ''}`}
            onClick={() => setCurrentPage('request')}
          >
            Custom Request
          </button>
          <button 
            className={`nav-btn cart-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            Cart <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};