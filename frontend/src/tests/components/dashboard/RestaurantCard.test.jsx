import { render, screen } from '@testing-library/react';
import React from 'react';
import RestaurantCard from '../../../components/dashboard/RestaurantCard';

const restaurantData = {
	name: 'Olive Garden',
	location: '1234 Crescent St',
	rating: 3.5,
	imageUrl: './images/1.jpg'
};

describe('RestaurantCard component', () => {
	test('it renders restaurant information correctly', () => {
		render(<RestaurantCard restaurant={restaurantData} />);
		const name = screen.getByText(restaurantData.name);
		const location = screen.getByText(restaurantData.location);
		const rating = screen.getByText(restaurantData.rating.toString());
		const imageUrl = screen.getByAltText(restaurantData.name);

		expect(name).toBeInTheDocument();
		expect(location).toBeInTheDocument();
		expect(rating).toBeInTheDocument();
		expect(imageUrl).toHaveAttribute('src', restaurantData.imageUrl);
	});
});
