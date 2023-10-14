import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function Rating ({ value }) {
	const Star = (n) => <span key={n}>{
		value >= n
			? <FaStar />
			: value >= n - 0.5
				? <FaStarHalfAlt />
				: <FaRegStar />
	}</span>;

	return (
		<div className="rating">
			<span>
				{[1, 2, 3, 4, 5].map(Star)}
			</span>
		</div>
	);
}
