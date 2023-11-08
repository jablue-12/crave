import React from 'react';
import { Modal } from 'react-bootstrap';

const Popup = ({ display, close, title, size = 'lg', children }) => {
	return (
		<Modal size={size} show={display} onHide={close}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{children}
			</Modal.Body>
		</Modal>
	);
};

export default Popup;
