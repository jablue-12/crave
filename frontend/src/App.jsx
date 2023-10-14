import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from './components/nav/Footer';
import Header from './components/nav/Header';
import { CartProvider } from './contexts/CartContext';
import { RestaurantsProvider } from './contexts/RestaurantsContext';

function App () {
	return <RestaurantsProvider>
		<CartProvider>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</CartProvider>
	</RestaurantsProvider>;
}

export default App;
