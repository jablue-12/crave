import React from 'react';
import './App.css';
import RestaurantsDashboard from './components/RestaurantsDashboard';
import { RestaurantsProvider } from './contexts/RestaurantsContext';

const App = () => {
	return <div className="container">
		<RestaurantsProvider>
			<RestaurantsDashboard />
		</RestaurantsProvider>
	</div>;
};

export default App;
