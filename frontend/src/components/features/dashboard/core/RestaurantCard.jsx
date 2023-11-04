import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import PriceLevel from './PriceLevel';
import RatingBar from './RatingBar';

const RestaurantCard = ({ restaurant, setRestaurant }) => {
	return <div className="my-2">
		<Row>
			<Col md={5}>
				<Image
					onClick={() => setRestaurant(restaurant)}
					src={restaurant.photos ? restaurant.photos[0].getUrl() : '/images/1.jpg'}
					fluid
					style={{
						width: '100%',
						height: '120px',
						objectFit: 'cover',
						borderRadius: '5px',
						cursor: 'pointer'
					}}
					alt={restaurant.name}
				/>
			</Col>
			<Col md={7}>
				<ListGroup variant="flush" style={{ fontSize: '14px' }}>
					<ListGroup.Item>
						<h6>{restaurant.name}</h6>
					</ListGroup.Item>
					{restaurant.priceLevel && <ListGroup.Item>
						<PriceLevel level={restaurant.priceLevel} />
					</ListGroup.Item>}
					<ListGroup.Item>
						<Row>
							<Col xs={6} sm={6} md={5}>
								<RatingBar rating={restaurant.rating} />
							</Col>
							<Col xs={6} sm={3} md={3} style={{ fontSize: '13px' }}>
								<div className="py-1">{restaurant.rating || 'N/A'}</div>
							</Col>
						</Row>
					</ListGroup.Item>
					<ListGroup.Item style={{ fontSize: '12px' }}>
						{restaurant.vicinity}
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
	</div>;
};

export default RestaurantCard;
