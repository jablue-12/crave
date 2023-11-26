import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { FeedbackMessage } from '../../common/FeedbackMessage';
import SubmitButton from '../../common/SubmitButton';
import { formGroupStyle, inputStyle } from './AuthFormStyle';

export default function AuthForm ({
	children,
	onSubmit
}) {
	const {
		email,
		password,
		verificationSuccess,
		setPassword,
		setEmail
	} = useAuth();

	return (
		<div className="text-center" style={{
			width: '100%',
			height: '100%'
		}}>
			<Form data-cy="auth-form" onSubmit={onSubmit} style={{ width: '100%' }}>
				{children}
				<Form.Group className="mb-2" controlid="email" style={formGroupStyle}>
					<Form.Control
						data-cy="email"
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
							data-cy="password"
							className="w-50"
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							style={inputStyle}
						/>
					</OverlayTrigger>
				</Form.Group>
				<SubmitButton
					onSubmit={onSubmit}
					disabled={email.length === 0 || password === 0}
				>Submit</SubmitButton>
			</Form>
			{verificationSuccess &&
				<FeedbackMessage
					variant={verificationSuccess.variant}
					messageHeader={verificationSuccess.messageHeader}
					messageDescription={verificationSuccess.messageDescription}/>}
		</div>
	);
}
