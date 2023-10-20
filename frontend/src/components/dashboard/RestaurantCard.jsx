import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';

export default function RestaurantCard ({ restaurant }) {
	return (
		<Card
			className="my-3 p-3"
		>
			<Link to={`/restaurants/${restaurant.id}`}>
				<Card.Img src="/images/1.jpg" variant="top" />
			</Link>
			<Card.Body>
				<Card.Title as="div">
					<strong>{restaurant.name}</strong>
				</Card.Title>
				<Card.Text>
					Location
				</Card.Text>
				<Card.Text as="div">
					<Rating value={restaurant.rating} />
				</Card.Text>
			</Card.Body>
		</Card>
	);
}
