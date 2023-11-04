import React from 'react';
import { Button } from 'react-bootstrap';

const Submit = ({ disabled }) => {
	return <Button
		style={{
			height: '35px',
			border: 'none',
			borderRadius: '5px',
			fontSize: '12px'
		}}
		size="sm"
		type="submit"
		disabled={disabled}
	>
		<span style={{
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center'
		}}>Submit</span>
	</Button>;
};

export default Submit;
