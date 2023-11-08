import React from 'react';
import { Badge, Col, Image, ListGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { BsInfoLg } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa6';
import { MdRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { iconColor, infoColor } from '../../../../common/constants';
import { useCart } from '../../../../contexts/CartContext';
import ActivePieChart from './../../../common/ActivePieChart';
import Comments from './Comments';
import RatingBar from './RatingBar';

const Restaurant = ({ dish }) => {
	const { add } = useCart();

	return <>
		{dish && <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
			<h4>{dish.name}</h4>
			<span style={{ display: 'flex', justifyContent: 'around', alignItems: 'center', paddingBottom: '10px' }}>
				<Badge className="mx-2" pill bg="success">tag</Badge>
				<Link className="mx-2" to={`/restaurants/${dish.id}`}>
					<MdRestaurantMenu
						color="orange"
						style={{
							marginBottom: '5px',
							cursor: 'pointer'
						}}
					/>
				</Link>
			</span>
		</div>}
		<Row>
			<h6 className="my-2">Tags</h6>
			<Col md={6}>
				<OverlayTrigger
					key="bottom"
					placement="bottom"
					overlay={
						<Tooltip id="tooltip-bottom" style={{ opacity: 0.8 }}>
							{dish.description}
						</Tooltip>
					}
				>
					<Image rounded fluid src="/images/1.jpg" />
				</OverlayTrigger>
			</Col>
			<Col md={6}>
				<ListGroup variant="flush" style={{ fontSize: '14px' }}>
					<ListGroup.Item>
						<Row>
							<Col md={9}>
								<RatingBar rating={dish.rating} />
							</Col>
							<Col md={3} style={{ fontSize: '13px' }}>
								<div className="py-1">{dish.rating || 'N/A'}</div>
							</Col>
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
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
		<Row className="mt-3" style={{ height: 250 }}>
			<h6>Ingredients</h6>
			<Col>
				<ActivePieChart />
			</Col>
		</Row>
		<Row className="mt-3">
			<Col>
				<h6>Comments</h6>
				<Comments />
			</Col>
		</Row>
	</>;
};

export default Restaurant;
