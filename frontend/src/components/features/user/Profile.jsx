import React, { useEffect } from 'react';
import { Col, Row, Table, Tabs, Tab, Container } from 'react-bootstrap';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
} from 'recharts';
import { splitDate } from '../../../common/utils';
import { useAuth } from '../../../contexts/AuthContext';
import { useOrders } from '../../../contexts/OrderContext';
import { ProfileForm } from '../auth/ProfileForm';

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
	const { isAdmin } = useAuth();
	const {
		orders,
		getOrders
	} = useOrders();

	const containerStyle = {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '30px'
	};

	useEffect(() => {
		getOrders();
	}, []);

	if (isAdmin) {
		return <Container>
			<Row className="mx-1">
				<h4>Update your account</h4>
			</Row>
			<ProfileForm/>
		</Container>;
	}

	return <Tabs
		defaultActiveKey="profile"
		id="profile-tabs"
		className="mb-3"
		variant="underline"
		fill
	>
		<Tab eventKey="profile" title="User Profile">
			<Container style={containerStyle}>
				<ProfileForm/>
			</Container>
		</Tab>
		<Tab eventKey="orders" title="Past Orders">
			<Container style={containerStyle}>
				<Row>
					<Col>
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
					</Col>
				</Row>
			</Container>
		</Tab>
		<Tab eventKey="preferences" title="Preferences">
			<Container style={containerStyle}>
				<Row>
					<Col>
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
					</Col>
				</Row>
			</Container>
		</Tab>
	</Tabs>;
}
