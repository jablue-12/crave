import axios from 'axios';
import { replace, split, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
} from 'recharts';
import { useOrders } from '../../../contexts/OrderContext';
import ActivePieChart from '../../common/ActivePieChart';
import { mockOrders } from './../../../sample/orders';

const data = [
	'Pizza',
	'Sushi',
	'Burgers',
	'Pasta',
	'Tacos',
	'Salads',
	'Sandwiches',
	'Desserts',
	'Seafood',
	'Vegetarian'
].map(category => ({
	category,
	score: Math.floor(Math.random() * 100),
	fullMark: 100
}));

export default function Profile () {
	const [userDetails, setUserDetails] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: ''
	});

	const { orders, getOrders } = useOrders();

	useEffect(() => {
		getOrders();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('your-api-endpoint', userDetails);
			console.log('User updated successfully:', response.data);
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

	return <Container>
		<Row>
			<Col md={6}>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Group controlId="firstName">
								<Form.Control
									type="text"
									name="firstName"
									value={userDetails.firstName}
									onChange={handleChange}
									placeholder="First Name"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="lastName">
								<Form.Control
									type="text"
									name="lastName"
									value={userDetails.lastName}
									onChange={handleChange}
									placeholder="Last Name"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="email">
								<Form.Control
									type="email"
									name="email"
									value={userDetails.email}
									onChange={handleChange}
									placeholder="Email"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="password">
								<Form.Control
									type="password"
									name="password"
									value={userDetails.password}
									onChange={handleChange}
									placeholder="Password"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Button variant="primary" type="submit">
						Save
					</Button>
				</Form>
			</Col>
			<Col md={6}>
				<ActivePieChart />
			</Col>
		</Row>
		<Row>
			<Col md={6}>
				<Table className="table-sm" striped hover responsive style={{ fontSize: '13px' }}>
					<thead>
						<tr>
							<th>ID</th>
							<th>DATE</th>
							<th>TOTAL</th>
						</tr>
					</thead>
					<tbody>
						{(orders.length > 0
							? orders.map(o => ({
								...o.orderInfo,
								total: sumBy(o.orderItems, i => i.price)
							}))
							: mockOrders).map(order =>
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{replace(split(order.placedAt, '.')[0], 'T', ' ')}</td>
								<td>${order.total}</td>
							</tr>)}
					</tbody>
				</Table>
			</Col>
			<Col md={6}>
				<div style={{
					display: 'flex',
					justifyContent: 'center'
				}}>
					<RadarChart
						cx={300}
						cy={300}
						outerRadius={150}
						width={500}
						height={500}
						data={data}
					>
						<PolarGrid />
						<PolarAngleAxis dataKey="category" />
						<PolarRadiusAxis />
						<Radar
							name="Mike"
							dataKey="score"
							stroke="#82ca9d"
							fill="#82ca9d"
							fillOpacity={0.6}
						/>
					</RadarChart>
				</div>
			</Col>
		</Row>;
	</Container>;
}
