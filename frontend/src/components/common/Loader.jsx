import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader ({ size = 100 }) {
	return (
		<Spinner
			animation="border"
			role="status"
			style={{
				width: `${size}px`,
				height: `${size}px`,
				margin: 'auto',
				display: 'block'
			}}
		></Spinner>
	);
}
