import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import AuthForm from './AuthForm';

export default function Login ({ setIsLoggingIn }) {
	const { login } = useAuth();
	return <AuthForm onSubmit={e => {
		login(e);
		setIsLoggingIn(false);
	}} />;
}
