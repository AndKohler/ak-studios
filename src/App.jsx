import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Shop } from './pages/Shop';
import { Gallery } from './pages/Gallery';
import { RequestForm } from './pages/RequestForm';
import { Cart } from './pages/Cart';

function App() {
  const [currentPage, setCurrentPage] = useState('shop');
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const qtyToAdd = product.quantity || 1;
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: Math.min(10, item.quantity + qtyToAdd) } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: Math.min(10, qtyToAdd) }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: Math.min(10, Math.max(0, item.quantity + delta)) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cartCount}
      />

      <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
        {currentPage === 'shop' && <Shop cart={cart} onAddToCart={handleAddToCart} />}
        {currentPage === 'gallery' && <Gallery />}
        {currentPage === 'request' && <RequestForm setCurrentPage={setCurrentPage} />}
        {currentPage === 'cart' && (
          <Cart 
            cartItems={cart} 
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem} 
            setCurrentPage={setCurrentPage} 
          />
        )}
      </main>
    </>
  );
}

export default App;