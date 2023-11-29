import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { tags } from '../../../../common/dishTags';
import { useDishCreation } from '../../../../contexts/DishCreationContext';
import { FeedbackMessage } from '../../../common/FeedbackMessage';
import Loader from '../../../common/Loader';
import Submit from '../../../common/Submit';
import Ingredient from './Ingredient';

export const DishForm = () => {
	const {
		placeholderDish,
		newDish,
		setNewDish,
		touched,
		setTouched,
		ingredientOptions,
		ingredients,
		setIngredients,
		selectedIngredient,
		setSelectedIngredient,
		isIngredientOptionLoading,
		isDishLoading,
		dishCreationFeedback,
		createDish
	} = useDishCreation();

	const handleTextChange = (e, key) => {
		setNewDish({ ...newDish, [key]: e.target.value });
		setTouched({ ...touched, [key]: true });
	};

	const handleTagChange = (e) => {
		setNewDish({ ...newDish, tag: e.target.value });
		setTouched({ ...touched, tag: true });
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

		const formData = new FormData();
		formData.append('image', selectedFiles[0]);

		setNewDish({
			...newDish,
			image: formData
		});
	};

	const deleteIngredient = (ingredientId) => {
		const filterIngredients = ingredients.filter((ingredient) => ingredient.id !== parseInt(ingredientId));
		setIngredients(filterIngredients);
	};

	if (isIngredientOptionLoading) {
		return <Loader />;
	}
	return (
		<Row className="w-50">
			<Form as={Col} className="p-3">
				<InputGroup className="mb-3">
					<InputGroup.Text className="rounded-2 mx-1">Dish Name</InputGroup.Text>
					<Form.Control
						placeholder={placeholderDish.name}
						required
						className="rounded-3"
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
					<InputGroup.Text className="rounded-2 mx-1">Description</InputGroup.Text>
					<Form.Control
						placeholder={placeholderDish.description}
						required
						className="rounded-3"
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
					<Form.Select
						aria-label="Select Tag"
						className="rounded-3"
						value={newDish.tag ? newDish.tag : ''}
						isValid={touched.tag && newDish.tag !== ''}
						isInvalid={touched.tag && newDish.tag === ''}
						onChange={(e) => handleTagChange(e)}
					>
						<option value="">
						Select Dish Tag
						</option>
						{tags.map((tag, i) => (
							<option key={`${tag}-${i}`} value={tag}>
								{tag}
							</option>
						))}
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						Please provide a dish tag
					</Form.Control.Feedback>
				</InputGroup>

				<Form.Select
					aria-label="Select ingredients"
					className="mb-3 rounded-3"
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
					<InputGroup.Text className="rounded-2 mx-1">$</InputGroup.Text>
					<Form.Control
						placeholder={placeholderDish.price}
						required
						className="rounded-3"
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
					<InputGroup.Text className="rounded-3 mx-1" style={{ fontSize: 'smaller' }}>
						Rate&nbsp;&#8260;&nbsp;5
					</InputGroup.Text>
					<Form.Control
						placeholder={placeholderDish.rating}
						required
						className="rounded-3"
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
						className="rounded-3"
						onChange={handleImageChange}/>
				</InputGroup>

				<Submit
					onClick={createDish}
					isLoading={isDishLoading}
					label="Add Dish"/>
			</Form>

			{dishCreationFeedback &&
			<FeedbackMessage
				variant={dishCreationFeedback.variant}
				messageHeader={dishCreationFeedback.messageHeader}
				messageDescription={dishCreationFeedback.messageDescription}/>}
		</Row>
	);
};
