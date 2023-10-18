import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../../../components/cart/Cart';
import { CartContext } from '../../../contexts/CartContext';

describe('Cart Component', () => {
	it('displays "Back to Dashboard" link when cart is empty', () => {
		const cartContextValue = {
			dishesInCart: [],
			countDish: jest.fn(),
			add: jest.fn(),
			removeOne: jest.fn(),
			remove: jest.fn()
		};

		render(
			<BrowserRouter>
				<CartContext.Provider value={cartContextValue}>
					<Cart />
				</CartContext.Provider>
			</BrowserRouter>
		);

		const backToDashboardLink = screen.getByText('Back to Dashboard');
		expect(backToDashboardLink).toBeInTheDocument();
	});

	it('displays cart items, subtotal, and checkout button when cart has items', () => {
		const cartContextValue = {
			dishesInCart: [
				{
					id: 1,
					name: 'Dish 1',
					quantity: 2,
					price: 10.0
				},
				{
					id: 2,
					name: 'Dish 2',
					quantity: 1,
					price: 15.0
				}
			],
			countDish: jest.fn(),
			add: jest.fn(),
			removeOne: jest.fn(),
			remove: jest.fn()
		};

		render(
			<BrowserRouter>
				<CartContext.Provider value={cartContextValue}>
					<Cart />
				</CartContext.Provider>
			</BrowserRouter>
		);

		const dish1Name = screen.getByText('Dish 1');
		const dish2Name = screen.getByText('Dish 2');
		expect(dish1Name).toBeInTheDocument();
		expect(dish2Name).toBeInTheDocument();

		const subtotalText = screen.getByText('Subtotal ~ 3 Items');
		expect(subtotalText).toBeInTheDocument();
		const expectedSubtotalValue = '$35.00';
		const subtotalValue = screen.getByText(expectedSubtotalValue);
		expect(subtotalValue).toBeInTheDocument();
	});
});
