import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import Profile from './components/features/user/Profile';
import Catalog from './components/pages/Catalog';
import Dashboard from './components/pages/Dashboard';
import DishCreation from './components/pages/DishCreation';
import reportWebVitals from './reportWebVitals';
import './bootstrap.css';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<App />}>
		<Route index={true} element={<Dashboard />} />
		<Route path="/restaurants/:id" element={<Catalog />} />
		<Route path="/profile" element={<Profile />} />
		<Route path="/dish-creation" element={<DishCreation />} />
	</Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router}/>
);

reportWebVitals();
