import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DishCard ({ restaurant, dish }) {
	return (
		<Card className="my-3 p-3">
			<Link to={`/restaurants/${restaurant.id}/${dish.id}`}>
				<div className="img-with-popout">
					<Card.Img src="/images/1.jpg" variant="top" />
					<div className="popout" style={{ width: '100%', wordWrap: 'break-word' }}>
						{dish.description || 'No description'}
					</div>
				</div>
			</Link>
			<Card.Body>
				<Card.Title className="text-center" as="div">
					<strong>{dish.name}</strong>
				</Card.Title>
				<Card.Title className="text-center" as="h5">
                    ${dish.price}
				</Card.Title>
			</Card.Body>
		</Card>
	);
}
