import React from 'react';

const Circle = ({ onClick, children }) => {
	return <div
		className="cart-increment"
		onClick={onClick}
	>{children}</div>;
};

export default Circle;
