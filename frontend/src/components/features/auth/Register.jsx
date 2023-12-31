import React from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from './../../../contexts/AuthContext';
import AuthForm from './AuthForm';
import { formGroupStyle, inputStyle } from './AuthFormStyle';

export default function Register ({ setIsRegistering }) {
	const {
		firstName,
		lastName,
		setFirstName,
		setLastName,
		register
	} = useAuth();

	return <AuthForm onSubmit={e => {
		register(e);
		setIsRegistering(false);
	}}>
		<Form.Group className="mb-2" controlid="name" style={formGroupStyle}>
			<Form.Control
				data-cy="first-name"
				className="w-50"
				autoFocus
				type="firstName"
				value={firstName}
				placeholder="First Name"
				onChange={(e) => setFirstName(e.target.value)}
				style={inputStyle}
			/>
		</Form.Group>
		<Form.Group className="mb-2" controlid="address" style={formGroupStyle}>
			<Form.Control
				data-cy="last-name"
				className="w-50"
				type="lastName"
				value={lastName}
				placeholder="Last Name"
				onChange={(e) => setLastName(e.target.value)}
				style={inputStyle}
			/>
		</Form.Group>
	</AuthForm>;
}
