import React from 'react';
import { Progress } from 'reactstrap';

const RatingBar = ({ rating }) => {
	return <Progress
		className="my-2"
		value={(rating / 5).toFixed(2) * 100}
		color={rating >= 4.5
			? 'danger'
			: rating >= 4
				? 'warning'
				: rating >= 3
					? 'success'
					: 'info'}
		style={{
			width: '100%',
			height: '7px',
			borderRadius: '50px'
		}}
	>
	</Progress>;
};

export default RatingBar;
