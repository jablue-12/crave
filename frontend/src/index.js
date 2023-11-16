import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from './components/features/user/Profile';
import Catalog from './components/pages/Catalog';
import Dashboard from './components/pages/Dashboard';
import DishCreation from './components/pages/DishCreation';
=======
import Menu from './components/features/catalog/Menu';
=======
>>>>>>> 5ffd710... Add typewriter to header
import Profile from './components/features/user/Profile';
import Catalog from './components/pages/Catalog';
import Dashboard from './components/pages/Dashboard';
>>>>>>> 85a6cf9... Refactor frontend
import reportWebVitals from './reportWebVitals';
import './bootstrap.css';

const router = createBrowserRouter(createRoutesFromElements(
	<Route path="/" element={<App />}>
		<Route index={true} element={<Dashboard />} />
<<<<<<< HEAD
<<<<<<< HEAD
		<Route path="/restaurants/:id" element={<Catalog />} />
		<Route path="/profile" element={<Profile />} />
		<Route path="/dish-creation" element={<DishCreation />} />
=======
		<Route path="/restaurants/:id" element={<Menu />} />
=======
		<Route path="/restaurants/:id" element={<Catalog />} />
>>>>>>> 5ffd710... Add typewriter to header
		<Route path="/profile" element={<Profile />} />
>>>>>>> 85a6cf9... Refactor frontend
	</Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router}/>
);

reportWebVitals();
