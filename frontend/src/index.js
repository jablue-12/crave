import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import Menu from './components/features/catalog/Menu';
import Profile from './components/features/user/Profile';
import Dashboard from './components/pages/Dashboard';
import reportWebVitals from './reportWebVitals';
import './bootstrap.css';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<App />}>
		<Route index={true} element={<Dashboard />} />
		<Route path="/restaurants/:id" element={<Menu />} />
		<Route path="/profile" element={<Profile />} />
	</Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router}/>
);

reportWebVitals();
