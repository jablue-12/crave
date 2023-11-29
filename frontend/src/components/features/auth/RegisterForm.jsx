import React, { useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { restful } from '../../../common/api';
import { endpoint } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { FeedbackMessage } from '../../common/FeedbackMessage';
import Submit from '../../common/Submit';

export const RegisterForm = ({ setIsRegistering }) => {
	const { isEmailValid, formFieldStyle } = useAuth();

	const placeholderRegister = {
		firstName: 'e.g. Foo',
		lastName: 'e.g. Bar',
		email: 'e.g. foobar@gmail.com',
		password: 'e.g. foobar'
	};

	const [registerField, setRegisterField] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});

	const [touched, setTouched] = useState({
		firstName: false,
		lastName: false,
		email: false,
		password: false
	});

	const [isRegisterLoading, setIsRegisterLoading] = useState(false);

	const [registerFeedback, setRegisterFeedback] = useState(null);

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: 'Registration Successful',
			messageDescription: 'Congratulations! You can now log in and explore our platform.'
		};
	};

	const getErrorFeedback = (message) => {
		return {
			variant: 'danger',
			messageHeader: 'Failed to Register.',
			messageDescription: message || 'Please try again.'
		};
	};

	const handleTextChange = (e, key) => {
		setRegisterField({ ...registerField, [key]: e.target.value });
		setTouched({ ...touched, [key]: true });
	};

	const resetRegisterField = () => {
		const register = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		};

		setRegisterField(register);
	};

	const resetTouch = () => {
		const touch = {
			firstName: false,
			lastName: false,
			email: false,
			password: false
		};
		setTouched(touch);
	};

	const markFieldsAsTouched = () => {
		const touch = {
			firstName: true,
			lastName: true,
			email: true,
			password: true
		};
		setTouched(touch);
	};

	const isFormValid = () => {
		return registerField.firstName !== '' &&
			registerField.lastName !== '' &&
			isEmailValid(registerField.email) &&
			registerField.password !== '';
	};

	const registerUser = async () => {
		if (isFormValid()) {
			setIsRegisterLoading(true);
			setRegisterFeedback(null);
			try {
				await restful.post(endpoint.REGISTRATION, registerField);
				setRegisterFeedback(getSuccessFeedback);
				resetTouch();
				resetRegisterField();
			} catch (e) {
				setRegisterFeedback(getErrorFeedback(e.response.data.statusMessage));
			} finally {
				setIsRegisterLoading(false);

				setTimeout(() => {
					setRegisterFeedback(null);
				}, 3000);
			}
		} else {
			markFieldsAsTouched();
		}
	};

	return (
		<Row>
			<Form as={Col} className="p-3">
				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">First Name</InputGroup.Text>
					<Form.Control
						placeholder={placeholderRegister.firstName}
						required
						className="rounded-3"
						style={formFieldStyle}
						value={registerField.firstName}
						onChange={(e) => handleTextChange(e, 'firstName')}
						isValid={touched.firstName && registerField.firstName !== ''}
						isInvalid={touched.firstName && registerField.firstName === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a first name
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Last Name</InputGroup.Text>
					<Form.Control
						placeholder={placeholderRegister.lastName}
						required
						className="rounded-3"
						style={formFieldStyle}
						value={registerField.lastName}
						onChange={(e) => handleTextChange(e, 'lastName')}
						isValid={touched.lastName && registerField.lastName !== ''}
						isInvalid={touched.lastName && registerField.lastName === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a last name
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Email</InputGroup.Text>
					<Form.Control
						placeholder={placeholderRegister.email}
						required
						className="rounded-3"
						style={formFieldStyle}
						value={registerField.email}
						onChange={(e) => handleTextChange(e, 'email')}
						isValid={touched.email && isEmailValid(registerField.email)}
						isInvalid={touched.email && !isEmailValid(registerField.email)}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a valid email that ends with @gmail.com, @myumanitoba.ca, @hotmail.com, @yahoo.com
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Password</InputGroup.Text>
					<Form.Control
						placeholder={placeholderRegister.password}
						required
						type="password"
						className="rounded-3"
						style={formFieldStyle}
						value={registerField.password}
						onChange={(e) => handleTextChange(e, 'password')}
						isValid={touched.password && registerField.password !== ''}
						isInvalid={touched.password && registerField.password === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a password
					</Form.Control.Feedback>
				</InputGroup>

				<Submit
					onClick={registerUser}
					isDisabled={isRegisterLoading}
					isLoading={isRegisterLoading}
					label="Register"/>
			</Form>

			{registerFeedback &&
			<FeedbackMessage
				variant={registerFeedback.variant}
				messageHeader={registerFeedback.messageHeader}
				messageDescription={registerFeedback.messageDescription}/>}
		</Row>
	);
};
