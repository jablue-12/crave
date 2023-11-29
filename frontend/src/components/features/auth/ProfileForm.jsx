import React, { useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { restful } from '../../../common/api';
import { TOKEN_KEY, endpoint } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { FeedbackMessage } from '../../common/FeedbackMessage';
import Submit from '../../common/Submit';

export const ProfileForm = () => {
	const { isEmailValid, formFieldStyle, user, setUser, setToken } = useAuth();

	const [profileField, setProfileField] = useState({
		firstName: '',
		lastName: '',
		email: '',
		oldPassword: '',
		newPassword: ''
	});

	const [touched, setTouched] = useState({
		firstName: false,
		lastName: false,
		email: false,
		oldPassword: false,
		newPassword: false
	});

	const [isUpdateLoading, setIsUpdateLoading] = useState(false);

	const [updateProfileFeedback, setUpdateProfileFeedback] = useState(null);

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: 'Update Successful',
			messageDescription: 'Your profile has been updated.'
		};
	};

	const getErrorFeedback = (message) => {
		return {
			variant: 'danger',
			messageHeader: 'Error Update',
			messageDescription: message || 'Please try again.'
		};
	};

	const handleTextChange = (e, key) => {
		setProfileField({ ...profileField, [key]: e.target.value });
		setTouched({ ...touched, [key]: true });
	};

	const resetProfileField = () => {
		const profile = {
			firstName: '',
			lastName: '',
			email: '',
			oldPassword: '',
			newPassword: ''
		};

		setProfileField(profile);
	};

	const resetTouch = () => {
		const touch = {
			firstName: false,
			lastName: false,
			email: false,
			oldPassword: false,
			newPassword: false
		};
		setTouched(touch);
	};

	const markFieldsAsTouched = () => {
		const touch = {
			firstName: true,
			lastName: true,
			email: true,
			oldPassword: true,
			newPassword: true
		};
		setTouched(touch);
	};

	const AreBothPasswordsSame = () => {
		return profileField.oldPassword === profileField.newPassword;
	};

	const isFormValid = () => {
		return profileField.firstName !== '' &&
			profileField.lastName !== '' &&
			isEmailValid(profileField.email) &&
			profileField.oldPassword !== '' &&
			profileField.newPassword !== '' &&
			!AreBothPasswordsSame();
	};

	const updateUser = async () => {
		if (isFormValid()) {
			setIsUpdateLoading(true);
			setUpdateProfileFeedback(null);
			try {
				const { data } = await restful.auth.json.put(endpoint.USER, profileField);

				console.log('update user log');
				console.log(data);

				if (data && data.token) {
					setUpdateProfileFeedback(getSuccessFeedback);
					setToken(data.token);
					localStorage.setItem(TOKEN_KEY, data.token);
					localStorage.setItem('user', profileField.email);

					try {
						const { data } = await restful.auth.json.get(endpoint.USER);
						setUser(data);
					} catch (e) {
						console.error(e);
					}

					resetTouch();
					resetProfileField();
				} else {
					setUpdateProfileFeedback(getErrorFeedback(data.statusMessage));
				}
			} catch (e) {
				setUpdateProfileFeedback(getErrorFeedback(e.response.data.statusMessage));
			} finally {
				setIsUpdateLoading(false);

				setTimeout(() => {
					setUpdateProfileFeedback(null);
				}, 3000);
			}
		} else {
			markFieldsAsTouched();
		}
	};

	return (
		<Row className="w-50">
			<Form as={Col} className="p-3">
				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">First Name</InputGroup.Text>
					<Form.Control
						placeholder={user ? user.firstName : '' }
						required
						className="rounded-3"
						style={formFieldStyle}
						value={profileField.firstName}
						onChange={(e) => handleTextChange(e, 'firstName')}
						isValid={touched.firstName && profileField.firstName !== ''}
						isInvalid={touched.firstName && profileField.firstName === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a first name
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Last Name</InputGroup.Text>
					<Form.Control
						placeholder={user ? user.lastName : '' }
						required
						className="rounded-3"
						style={formFieldStyle}
						value={profileField.lastName}
						onChange={(e) => handleTextChange(e, 'lastName')}
						isValid={touched.lastName && profileField.lastName !== ''}
						isInvalid={touched.lastName && profileField.lastName === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a last name
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Email</InputGroup.Text>
					<Form.Control
						placeholder={user ? user.email : '' }
						required
						className="rounded-3"
						style={formFieldStyle}
						value={profileField.email}
						onChange={(e) => handleTextChange(e, 'email')}
						isValid={touched.email && isEmailValid(profileField.email)}
						isInvalid={touched.email && !isEmailValid(profileField.email)}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a valid email that ends with @gmail.com, @myumanitoba.ca, @hotmail.com, @yahoo.com
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Old Password</InputGroup.Text>
					<Form.Control
						required
						type="password"
						className="rounded-3"
						style={formFieldStyle}
						value={profileField.oldPassword}
						onChange={(e) => handleTextChange(e, 'oldPassword')}
						isValid={touched.oldPassword && profileField.oldPassword !== ''}
						isInvalid={touched.oldPassword && profileField.oldPassword === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide your old password
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">New Password</InputGroup.Text>
					<Form.Control
						required
						type="password"
						className="rounded-3"
						style={formFieldStyle}
						value={profileField.newPassword}
						onChange={(e) => handleTextChange(e, 'newPassword')}
						isValid={touched.newPassword && profileField.newPassword !== ''}
						isInvalid={touched.newPassword && (AreBothPasswordsSame() || profileField.newPassword === '')}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a new password
					</Form.Control.Feedback>
				</InputGroup>

				<Submit
					onClick={updateUser}
					isLoading={isUpdateLoading}
					label="Update Profile"/>
			</Form>

			{updateProfileFeedback &&
			<FeedbackMessage
				variant={updateProfileFeedback.variant}
				messageHeader={updateProfileFeedback.messageHeader}
				messageDescription={updateProfileFeedback.messageDescription}/>}
		</Row>
	);
};
