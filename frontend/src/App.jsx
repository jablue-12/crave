import React, { useMemo, useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import ShoppingCart from './components/features/cart/ShoppingCart';
import Footer from './components/features/nav/Footer';
import Header from './components/features/nav/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { DishCreationProvider } from './contexts/DishCreationContext';
import OrderProvider from './contexts/OrderContext';
import SaleProvider from './contexts/SaleContext';

function App () {
	const { dishesInCart } = useCart();
	const [isSliderOn, setIsSliderOn] = useState(false);

	return <AuthProvider>
		<CartProvider>
			<OrderProvider>
				<DishCreationProvider>
					<SaleProvider>
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
					</SaleProvider>
				</DishCreationProvider>
			</OrderProvider>
		</CartProvider>
	</AuthProvider>;
}

export default App;
