import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function RestaurantCard ({ restaurant }) {
	return <Card style={{ width: '15rem' }}>
		<Card.Img src={restaurant.imageUrl} />
		<Card.Body>
			<Card.Title>{restaurant.name}</Card.Title>
			<Card.Text>{restaurant.location}</Card.Text>
			<Button>View</Button>
		</Card.Body>
	</Card>;
}
