import { take } from 'lodash';
import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams } from 'react-router-dom';
import useRestaurant from '../../hooks/useRestaurant';
import DishCard from '../dish/DishCard';
import Loader from '../loader/Loader';
import Rating from '../rating/Rating';

export default function Menu () {
	const menu = [
		{
			id: 1,
			name: 'Dish Name',
			description: 'Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing',
			price: 100
		},
		{
			id: 2,
			name: 'Dish Name',
			description: 'Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing',
			price: 100
		},
		{
			id: 3,
			name: 'Dish Name',
			description: 'Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing',
			price: 100
		},
		{
			id: 4,
			name: 'Dish Name',
			description: 'Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing',
			price: 100
		},
		{
			id: 5,
			name: 'Dish Name',
			description: 'Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing',
			price: 100
		},
		{
			id: 6,
			name: 'Dish Name',
			description: 'Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing Dish Description Testing',
			price: 100
		}
	];

	const { restaurantid } = useParams();

	const { restaurant, loading } = useRestaurant(restaurantid);

	if (loading) {
		return <Loader />;
	}

	const cheating = {
		...restaurant,
		menu
	};

	return (
		<>
			<h1 className="text-center py-3 mb-3">{cheating.name}</h1>
			<Row className="mb-3">
				<Col md={6}>
					<Carousel>
						{take(cheating.menu, 3).map(dish => (
							<Carousel.Item key={dish.id}>
								<Link to={`/restaurants/${restaurant.id}/${dish.id}`}>
									<Image src="/images/1.jpg" rounded fluid />
								</Link>
								<Carousel.Caption>
									<h3 style={{ color: 'white' }}>{dish.name}</h3>
								</Carousel.Caption>
							</Carousel.Item>
						))}
					</Carousel>
				</Col>
				<Col md={6}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Row>
								<Col className="mt-1" md={3}>
									{cheating.name}
								</Col>
								<Col md={3}>
									<Rating value={cheating.rating} />
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item style={{ wordWrap: 'break-word' }}>
							{cheating.description || 'There is a person over there'}
						</ListGroup.Item>
						<ListGroup.Item>

						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
			<Row>
				{cheating.menu.map(dish => (
					<Col key={dish.id} sm={12} md={6} lg={4} xl={3}>
						<DishCard restaurant={restaurant} dish={dish} />
					</Col>
				))}
			</Row>
			<Row>
				<h1>Recommendations</h1>
			</Row>
		</>
	);
}
