import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './components/features/nav/Footer';
import Header from './components/features/nav/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App () {
	return <AuthProvider>
		<CartProvider>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</CartProvider>
	</AuthProvider>;
}

export default App;
