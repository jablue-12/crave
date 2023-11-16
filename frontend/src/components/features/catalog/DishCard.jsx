<<<<<<< HEAD
<<<<<<< HEAD
import React, { memo } from 'react';
import { Col, Image, ListGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { BsInfoLg } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { iconColor, infoColor } from '../../../common/constants';
import { useCart } from '../../../contexts/CartContext';

const DishCard = ({ dish }) => {
	const { add } = useCart();

	return <>
		<Row>
			<Col xs={6} md={6} lg={6} xl={5}>
=======
import React from 'react';
=======
import React, { memo } from 'react';
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import { Col, Image, ListGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { BsInfoLg } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { iconColor, infoColor } from '../../../common/constants';
import { useCart } from '../../../contexts/CartContext';

const DishCard = ({ dish, restaurant }) => {
	const { add } = useCart();

	return <>
		<Row>
<<<<<<< HEAD
<<<<<<< HEAD
			<Col>
>>>>>>> 85a6cf9... Refactor frontend
=======
			<Col md={6}>
>>>>>>> 71a7731... Update styling for top sellers
=======
			<Col xs={6} md={6} lg={6} xl={5}>
>>>>>>> 63043f4... Update styling for menu
				<Image
					src={dish.photos ? dish.photos[0].getUrl() : '/images/1.jpg'}
					fluid
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
<<<<<<< HEAD
<<<<<<< HEAD
						borderRadius: '5px'
					}}
					alt={dish.name}
				/>

			</Col>
			<Col xs={6} md={5} lg={5} xl={5}>
				<ListGroup variant="flush">
					<ListGroup.Item>
						<h6>{dish.name}</h6>
					</ListGroup.Item>
					<ListGroup.Item style={{ fontSize: '14px' }}>
						${dish.price}
					</ListGroup.Item>
					<ListGroup.Item className="d-flex justify-content-start">
						<OverlayTrigger
							key="top"
							placement="top"
							overlay={
								<Tooltip id="tooltip-top" style={{ opacity: 0.8 }}>
									{dish.description}
								</Tooltip>
							}>
							<span>
								<BsInfoLg color={infoColor} style={{ cursor: 'pointer' }}/>
							</span>
						</OverlayTrigger>
						<span
							data-cy="add-to-cart"
							className="mx-3"
							onClick={() => add(dish)}
							style={{ cursor: 'pointer' }}
						>
							<FaCartArrowDown color={iconColor} />
						</span>
=======
						borderRadius: '5px',
						cursor: 'pointer'
=======
						borderRadius: '5px'
>>>>>>> 63043f4... Update styling for menu
					}}
					alt={dish.name}
				/>

			</Col>
			<Col xs={6} md={5} lg={5} xl={5}>
				<ListGroup variant="flush">
					<ListGroup.Item>
						<h6>{dish.name}</h6>
					</ListGroup.Item>
					<ListGroup.Item style={{ fontSize: '14px' }}>
						${dish.price}
					</ListGroup.Item>
<<<<<<< HEAD
					<ListGroup.Item style={{ fontSize: '12px' }}>
						{dish.description}
>>>>>>> 85a6cf9... Refactor frontend
=======
					<ListGroup.Item className="d-flex justify-content-start">
						<OverlayTrigger
							key="top"
							placement="top"
							overlay={
								<Tooltip id="tooltip-top" style={{ opacity: 0.8 }}>
									{dish.description}
								</Tooltip>
							}>
							<span>
								<BsInfoLg color={infoColor} style={{ cursor: 'pointer' }}/>
							</span>
						</OverlayTrigger>
						<span
							className="mx-3"
							onClick={() => add({
								...dish,
								restaurantId: restaurant.id,
								restaurantName: restaurant.name
							})}
							style={{ cursor: 'pointer' }}
						>
							<FaCartArrowDown color={iconColor} />
						</span>
>>>>>>> 63043f4... Update styling for menu
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
	</>;
};

<<<<<<< HEAD
<<<<<<< HEAD
export default memo(DishCard);
=======
export default DishCard;
>>>>>>> 85a6cf9... Refactor frontend
=======
export default memo(DishCard);
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
