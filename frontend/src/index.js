import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import Cart from './components/cart/Cart';
import RestaurantsDashboard from './components/dashboard/RestaurantsDashboard';
import Dish from './components/dish/Dish';
import Menu from './components/menu/Menu';
import reportWebVitals from './reportWebVitals';
import './bootstrap.css';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<App />}>
		<Route
			index={true}
			element={<RestaurantsDashboard />}
		/>
		<Route
			path="/restaurants/:restaurantid"
			element={<Menu />}
		/>
		<Route
			path="/restaurants/:restaurantid/:dishid"
			element={<Dish />}
		/>
		<Route
			path="/cart"
			element={<Cart />}
		/>
	</Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
