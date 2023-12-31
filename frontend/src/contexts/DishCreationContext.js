import React, { createContext, useContext, useState, useEffect } from 'react';
import { endpoint } from '../common/constants';
import { restful } from './../common/api';

const DishCreationContext = createContext();

export const useDishCreation = () => {
	return useContext(DishCreationContext);
};

export const DishCreationProvider = ({ children }) => {
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

	const [newIngredientResponse, setNewIngredientResponse] = useState(null);

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

	const updateIngredientIds = () => {
		const mapIds = ingredients.map((ingredient) => ingredient.id);
		setNewDish((prevDish) => ({ ...prevDish, ingredientIds: mapIds }));
	};

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: '',
			messageDescription: `Dish ${newDish.name} has been added to the menu successfully.`
		};
	};

	const getErrorFeedback = () => {
		return {
			variant: 'danger',
			messageHeader: '',
			messageDescription: `Error. Dish ${newDish.name} has not been added to the menu.`
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
		setSelectedIngredient('');
		setIngredients([]);
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
			newDish.description.length <= 150 &&
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
				const { data } = await restful.auth.json.post(`${endpoint.DISHES}`, newDish);

				if (newDish.image) {
					await restful.auth.form.post(`${endpoint.DISHES}/${data.id}/image`, newDish.image);
				}

				setDishCreationFeedback(getSuccessFeedback);
			} catch (e) {
				console.error(e);
				setDishCreationFeedback(getErrorFeedback);
			} finally {
				resetDish();
				resetTouch();
				setIsDishLoading(false);
				// Set dishCreationFeedback to null after 3 seconds disappear
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
			const { data } = await restful.get(endpoint.INGREDIENTS);
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
		initIngredientOptions();
	}, [newIngredientResponse]);

	useEffect(() => {
		updateIngredientIds();
	}, [ingredients]);

	const value = {
		placeholderDish,
		newDish,
		setNewDish,
		touched,
		setTouched,
		ingredientOptions,
		setIngredientOptions,
		ingredients,
		setIngredients,
		selectedIngredient,
		setSelectedIngredient,
		isIngredientOptionLoading,
		setIsIngredientOptionLoading,
		isDishLoading,
		setIsDishLoading,
		dishCreationFeedback,
		setDishCreationFeedback,
		createDish,
		newIngredientResponse,
		setNewIngredientResponse
	};

	return (
		<DishCreationContext.Provider
			value={value}>
			{children}
		</DishCreationContext.Provider>
	);
};
