import React from 'react';
import { Alert } from 'react-bootstrap';

export const FeedbackMessage = ({ variant, messageHeader, messageDescription }) => {
	return (
		<Alert
			variant={variant}
			dismissible
			className="w-25 mx-2"
			style={{ position: 'fixed', bottom: 0, right: 0 }}>
			<Alert.Heading>{messageHeader}</Alert.Heading>
			<p>
				{messageDescription}
			</p>
		</Alert>
	);
};
