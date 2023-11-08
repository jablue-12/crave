import React, { useMemo, useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import ShoppingCart from './components/features/cart/ShoppingCart';
import Footer from './components/features/nav/Footer';
import Header from './components/features/nav/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { NotifierProvider } from './contexts/NotifierContext';
import OrderProvider from './contexts/OrderContext';

function App () {
	const { dishesInCart } = useCart();
	const [isSliderOn, setIsSliderOn] = useState(false);

	return <NotifierProvider>
		<AuthProvider>
			<CartProvider>
				<OrderProvider>
					<Container className="py-2">
						<Header setIsSliderOn={setIsSliderOn} />
						<ShoppingCart
							isSliderOn={isSliderOn}
							setIsSliderOn={setIsSliderOn}
							dishesInCart={dishesInCart}
						/>
						<main className="my-4">
							{useMemo(() => <Outlet />, [])}
						</main>
						<Footer />
					</Container>
				</OrderProvider>
			</CartProvider>
		</AuthProvider>
	</NotifierProvider>;
}

export default App;
