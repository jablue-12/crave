import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import SalesCreation from './components/features/sale/SalesCreation';
import Profile from './components/features/user/Profile';
import Dashboard from './components/pages/Dashboard';
import DishCreation from './components/pages/DishCreation';
import reportWebVitals from './reportWebVitals';
import './bootstrap.css';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<App />}>
		<Route index={true} element={<Dashboard />} />
		<Route path="/profile" element={<Profile />} />
		<Route path="/dish-creation" element={<DishCreation />} />
		<Route path="/sales" element={<SalesCreation />} />
	</Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router}/>
);

reportWebVitals();
