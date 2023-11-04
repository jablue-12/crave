import React from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';

const DishCard = ({ dish }) => {
	return <>
		<Row>
			<Col md={6}>
				<Image
					src={dish.photos ? dish.photos[0].getUrl() : '/images/1.jpg'}
					fluid
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderRadius: '5px',
						cursor: 'pointer'
					}}
					alt={dish.name}
				/>
			</Col>
			<Col md={5}>
				<ListGroup variant="flush" style={{ fontSize: '14px' }}>
					<ListGroup.Item>
						<h6>{dish.name}</h6>
					</ListGroup.Item>
					<ListGroup.Item>
						${dish.price}
					</ListGroup.Item>
					<ListGroup.Item style={{ fontSize: '12px' }}>
						{dish.description}
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
	</>;
};

export default DishCard;
