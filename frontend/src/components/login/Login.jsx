import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

async function loginUser (credentials) {
	return fetch('http://localhost:8080/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then((data) => {
			data.json();
		})
		.catch(() => alert('Login unsucessful'));
}
export default function Login () {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	function validateForm () {
		return email.length > 0 && password.length > 0;
	}

	function handleClick () {
		navigate('/Register');
	}

	const handleLogin = async e => {
		e.preventDefault();
		setToken(await loginUser({
			email, password
		}));
		setToken(token);

		navigate('/');
	};

	return (
		<div className="Login">
			<Form onSubmit={handleLogin}>
				<Form.Group size="lg" controlid="email">
					<Form.Label>Email</Form.Label>
					<Form.Control className="w-50" autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				</Form.Group>
				<Form.Group size="lg" controlid="password">
					<Form.Label>Password</Form.Label>
					<Form.Control className="w-50" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={!validateForm()}>
					Login
				</Button>
				<Button variant="info" onClick={() => handleClick()}>
					Register
				</Button>
			</Form>
		</div>
	);
}
