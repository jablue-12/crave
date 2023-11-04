import React, { createContext, useContext, useState } from 'react';
import { cartItems } from './../sample/cartItems';

export const CartContext = createContext({
	dishesInCart: [],
	add: () => {},
	removeOne: () => {},
	remove: () => {},
	countDish: () => {}
});

export const useCart = () => useContext(CartContext);

export function CartProvider ({ children }) {
	const [dishesInCart, setDishesInCart] = useState(cartItems);

	function countDish (id) {
		return dishesInCart.find(x => x.id === id)?.quantity ?? 0;
	}

	function add (dish) {
		const quantity = countDish(dish.id);

		if (quantity === 0) {
			setDishesInCart(dishes => [...dishes, { ...dish, quantity: 1 }]);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === dish.id
				? { ...x, quantity: x.quantity + 1 }
				: x));
		}
	}

	function removeOne (id) {
		const quantity = countDish(id);

		if (quantity === 1) {
			remove(id);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === id
				? { ...x, quantity: x.quantity - 1 }
				: x));
		}
	}

	function remove (id) {
		setDishesInCart(dishes => dishes.filter(x => x.id !== id));
	}

	const value = {
		dishesInCart,
		add,
		removeOne,
		remove,
		countDish
	};

	return <CartContext.Provider value={value}>
		{children}
	</CartContext.Provider>;
}
