import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Table, Tabs, Tab } from 'react-bootstrap';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
} from 'recharts';
import { splitDate } from '../../../common/utils';
import { useOrders } from '../../../contexts/OrderContext';
import { formGroupStyle, inputStyle } from '../auth/AuthFormStyle';

const preferencesScores = [
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

	const {
		orders,
		getOrders
	} = useOrders();

	useEffect(() => {
		getOrders();
	}, []);

	console.log('Logging - Profile');
	console.log(orders);

	const handleChange = (e) => {
		const {
			name,
			value
		} = e.target;
		setUserDetails({
			...userDetails,
			[name]: value
		});
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

	return <Tabs
		defaultActiveKey="profile"
		id="profile-tabs"
		className="mb-3"
		variant="underline"
	>
		<Tab eventKey="profile" title="User Profile">
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Form>
					<Row className="my-2">
						<Col>
							<Form.Group controlId="firstName" style={formGroupStyle}>
								<Form.Control
									type="text"
									name="firstName"
									value={userDetails.firstName}
									onChange={handleChange}
									placeholder="First Name"
									style={inputStyle}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="my-2">
						<Col>
							<Form.Group controlId="lastName">
								<Form.Control
									type="text"
									name="lastName"
									value={userDetails.lastName}
									onChange={handleChange}
									placeholder="Last Name"
									style={inputStyle}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="my-2">
						<Col>
							<Form.Group controlId="email">
								<Form.Control
									type="email"
									name="email"
									value={userDetails.email}
									onChange={handleChange}
									placeholder="Email"
									style={inputStyle}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className="my-1">
						<Col>
							<Form.Group controlId="password">
								<Form.Control
									type="password"
									name="password"
									value={userDetails.password}
									onChange={handleChange}
									placeholder="Password"
									style={inputStyle}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<div
								className="bubble submit mx-auto my-3"
								style={{ cursor: 'pointer' }}
								onClick={handleSubmit}
							>Update</div>
						</Col>
					</Row>
				</Form>
			</div>
		</Tab>
		<Tab eventKey="orders" title="Past Orders">
			<Row>
				<Col>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Table className="table-sm" striped hover responsive style={{ fontSize: '13px' }}>
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
								</tr>
							</thead>
							<tbody>
								{orders.length > 0 && orders.map((order, i) =>
									<tr key={order.id + '-' + i}>
										<td>{order.id}</td>
										<td>{splitDate(order.placedAt)}</td>
										<td>${order.total}</td>
									</tr>)
								}
							</tbody>
						</Table>
					</div>
				</Col>
			</Row>;
		</Tab>
		<Tab eventKey="preferences" title="Preferences">
			<Row>
				<Col>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<RadarChart
							cx={300}
							cy={300}
							outerRadius={150}
							width={500}
							height={500}
							data={preferencesScores}
						>
							<PolarGrid/>
							<PolarAngleAxis dataKey="category"/>
							<PolarRadiusAxis/>
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
			</Row>
		</Tab>
	</Tabs>;
}
