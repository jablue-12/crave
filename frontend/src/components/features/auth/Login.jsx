import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import AuthForm from './AuthForm';

export default function Login () {
	const { login } = useAuth();
	return <AuthForm onSubmit={login} />;
}
