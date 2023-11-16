import React, { useMemo, useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
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

<<<<<<< HEAD
	return <AuthProvider>
		<CartProvider>
			<OrderProvider>
<<<<<<< HEAD
				<Container className="py-2">
=======
				<div className="p-5">
>>>>>>> abbe86c... Fix backend and frontend issues
					<Header setIsSliderOn={setIsSliderOn} />
					<ShoppingCart
						isSliderOn={isSliderOn}
						setIsSliderOn={setIsSliderOn}
						dishesInCart={dishesInCart}
					/>
<<<<<<< HEAD
					<main className="my-4">
						{useMemo(() => <Outlet />, [])}
					</main>
					<Footer />
				</Container>
			</OrderProvider>
=======
=======
import ShoppingCart from './components/features/cart/ShoppingCart';
>>>>>>> 63043f4... Update styling for menu
import Footer from './components/features/nav/Footer';
import Header from './components/features/nav/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';

function App () {
	const { dishesInCart } = useCart();
	const [isSliderOn, setIsSliderOn] = useState(false);

	return <AuthProvider>
		<CartProvider>
<<<<<<< HEAD
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
>>>>>>> 85a6cf9... Refactor frontend
=======
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
>>>>>>> 9dcfcdc... Add contants and logo image
=======
					<main className="my-5">
						{useMemo(() => <Outlet />, [])}
					</main>
					<Footer />
				</div>
			</OrderProvider>
>>>>>>> abbe86c... Fix backend and frontend issues
		</CartProvider>
	</AuthProvider>;
=======
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
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
}

export default App;
