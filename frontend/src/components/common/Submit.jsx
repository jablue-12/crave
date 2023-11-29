import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const Submit = ({ onClick, isDisabled, isLoading, label }) => {
	const buttonText = label || 'Submit';

	return (
		<Button
			className="bubble submit w-auto mt-1 mx-auto px-3"
			onClick={onClick}
			disabled={isDisabled}
		>
			<span style={{
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
				fontSize: '14px'
			}}>
				{isLoading
					? (
						<>
							<Spinner size="sm"/> Loading...
						</>)
					: buttonText}
			</span>
		</Button>
	);
};

export default Submit;
