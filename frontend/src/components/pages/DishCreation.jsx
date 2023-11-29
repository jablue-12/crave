import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { DishForm } from '../features/dashboard/core/DishForm';
import { IngredientForm } from '../features/dashboard/core/IngredientForm';

const containerStyle = {
	display: 'flex',
	justifyContent: 'center',
	marginTop: '30px'
};

export default function DishCreation () {
	return (
		<Container>
			<Tabs
				defaultActiveKey="dish-creation"
				className="mb-3"
				variant="underline"
				fill
			>
				<Tab eventKey="dish-creation" title="Create Dish" >
					<Container style={containerStyle}>
						<DishForm/>
					</Container>
				</Tab>
				<Tab eventKey="ingredient-creation" title="Create Ingredient">
					<Container style={containerStyle}>
						<IngredientForm/>
					</Container>
				</Tab>
				<Tab eventKey="sales-creation" title="Create Sales">
					<Container style={containerStyle}>
						Create Sales
					</Container>
				</Tab>
			</Tabs>
		</Container>
	);
};
