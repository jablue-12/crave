import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { DishForm } from '../features/dashboard/core/DishForm';
import { IngredientForm } from '../features/dashboard/core/IngredientForm';

export default function DishCreation () {
	return (
		<Container>
			<Tabs
				defaultActiveKey="dish-creation"
				className="mb-3"
				variant="underline">
				<Tab eventKey="dish-creation" title="Create Dish">
					<DishForm/>
				</Tab>
				<Tab eventKey="ingredient-creation" title="Create Ingredient">
					<IngredientForm/>
				</Tab>
			</Tabs>
		</Container>
	);
};
