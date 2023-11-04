import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import Submit from '../../common/Submit';
import { formGroupStyle, inputStyle } from './AuthFormStyle';

export default function AuthForm ({ children, onSubmit }) {
	const {
		email,
		password,
		setPassword,
		setEmail
	} = useAuth();

	return (
		<div className="text-center" style={{ width: '100%', height: '100%' }}>
			<Form onSubmit={onSubmit} style={{ width: '100%' }}>
				{children}
				<Form.Group className="mb-2" controlid="email" style={formGroupStyle}>
					<Form.Control
						className="w-50"
						autoFocus
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={inputStyle}
					/>
				</Form.Group>
				<Form.Group className="mb-4" controlid="password" style={formGroupStyle}>
					<OverlayTrigger
						key="right"
						placement="right"
						overlay={
							<Tooltip id="tooltip-bottom" style={{ opacity: 0.7 }}>
                                Password Policy
							</Tooltip>
						}
					>
						<Form.Control
							className="w-50"
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							style={inputStyle}
						/>
					</OverlayTrigger>
				</Form.Group>
				<Submit disabled={
					email.length === 0 ||
					password === 0}
				/>
			</Form>
		</div>
	);
}
