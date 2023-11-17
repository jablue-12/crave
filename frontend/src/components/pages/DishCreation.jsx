import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { agent } from '../../common/api';
import { REQUEST_TIMEOUT, endpoint } from '../../common/constants';
import { FeedbackMessage } from '../common/FeedbackMessage';
import Loader from '../common/Loader';
import Ingredient from '../features/dashboard/core/Ingredient';

export default function DishCreation () {
	const controller = new AbortController();

	const placeholderDish = {
		name: 'e.g. Chicken Alfredo',
		description: 'e.g. Chicken Alfredo is a delectable Italian-American dish featuring grilled chicken atop fettuccine pasta, bathed in a luxuriously creamy Alfredo sauce.',
		tag: 'e.g. Chicken',
		rating: 'e.g. 4.5',
		price: '12.99'
	};

	const [newDish, setNewDish] = useState(
		{
			name: '',
			description: '',
			tag: '',
			rating: '',
			price: '',
			image: '',
			ingredientIds: []
		}
	);

	const [touched, setTouched] = useState(
		{
			name: false,
			description: false,
			tag: false,
			rating: false,
			price: false
		}
	);

	const [ingredientOptions, setIngredientOptions] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [selectedIngredient, setSelectedIngredient] = useState('');

	const [isIngredientOptionLoading, setIsIngredientOptionLoading] = useState(false);
	const [isDishLoading, setIsDishLoading] = useState(false);

	const [dishCreationFeedback, setDishCreationFeedback] = useState(null);

	const handleTextChange = (e, key) => {
		setNewDish({ ...newDish, [key]: e.target.value });
		setTouched({ ...touched, [key]: true });
	};

	const handlePriceChange = (e) => {
		const inputValue = parseFloat(e.target.value);
		if (!isNaN(inputValue) && inputValue > 0) {
			// Only update the state if the input is a valid positive number
			setNewDish({ ...newDish, price: parseFloat(inputValue.toFixed(2)) });
		} else {
			setNewDish({ ...newDish, price: '' });
		}

		setTouched({ ...touched, price: true });
	};

	const handleRatingChange = (e) => {
		const inputValue = parseFloat(e.target.value);
		if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 5) {
			// Only update the state if the input is a valid positive number
			setNewDish({ ...newDish, rating: parseFloat(inputValue.toFixed(2)) });
		} else {
			setNewDish({ ...newDish, rating: '' });
		}

		setTouched({ ...touched, rating: true });
	};

	const handleIngredientChange = (e) => {
		const selectedId = e.target.value;

		if (selectedId) {
			const selectedObject = ingredientOptions.find((ingredient) => ingredient.id === parseInt(selectedId));

			const isIngredientInList = ingredients.some((ingredient) => ingredient.id === selectedObject.id);
			if (!isIngredientInList) {
				setSelectedIngredient((prevSelectedIngredient) => {
					// Combine the previous state with the new selectedObject
					const updatedIngredient = { ...prevSelectedIngredient, ...selectedObject };

					// Update the ingredients array
					setIngredients((prevIngredients) => [...prevIngredients, updatedIngredient]);

					// Return the updated state
					return updatedIngredient;
				});
			}
		}
	};

	const handleImageChange = (e) => {
		// Access the first file in the FileList
		const selectedFiles = e.target.files;

		setNewDish({
			...newDish,
			image: selectedFiles
		});
	};

	const deleteIngredient = (ingredientId) => {
		const filterIngredients = ingredients.filter((ingredient) => ingredient.id !== parseInt(ingredientId));
		setIngredients(filterIngredients);
	};

	const updateIngredientIds = () => {
		const mapIds = ingredients.map((ingredient) => ingredient.id);
		setNewDish((prevDish) => ({ ...prevDish, ingredientIds: mapIds }));
	};

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: 'Successful dish creation',
			messageDescription: `Dish ${newDish.name} has been added to the menu successfully.`
		};
	};

	const getErrorFeedback = () => {
		return {
			variant: 'danger',
			messageHeader: 'Error with dish creation',
			messageDescription: `Dish ${newDish.name} has not been added to the menu.`
		};
	};

	const resetDish = () => {
		const dish = {
			name: '',
			description: '',
			tag: '',
			rating: '',
			price: '',
			image: '',
			ingredientIds: []
		};

		setNewDish(dish);
	};

	const resetTouch = () => {
		const touch = {
			name: false,
			description: false,
			tag: false,
			rating: false,
			price: false
		};
		setTouched(touch);
	};

	const markFieldsAsTouched = () => {
		const touch = {
			name: true,
			description: true,
			tag: true,
			rating: true,
			price: true
		};
		setTouched(touch);
	};

	const isFormValid = () => {
		return newDish.name !== '' &&
			newDish.description !== '' &&
			newDish.tag !== '' &&
			newDish.price !== '' &&
			newDish.rating !== '';
	};

	const createDish = async () => {
		updateIngredientIds();
		if (isFormValid()) {
			setIsDishLoading(true);
			setDishCreationFeedback(null);
			try {
				await agent.postTokenized(
					`${endpoint.DISHES}`,
					newDish);
				setDishCreationFeedback(getSuccessFeedback);
			} catch (e) {
				console.error(e);
				setDishCreationFeedback(getErrorFeedback);
			} finally {
				resetDish();
				resetTouch();
				setIsDishLoading(false);
				// Set dishCreationFeedback to null after 2 seconds
				setTimeout(() => {
					setDishCreationFeedback(null);
				}, 3000);
			}
		} else {
			markFieldsAsTouched();
		}
	};

	const initIngredientOptions = async () => {
		setIsIngredientOptionLoading(true);
		try {
			const timer = setTimeout(() => {
				controller.abort();
			}, REQUEST_TIMEOUT);

			const { data } = await agent.get(endpoint.INGREDIENTS, controller.signal);

			clearTimeout(timer);
			setIngredientOptions(data);
		} catch (e) {
			console.error(e);
		} finally {
			setIsIngredientOptionLoading(false);
		}
	};

	useEffect(() => {
		initIngredientOptions();
	}, []);

	useEffect(() => {
		updateIngredientIds();
	}, [ingredients]);

	if (isIngredientOptionLoading) {
		return <Loader />;
	}

	return (
		<Container>
			<Row>
				<Form as={Col} className="mb-3">
					<InputGroup className="mb-3">
						<InputGroup.Text>Dish Name</InputGroup.Text>
						<Form.Control
							placeholder={placeholderDish.name}
							required
							value={newDish.name}
							onChange={(e) => handleTextChange(e, 'name')}
							isValid={touched.name && newDish.name !== ''}
							isInvalid={touched.name && newDish.name === ''}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a name
						</Form.Control.Feedback>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Text>Description</InputGroup.Text>
						<Form.Control
							placeholder={placeholderDish.description}
							required
							as="textarea"
							value={newDish.description}
							onChange={(e) => handleTextChange(e, 'description')}
							isValid={touched.description && newDish.description !== ''}
							isInvalid={touched.description && newDish.description === ''}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a description
						</Form.Control.Feedback>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Text>Dish Tag</InputGroup.Text>
						<Form.Control
							placeholder={placeholderDish.tag}
							required
							value={newDish.tag}
							onChange={(e) => handleTextChange(e, 'tag')}
							isValid={touched.tag && newDish.tag !== ''}
							isInvalid={touched.tag && newDish.tag === ''}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a tag
						</Form.Control.Feedback>
					</InputGroup>

					<Form.Select
						aria-label="Select ingredients"
						className="mb-3"
						value={selectedIngredient ? selectedIngredient.id : ''}
						onChange={(e) => handleIngredientChange(e)}
					>
						<option value="">
						Select Ingredients
						</option>
						{ingredientOptions.map((ingredient) => (
							<option key={ingredient.id} value={ingredient.id}>
								{ingredient.name}
							</option>
						))}
					</Form.Select>

					{ingredients.length > 0 &&
						<Row className="mb-3">
							{ingredients.map((ingredient) => (
								<Col xs="auto" key={ingredient.id} >
									<Ingredient ingredient={ingredient} onButtonClick={deleteIngredient}/>
								</Col>
							))}
						</Row>
					}

					<InputGroup className="mb-3">
						<InputGroup.Text>$</InputGroup.Text>
						<Form.Control
							placeholder={placeholderDish.price}
							required
							type="number"
							value={newDish.price}
							onChange={(e) => handlePriceChange(e)}
							isValid={touched.price && newDish.price !== ''}
							isInvalid={touched.price && newDish.price === ''}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a dish price
						</Form.Control.Feedback>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Text style={{ fontSize: 'smaller' }}>
							Rate&nbsp;&#8260;&nbsp;5
						</InputGroup.Text>
						<Form.Control
							placeholder={placeholderDish.rating}
							required
							type="number"
							value={newDish.rating}
							onChange={(e) => handleRatingChange(e)}
							isValid={touched.rating && newDish.rating !== ''}
							isInvalid={touched.rating && newDish.rating === ''}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a dish rating
						</Form.Control.Feedback>
					</InputGroup>

					<InputGroup className="mb-3">
						<Form.Control
							type="file"
							required
							onChange={handleImageChange}/>
					</InputGroup>

					<Button
						type="submit"
						className="w-100 mt-1"
						onClick={() => createDish()}
						disabled={isDishLoading}>
						{isDishLoading
							? (
								<>
									<Spinner size="sm"/> Loading...
								</>)
							: 'Create Dish'}
					</Button>

				</Form>

				{dishCreationFeedback &&
				<FeedbackMessage
					variant={dishCreationFeedback.variant}
					messageHeader={dishCreationFeedback.messageHeader}
					messageDescription={dishCreationFeedback.messageDescription}/>}

			</Row>
		</Container>
	);
};
