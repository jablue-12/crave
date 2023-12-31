import React, { useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { restful } from '../../../common/api';
import { TOKEN_KEY, endpoint } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { FeedbackMessage } from '../../common/FeedbackMessage';
import Submit from '../../common/Submit';

export const LoginForm = ({ setIsLoggingIn }) => {
	const {
		setToken,
		setUser,
		isEmailValid,
		formFieldStyle
	} = useAuth();

	const placeholderLogin = {
		email: 'e.g. foobar@gmail.com',
		password: 'e.g. foobar'
	};

	const [loginField, setLoginField] = useState({
		email: '',
		password: ''
	});

	const [touched, setTouched] = useState({
		email: false,
		password: false
	});

	const [isLoginLoading, setIsLoginLoading] = useState(false);

	const [loginFeedback, setLoginFeedback] = useState(null);

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: 'Login Successful',
			messageDescription: 'Welcome back!'
		};
	};

	const getErrorFeedback = (message) => {
		return {
			variant: 'danger',
			messageHeader: 'Failed to Login.',
			messageDescription: message || 'Please try again.'
		};
	};

	const handleTextChange = (e, key) => {
		setLoginField({ ...loginField, [key]: e.target.value });
		setTouched({ ...touched, [key]: true });
	};

	const resetLoginField = () => {
		const login = {
			email: '',
			password: ''
		};

		setLoginField(login);
	};

	const resetTouch = () => {
		const touch = {
			email: false,
			password: false
		};
		setTouched(touch);
	};

	const markFieldsAsTouched = () => {
		const touch = {
			email: true,
			password: true
		};
		setTouched(touch);
	};

	const isFormValid = () => {
		return isEmailValid(loginField.email) &&
			loginField.password !== '';
	};

	const loginUser = async () => {
		if (isFormValid()) {
			setIsLoginLoading(true);
			setLoginFeedback(null);
			try {
				const loginResult = await restful.post(endpoint.LOGIN, loginField);
				setLoginFeedback(getSuccessFeedback);

				setToken(loginResult.data.token);
				localStorage.setItem(TOKEN_KEY, loginResult.data.token);
				localStorage.setItem('user', loginField.email);

				try {
					const { data } = await restful.auth.json.get(endpoint.USER);
					setUser(data);
				} catch (e) {
					console.error(e);
				}

				resetTouch();
				resetLoginField();
			} catch (e) {
				if (e && e.response && e.response.data) {
					setLoginFeedback(getErrorFeedback(e.response.data.statusMessage));
				}
				console.error(`Error login user: ${e}`);
			} finally {
				setIsLoginLoading(false);

				setTimeout(() => {
					setLoginFeedback(null);
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
					<InputGroup.Text className="rounded-3 mx-1">Email</InputGroup.Text>
					<Form.Control
						placeholder={placeholderLogin.email}
						required
						className="rounded-3"
						value={loginField.email}
						style={formFieldStyle}
						onChange={(e) => handleTextChange(e, 'email')}
						isValid={touched.email && isEmailValid(loginField.email)}
						isInvalid={touched.email && !isEmailValid(loginField.email)}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a valid email
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Password</InputGroup.Text>
					<Form.Control
						placeholder={placeholderLogin.password}
						required
						type="password"
						className="rounded-3"
						value={loginField.password}
						style={formFieldStyle}
						onChange={(e) => handleTextChange(e, 'password')}
						isValid={touched.password && loginField.password !== ''}
						isInvalid={touched.password && loginField.password === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a password
					</Form.Control.Feedback>
				</InputGroup>

				<Submit
					onClick={loginUser}
					isDisabled={isLoginLoading}
					isLoading={isLoginLoading}
					label="Login"/>

			</Form>

			{loginFeedback &&
			<FeedbackMessage
				variant={loginFeedback.variant}
				messageHeader={loginFeedback.messageHeader}
				messageDescription={loginFeedback.messageDescription}/>}
		</Row>
	);
};
