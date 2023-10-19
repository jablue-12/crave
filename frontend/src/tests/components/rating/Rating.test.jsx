import { render } from '@testing-library/react';
import React from 'react';
import Rating from '../../../components/rating/Rating';

describe('Rating Component', () => {
	it('should render the correct number of stars based on the value prop', () => {
		const { container } = render(<Rating value={3.5} />);
		const stars = container.querySelectorAll('.rating span svg');
		expect(stars.length).toBe(5);
	});
});
