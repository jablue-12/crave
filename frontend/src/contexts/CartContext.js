<<<<<<< HEAD
<<<<<<< HEAD
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const getCartForUser = email => {
	const cart = localStorage.getItem(`cart_${email}`);
	return cart ? JSON.parse(cart) : [];
};
=======
import React, { createContext, useContext, useState } from 'react';
<<<<<<< HEAD
import { cartItems } from '../sample/cartItems';
>>>>>>> 85a6cf9... Refactor frontend
=======
import { cartItems } from './../sample/cartItems';
>>>>>>> 55f2d90... Added Axios common logic  and Updated contants
=======
import React, { createContext, useContext, useEffect, useState } from 'react';
import { cartItems } from './../sample/cartItems';
import { useAuth } from './AuthContext';

const getCart = userId => {
	const cart = localStorage.getItem(`cart_${userId || 'default'}`);
	return cart ? JSON.parse(cart) : cartItems;
};
>>>>>>> edf8a10... Added localStorage cache for cart

export const CartContext = createContext({
	dishesInCart: [],
	add: () => {},
	removeOne: () => {},
	remove: () => {},
	countDish: () => {}
});

export const useCart = () => useContext(CartContext);

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export function CartProvider ({ children }) {
	const [dishesInCart, setDishesInCart] = useState(cartItems);

	function countDish (id) {
>>>>>>> 85a6cf9... Refactor frontend
=======
export const CartProvider = ({ children }) => {
	const { user } = useAuth();
	const userId = user ? user.id : null;
	const [dishesInCart, setDishesInCart] = useState(() => getCart(userId));

	useEffect(() => {
		localStorage.setItem(`cart_${userId || 'default'}`, JSON.stringify(dishesInCart));
	}, [dishesInCart]);

	const countDish = (id) => {
>>>>>>> edf8a10... Added localStorage cache for cart
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
<<<<<<< HEAD

	const clear = () => {
		setDishesInCart([]);
		localStorage.removeItem(`cart_${email}`);
	};
=======
>>>>>>> edf8a10... Added localStorage cache for cart

	const clear = () => {
		setDishesInCart([]);
		localStorage.removeItem(`cart_${userId || 'default'}`);
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
