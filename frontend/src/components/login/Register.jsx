import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

async function registerUser (credentials) {
	return fetch('http://localhost:8080/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then(data => data.json());
}
export default function Login () {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	function validateForm () {
		return email.length > 0 && password.length > 0 && firstName.length > 0 && lastName.length > 0;
	}

	function handleClick () {
		navigate('/login');
	}

	const handleRegister = async e => {
		e.preventDefault();
		setToken(await registerUser({
			firstName, lastName, email, password
		}));
		setToken(token);
	};

	return (
		<div className="Register">
			<h2>
				Please Register Here
			</h2>
			<Form onSubmit={handleRegister}>
				<Form.Group size="lg" controlid="name">
					<Form.Label>First Name</Form.Label>
					<Form.Control className="w-50" autoFocus type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlid="address">
					<Form.Label>Last Name</Form.Label>
					<Form.Control className="w-50" type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlid="email">
					<Form.Label>Email</Form.Label>
					<Form.Control className="w-50" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlid="password">
					<Form.Label>Password</Form.Label>
					<Form.Control className="w-50" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={!validateForm()}>
					Register
				</Button>
				<Button variant="info" onClick={() => handleClick()}>
					Login
				</Button>
			</Form>
		</div>
	);
}
