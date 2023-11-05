import React, { useMemo, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import ShoppingCart from './components/features/cart/ShoppingCart';
import Footer from './components/features/nav/Footer';
import Header from './components/features/nav/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import OrderProvider from './contexts/OrderContext';

function App () {
	const { dishesInCart } = useCart();
	const [isSliderOn, setIsSliderOn] = useState(false);

	return <AuthProvider>
		<CartProvider>
			<OrderProvider>
				<div className="p-5">
					<Header setIsSliderOn={setIsSliderOn} />
					<ShoppingCart
						isSliderOn={isSliderOn}
						setIsSliderOn={setIsSliderOn}
						dishesInCart={dishesInCart}
					/>
					<main className="my-5">
						{useMemo(() => <Outlet />, [])}
					</main>
					<Footer />
				</div>
			</OrderProvider>
		</CartProvider>
	</AuthProvider>;
}

export default App;
