import React from 'react';
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
				<Image
					src={dish.photos ? dish.photos[0].getUrl() : '/images/1.jpg'}
					fluid
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
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
							className="mx-3"
							onClick={() => add(dish)}
							style={{ cursor: 'pointer' }}
						>
							<FaCartArrowDown color={iconColor} />
						</span>
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
	</>;
};

export default DishCard;
