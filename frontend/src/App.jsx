import React, { useMemo, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import ShoppingCart from './components/features/cart/ShoppingCart';
import Footer from './components/features/nav/Footer';
import Header from './components/features/nav/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';

function App () {
	const { dishesInCart } = useCart();
	const [isSliderOn, setIsSliderOn] = useState(false);

	return <AuthProvider>
		<CartProvider>
			<Header setIsSliderOn={setIsSliderOn} />
			<ShoppingCart
				isSliderOn={isSliderOn}
				setIsSliderOn={setIsSliderOn}
				dishesInCart={dishesInCart}
			/>
			<main>
				{useMemo(() => <Outlet />, [])}
			</main>
			<Footer />
		</CartProvider>
	</AuthProvider>;
}

export default App;
