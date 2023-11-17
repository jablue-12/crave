import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const getCartForUser = email => {
	const cart = localStorage.getItem(`cart_${email}`);
	return cart ? JSON.parse(cart) : [];
};

export const CartContext = createContext({
	dishesInCart: [],
	add: () => {},
	removeOne: () => {},
	remove: () => {},
	countDish: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const { user } = useAuth();
	const email = user ? user.email : null;
	const [dishesInCart, setDishesInCart] = useState(() => getCartForUser(email));

	useEffect(() => {
		if (email) {
			localStorage.setItem(`cart_${email}`, JSON.stringify(dishesInCart));
		}
	}, [dishesInCart]);

	const countDish = (id) => {
		return dishesInCart.find(x => x.id === id)?.quantity ?? 0;
	};

	const add = (dish) => {
		const quantity = countDish(dish.id);

		if (quantity === 0) {
			setDishesInCart(dishes => [...dishes, { ...dish, quantity: 1 }]);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === dish.id
				? { ...x, quantity: x.quantity + 1 }
				: x));
		}
	};

	const removeOne = (id) => {
		const quantity = countDish(id);

		if (quantity === 1) {
			remove(id);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === id
				? { ...x, quantity: x.quantity - 1 }
				: x));
		}
	};

	const remove = (id) => {
		setDishesInCart(dishes => dishes.filter(x => x.id !== id));
	};

	const clear = () => {
		setDishesInCart([]);
		localStorage.removeItem(`cart_${email}`);
	};

	const value = {
		dishesInCart,
		add,
		removeOne,
		remove,
		countDish,
		clear
	};

	return <CartContext.Provider value={value}>
		{children}
	</CartContext.Provider>;
};
