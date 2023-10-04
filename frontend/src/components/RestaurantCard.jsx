import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const RestaurantCard = ({ restaurant }) => {
	return <Card style={{ width: '20rem' }}>
		<Card.Img
			src={restaurant.imageUrl}
			style={{ height: '200px', objectFit: 'cover' }}
			alt={restaurant.name}
		/>
		<Card.Body>
			<Card.Title>{restaurant.name}</Card.Title>
			<Card.Text>{restaurant.location}</Card.Text>
			<Button>View</Button>
		</Card.Body>
	</Card>;
};

RestaurantCard.propTypes = {
	restaurant: PropTypes.object.isRequired // Use the appropriate data type and validation
};

export default RestaurantCard;
