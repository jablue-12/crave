import { orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Badge, Col, Image, ListGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { BsInfoLg } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa6';
import { MdRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
// import { weeklyOrders } from './../../../../sample/weeklyOrders';
import { agent } from '../../../../common/api';
import { REQUEST_TIMEOUT, endpoint, iconColor, infoColor } from '../../../../common/constants';
import { useCart } from '../../../../contexts/CartContext';
import { mockComments } from '../../../../sample/mockComments';
import Loader from '../../../common/Loader';
import ActivePieChart from './../../../common/ActivePieChart';
import Comments from './Comments';
import RatingBar from './RatingBar';

const Restaurant = ({ dish }) => {
	const [comments, setComments] = useState(mockComments);
	const [isLoading, setIsLoading] = useState(true);
	const { add } = useCart();

	const controller = new AbortController();
	useEffect(() => {
		(async () => {
			try {
				const timer = setTimeout(() => {
					controller.abort();
				}, REQUEST_TIMEOUT);

				// TODO - dishes
				const { data } = await agent.get(
					`${endpoint.RESTAURANTS}/${dish.id}${endpoint.COMMENTS}`,
					controller.signal);

				clearTimeout(timer);

				setComments(data);
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				setIsLoading(false);
			}
		})();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

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
			<Col>
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
			<Col>
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
				<Comments comments={orderBy(comments, ['date'], ['desc'])} />
			</Col>
		</Row>
	</>;
};

export default Restaurant;
