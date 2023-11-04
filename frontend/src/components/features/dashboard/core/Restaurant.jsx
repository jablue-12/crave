import { orderBy, take } from 'lodash';
import React from 'react';
import { Badge, Col, Image, ListGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FaLocationDot } from 'react-icons/fa6';
import { MdRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import { iconColor } from '../../../../common/constants';
import { weeklyOrders } from './../../../../sample/weeklyOrders';
import Comments from './Comments';
import PriceLevel from './PriceLevel';
import RatingBar from './RatingBar';

const Restaurant = ({ restaurant }) => {
	return <>
		{restaurant && <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
			<h4>{restaurant.name}</h4>
			<span style={{ display: 'flex', justifyContent: 'around', alignItems: 'center', paddingBottom: '10px' }}>
				<FaLocationDot className="mx-2" color={iconColor} />
				<span className="mx-2">{restaurant.location}</span>
				<Link className="mx-2" to={`/restaurants/${restaurant.id}`}>
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
			<Col>
				<OverlayTrigger
					key="bottom"
					placement="bottom"
					overlay={
						<Tooltip id="tooltip-bottom" style={{ opacity: 0.8 }}>
							{restaurant.description}
						</Tooltip>
					}
				>
					<Image rounded fluid src="/images/1.jpg" />
				</OverlayTrigger>
			</Col>
			<Col>
				<ListGroup variant="flush" style={{ fontSize: '14px' }}>
					<ListGroup.Item>
						<Row>
							<Col>
								<PriceLevel level={restaurant.priceLevel} />
							</Col>
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>
						<Row>
							<Col md={9}>
								<RatingBar rating={restaurant.rating} />
							</Col>
							<Col md={3} style={{ fontSize: '13px' }}>
								<div className="py-1">{restaurant.rating || 'N/A'}</div>
							</Col>
						</Row>
					</ListGroup.Item>
					<ListGroup.Item>{take(restaurant.tags, 3).map(tag =>
						<Badge pill bg="success" key={tag}>{tag}</Badge>)}
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
		<Row className="mt-3">
			<Col>
				<h6>Comments</h6>
				<Comments comments={orderBy(restaurant.comments, ['date'], ['desc'])} />
			</Col>
		</Row>
		<Row className="mt-3">
			<h6>Trend</h6>
			<Col>
				<LineChart fontSize={13} width={425} height={200} data={weeklyOrders}
					margin={{ top: 20, right: 30, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="day" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="orders" stroke="#8884d8" />
				</LineChart>
			</Col>
		</Row>
	</>;
};

export default Restaurant;
