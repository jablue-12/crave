import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RestaurantCard from '../../../components/dashboard/RestaurantCard';

const restaurantData = {
	name: 'Olive Garden',
	location: '1234 Crescent St',
	rating: 3.5,
	imageUrl: './images/1.jpg'
};

describe('RestaurantCard component', () => {
	test('it renders restaurant information correctly', () => {
		render(<BrowserRouter>
			<RestaurantCard restaurant={restaurantData} />
		</BrowserRouter>);
		const name = screen.getByText(restaurantData.name);
		expect(name).toBeInTheDocument();
	});
});
