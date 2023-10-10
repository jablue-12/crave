import React from 'react';
import './App.css';
import RestaurantsDashboard from './components/dashboard/RestaurantsDashboard';
import { RestaurantsProvider } from './contexts/RestaurantsContext';

function App () {
	return <div className="container">
		<RestaurantsProvider>
			<RestaurantsDashboard />
		</RestaurantsProvider>
	</div>;
}

export default App;
