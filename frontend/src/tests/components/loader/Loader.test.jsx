import { render } from '@testing-library/react';
import React from 'react';
import Loader from './../../../components/common/Loader';

test('Loader component renders a spinner', () => {
	const { getByRole } = render(<Loader />);
	const spinner = getByRole('status');

	expect(spinner).toBeInTheDocument();
});
