import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Shop } from './pages/Shop';
import { Gallery } from './pages/Gallery';
import { RequestForm } from './pages/RequestForm';
import { Cart } from './pages/Cart';

function App() {
  const [currentPage, setCurrentPage] = useState('shop');
  // Changed from a simple number to an array to hold actual added products
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.length} /* Dynamically counts the items in the array */
      />

      <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
        {currentPage === 'shop' && <Shop onAddToCart={handleAddToCart} />}
        {currentPage === 'gallery' && <Gallery />}
        {currentPage === 'request' && <RequestForm setCurrentPage={setCurrentPage} />}
        {currentPage === 'cart' && (
          <Cart 
            cartItems={cart} 
            onRemoveFromCart={handleRemoveFromCart} 
            setCurrentPage={setCurrentPage} 
          />
        )}
      </main>
    </>
  );
}

export default App;