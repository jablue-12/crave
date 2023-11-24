import { truncate } from 'lodash';
import React, { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { agent } from '../../../common/api';
import { logger } from '../../../common/utils';
import Loader from '../../common/Loader';
import SubmitButton from '../../common/SubmitButton';

const DishFinder = () => {
	const pre = `Given dishes as json - ${JSON.stringify({
		menu: [
			{
				id: 1,
				name: 'Grilled Salmon',
				description: 'Salmon fillet seasoned and grilled to perfection.',
				rating: 4.5,
				price: 19.99,
				ingredients: [
					{ id: 1, name: 'salmon fillet', quantity: 200 },
					{ id: 2, name: 'lemon', quantity: 1 },
					{ id: 3, name: 'olive oil', quantity: 2 },
					{ id: 4, name: 'salt', quantity: 0.5 }
				]
			},
			{
				id: 2,
				name: 'Caesar Salad',
				description: 'Crisp romaine lettuce, croutons, and parmesan cheese tossed in Caesar dressing.',
				rating: 4.2,
				price: 12.99,
				ingredients: [
					{ id: 5, name: 'romaine lettuce', quantity: 1 },
					{ id: 6, name: 'croutons', quantity: 1 },
					{ id: 7, name: 'parmesan cheese', quantity: 0.5 },
					{ id: 8, name: 'Caesar dressing', quantity: 3 }
				]
			},
			{
				id: 3,
				name: 'Spaghetti Bolognese',
				description: 'Classic Italian dish with ground beef, tomato sauce, and herbs served over spaghetti.',
				rating: 4.8,
				price: 14.99,
				ingredients: [
					{ id: 9, name: 'ground beef', quantity: 300 },
					{ id: 10, name: 'tomato sauce', quantity: 2 },
					{ id: 11, name: 'spaghetti', quantity: 200 },
					{ id: 12, name: 'garlic', quantity: 2 }
				]
			},
			{
				id: 4,
				name: 'Kung Pao Chicken',
				description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.',
				rating: 4.3,
				price: 16.99,
				ingredients: [
					{ id: 13, name: 'chicken breast', quantity: 400 },
					{ id: 2, name: 'peanuts', quantity: 50 },
					{ id: 14, name: 'soy sauce', quantity: 3 },
					{ id: 15, name: 'chili peppers', quantity: 3 }
				]
			},
			{
				id: 5,
				name: 'Dim Sum Platter',
				description: 'Assorted steamed and fried dumplings, perfect for sharing.',
				rating: 4.6,
				price: 18.99,
				ingredients: [
					{ id: 16, name: 'shrimp dumplings', quantity: 40 },
					{ id: 17, name: 'pork buns', quantity: 30 },
					{ id: 18, name: 'vegetable spring rolls', quantity: 40 },
					{ id: 14, name: 'soy sauce', quantity: 0.5 }
				]
			},
			{
				id: 6,
				name: 'Chicken Enchiladas',
				description: 'Tortillas filled with shredded chicken, cheese, and smothered in enchilada sauce.',
				rating: 4.4,
				price: 15.99,
				ingredients: [
					{ id: 13, name: 'shredded chicken', quantity: 200 },
					{ id: 19, name: 'cheddar cheese', quantity: 100 },
					{ id: 20, name: 'enchilada sauce', quantity: 200 },
					{ id: 21, name: 'corn tortillas', quantity: 8 }
				]
			},
			{
				id: 7,
				name: 'Guacamole and Chips',
				description: 'Freshly made guacamole served with crispy tortilla chips.',
				rating: 4.7,
				price: 10.99,
				ingredients: [
					{ id: 22, name: 'avocado', quantity: 200 },
					{ id: 23, name: 'tomato', quantity: 100 },
					{ id: 24, name: 'onion', quantity: 50 },
					{ id: 25, name: 'lime', quantity: 1 }
				]
			},
			{
				id: 8,
				name: 'Beef Bourguignon',
				description: 'Slow-cooked beef stew in red wine with mushrooms and carrots.',
				rating: 4.9,
				price: 22.99,
				ingredients: [
					{ id: 1, name: 'beef chunks', quantity: 500 },
					{ id: 2, name: 'red wine', quantity: 1 },
					{ id: 26, name: 'mushrooms', quantity: 100 },
					{ id: 27, name: 'carrots', quantity: 3 }
				]
			},
			{
				id: 9,
				name: 'Sushi Combo',
				description: 'Assorted sushi rolls including nigiri and maki.',
				rating: 4.5,
				price: 20.99,
				ingredients: [
					{ id: 28, name: 'salmon', quantity: 100 },
					{ id: 11, name: 'rice', quantity: 200 },
					{ id: 29, name: 'seaweed', quantity: 10 },
					{ id: 14, name: 'soy sauce', quantity: 0.5 }
				]
			},
			{
				id: 10,
				name: 'Chicken Teriyaki',
				description: 'Grilled chicken glazed with sweet and savory teriyaki sauce.',
				rating: 4.2,
				price: 17.99,
				ingredients: [
					{ id: 13, name: 'chicken thighs', quantity: 400 },
					{ id: 30, name: 'teriyaki sauce', quantity: 0.5 },
					{ id: 31, name: 'green onions', quantity: 25 },
					{ id: 32, name: 'sesame seeds', quantity: 1 }
				]
			}
		]
	})}. Give me the id of the dish (from the provided json menu) that is the best complementary dish for the following dish `;

	const [content, setContent] = useState('');
	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async () => {
		try {
			setIsLoading(true);
			const { data } = await agent.post('http://localhost:8080/chat', {
				content: pre + content
			});

			setResult(data?.response ?? 'No result');
			setIsLoading(false);
			logger.info(data);
		} catch (error) {
			setIsLoading(false);
			console.error('Error:', error);
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	return <>
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">?</InputGroup.Text>
			<Form.Control value={content} onChange={e => setContent(e.target.value)} />
		</InputGroup>
		<SubmitButton onSubmit={onSubmit} disabled={content.length === 0}>Find</SubmitButton>
		<p>{truncate(result, { length: 100 })}</p>
	</>;
};

export default DishFinder;
