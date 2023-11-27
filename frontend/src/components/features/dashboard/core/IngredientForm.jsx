import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { agent } from '../../../../common/api';
import { endpoint } from '../../../../common/constants';
import { useDishCreation } from '../../../../contexts/DishCreationContext';
import { FeedbackMessage } from '../../../common/FeedbackMessage';

export const IngredientForm = () => {
	const { setNewIngredientResponse } = useDishCreation();

	const placeholderIngredient = {
		name: 'e.g. Chicken',
		tag: 'e.g. Chicken',
		quantity: 'e.g. 3'
	};

	const [newIngredient, setNewIngredient] = useState({
		name: '',
		tag: '',
		quantity: ''
	});

	const [touched, setTouched] = useState(
		{
			name: false,
			tag: false,
			quantity: false
		}
	);

	// eslint-disable-next-line no-unused-vars
	const [isIngredientLoading, setIsIngredientLoading] = useState(false);

	const [ingredientCreationFeedback, setIngredientCreationFeedback] = useState(null);

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: 'Successful ingredient creation',
			messageDescription: `Ingredient ${newIngredient.name} has been added to the menu successfully.`
		};
	};

	// TODO
	// eslint-disable-next-line no-unused-vars
	const getErrorFeedback = () => {
		return {
			variant: 'danger',
			messageHeader: 'Error with ingredient creation',
			messageDescription: `Ingredient ${newIngredient.name} has not been added to the menu.`
		};
	};

	const handleTextChange = (e, key) => {
		setNewIngredient({ ...newIngredient, [key]: e.target.value });
		setTouched({ ...touched, [key]: true });
	};

	const handleQuantityChange = (e) => {
		const inputValue = parseFloat(e.target.value);
		if (!isNaN(inputValue) && inputValue > 0) {
			// Only update the state if the input is a valid positive number
			setNewIngredient({ ...newIngredient, quantity: parseFloat(inputValue.toFixed(2)) });
		} else {
			setNewIngredient({ ...newIngredient, quantity: '' });
		}

		setTouched({ ...touched, quantity: true });
	};

	const resetIngredient = () => {
		const ingredient = {
			name: '',
			tag: '',
			quantity: ''
		};

		setNewIngredient(ingredient);
	};

	const resetTouch = () => {
		const touch = {
			name: false,
			tag: false,
			quantity: false
		};
		setTouched(touch);
	};

	const markFieldsAsTouched = () => {
		const touch = {
			name: true,
			tag: true,
			quantity: true
		};
		setTouched(touch);
	};

	const isFormValid = () => {
		return newIngredient.name !== '' &&
			newIngredient.tag !== '' &&
			newIngredient.quantity !== '';
	};

	const createIngredient = async () => {
		if (isFormValid()) {
			setIsIngredientLoading(true);
			setIngredientCreationFeedback(null);
			try {
				const { data } = await agent.postTokenized(
					`${endpoint.INGREDIENTS}`,
					newIngredient);

				setNewIngredientResponse(data);
				setIngredientCreationFeedback(getSuccessFeedback);
			} catch (e) {
				setIngredientCreationFeedback(getErrorFeedback);
			} finally {
				resetTouch();
				resetIngredient();
				setIsIngredientLoading(false);

				// Set IngredientCreationFeedback to null after 3 seconds to disappear
				setTimeout(() => {
					setIngredientCreationFeedback(null);
				}, 3000);
			}
		} else {
			markFieldsAsTouched();
		}
	};

	return (
		<Row className="w-50">
			<Form as={Col} className="p-3">
				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Ingredient Name</InputGroup.Text>
					<Form.Control
						placeholder={placeholderIngredient.name}
						required
						className="rounded-3"
						value={newIngredient.name}
						onChange={(e) => handleTextChange(e, 'name')}
						isValid={touched.name && newIngredient.name !== ''}
						isInvalid={touched.name && newIngredient.name === ''}
					/>

					<Form.Control.Feedback type="invalid">
						Please provide a name
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Ingredient Tag</InputGroup.Text>
					<Form.Control
						placeholder={placeholderIngredient.tag}
						required
						className="rounded-3"
						value={newIngredient.tag}
						onChange={(e) => handleTextChange(e, 'tag')}
						isValid={touched.tag && newIngredient.tag !== ''}
						isInvalid={touched.tag && newIngredient.tag === ''}
					/>
					<Form.Control.Feedback type="invalid">
						Please provide a tag
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-3 mx-1">Ingredient Quantity</InputGroup.Text>
					<Form.Control
						placeholder={placeholderIngredient.quantity}
						required
						className="rounded-3"
						type="number"
						value={newIngredient.quantity}
						onChange={(e) => handleQuantityChange(e)}
						isValid={touched.quantity && newIngredient.quantity !== ''}
						isInvalid={touched.quantity && newIngredient.quantity === ''}
					/>
					<Form.Control.Feedback type="invalid">
						Please provide a quantity
					</Form.Control.Feedback>
				</InputGroup>

				<Button
					className="bubble submit w-auto mt-1 mx-auto px-3"
					onClick={() => createIngredient()}
					disabled={isIngredientLoading}
				>
					<span style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
						fontSize: '14px'
					}}>
						{isIngredientLoading
							? (
								<>
									<Spinner size="sm"/> Loading...
								</>)
							: 'Add Ingredient'}
					</span>
				</Button>
			</Form>

			{ingredientCreationFeedback &&
			<FeedbackMessage
				variant={ingredientCreationFeedback.variant}
				messageHeader={ingredientCreationFeedback.messageHeader}
				messageDescription={ingredientCreationFeedback.messageDescription}/>}
		</Row>
	);
};
