<<<<<<< HEAD
<<<<<<< HEAD
import axios from 'axios';
import { sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
=======
import React from 'react';
>>>>>>> 85a6cf9... Refactor frontend
=======
import axios from 'axios';
import { replace, split, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
} from 'recharts';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { splitDate } from '../../../common/utils';
import { useOrders } from '../../../contexts/OrderContext';
import ActivePieChart from '../../common/ActivePieChart';
import { mockOrders } from './../../../sample/orders';
=======
>>>>>>> 85a6cf9... Refactor frontend
=======
=======
import { useOrders } from '../../../contexts/OrderContext';
import ActivePieChart from '../../common/ActivePieChart';
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import { mockOrders } from './../../../sample/orders';
>>>>>>> 1cd73ca... Add token to axios calls and refactor components

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
	const orders = mockOrders;

>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
	const [userDetails, setUserDetails] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: ''
	});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
	const { orders, getOrders } = useOrders();

	useEffect(() => {
		getOrders();
	}, []);

<<<<<<< HEAD
=======
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
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
<<<<<<< HEAD
<<<<<<< HEAD
						Save
					</Button>
				</Form>
			</Col>
			<Col md={6}>
				<ActivePieChart />
			</Col>
=======
        Update User
					</Button>
				</Form>
			</Col>
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
						Save
					</Button>
				</Form>
			</Col>
			<Col md={6}>
				<ActivePieChart />
			</Col>
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
						{(orders.length > 0
							? orders.map(o => ({
								...o.orderInfo,
								total: sumBy(o.orderItems, i => i.price)
							}))
							: mockOrders).map(order =>
<<<<<<< HEAD
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{splitDate(order.placedAt)}</td>
								<td>${order.total}</td>
=======
						{orders.map(order =>
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.placedAt}</td>
								<td>{order.total}</td>
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{replace(split(order.placedAt, '.')[0], 'T', ' ')}</td>
								<td>${order.total}</td>
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
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
<<<<<<< HEAD
=======
	return (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
			<RadarChart
				cx={300}
				cy={250}
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
	);
>>>>>>> 85a6cf9... Refactor frontend
=======
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
}
