
import React from 'react';
import Header from './components/Layout/Header.js';
import Meals from './components/Meals/Meals.js';
import Cart from './components/Cart/Cart.js';
import CartProvider from './store/CartProvider.js';

const App = () => {
    const [cartIsShown, setCartIsShown] = React.useState(false);

    const showCartHandler = () => setCartIsShown(true);
    const hideCartHandler = () => setCartIsShown(false);

    return <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
            <Meals />
        </main>
    </CartProvider>
};

export default App;
