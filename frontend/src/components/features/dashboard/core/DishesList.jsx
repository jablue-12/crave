import React from 'react';
import { Container } from 'react-bootstrap';
import Scrollable from '../../../common/Scrollable';
import DishCard from './DishCard';

const DishesList = ({ dishes, setSelectedDish }) => {
	return <Container className="px-4">
		<Scrollable height={425}>
			{dishes.map(dish => (
				<DishCard
					key={dish.id}
					dish={dish}
					setSelectedDish={setSelectedDish}
				/>
			))}
		</Scrollable>
	</Container>;
};

export default DishesList;
