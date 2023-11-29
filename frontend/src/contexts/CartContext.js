import React, { createContext, useContext, useEffect, useState } from 'react';

const getCachedCart = email => {
	let cart = localStorage.getItem(`cart_${email}`);
	if (cart) {
		return JSON.parse(cart);
	}
	cart = localStorage.getItem('cart_default');
	return cart ? JSON.parse(cart) : [];
};

export const CartContext = createContext({
	dishesInCart: [],
	add: () => {},
	get: () => {},
	removeOne: () => {},
	remove: () => {},
	countDish: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const email = localStorage.getItem('user');
	const [dishesInCart, setDishesInCart] = useState(() => getCachedCart(email));

	useEffect(() => {
		localStorage.setItem(`cart_${email || 'default'}`, JSON.stringify(dishesInCart));
	}, [dishesInCart, email]);

	const countDish = id => {
		return dishesInCart.find(x => x.id === id)?.quantity ?? 0;
	};

	const add = dish => {
		const quantity = countDish(dish.id);

		if (quantity === 0) {
			setDishesInCart(dishes => [...dishes, { ...dish, quantity: 1 }]);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === dish.id
				? { ...x, quantity: x.quantity + 1 }
				: x));
		}
	};

	const get = id => {
		return dishesInCart.find(dish => dish.id === id);
	};

	const removeOne = id => {
		const quantity = countDish(id);

		if (quantity === 1) {
			remove(id);
		} else {
			setDishesInCart(dishes => dishes.map(x => x.id === id
				? { ...x, quantity: x.quantity - 1 }
				: x));
		}
	};

	const remove = id => {
		setDishesInCart(dishes => dishes.filter(x => x.id !== id));
	};

	const clear = () => {
		setDishesInCart([]);
		localStorage.removeItem(`cart_${email || 'default'}`);
	};

	const value = {
		dishesInCart,
		get,
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
