import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import RatingBar from './RatingBar';

const DishCard = ({ dish, setSelectedDish }) => {
	return <div className="my-3">
		<Row>
			<Col xs={6} md={6}>
				<Image
					data-cy="dish-image"
					onClick={() => setSelectedDish(dish)}
					src={dish.photos ? dish.photos[0].getUrl() : '/images/1.jpg'}
					fluid
					style={{
						width: '100%',
						height: '120px',
						objectFit: 'cover',
						borderRadius: '5px',
						cursor: 'pointer'
					}}
					alt={dish.name}
				/>
			</Col>
			<Col xs={5} md={5}>
				<ListGroup variant="flush" style={{ fontSize: '14px' }}>
					<ListGroup.Item>
						<h6>{dish.name}</h6>
					</ListGroup.Item>
					{<ListGroup.Item>
						${dish.price}
					</ListGroup.Item>}
					<ListGroup.Item>
						<Row>
							<Col xs={6} sm={6} md={7}>
								<RatingBar rating={dish.rating} />
							</Col>
							<Col xs={6} sm={3} md={3} style={{ fontSize: '13px' }}>
								<div className="py-1">{dish.rating || 'N/A'}</div>
							</Col>
						</Row>
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
	</div>;
};

export default DishCard;
