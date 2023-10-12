import { sum, sumBy } from 'lodash';
import React, { useContext } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export default function Cart () {
	const { dishesInCart, countDish, add, removeOne, remove } = useContext(CartContext);

	const circleButtonStyle = {
		width: '24px',
		height: '24px',
		borderRadius: '10%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		color: '#fff',
		cursor: 'pointer'
	};

	return (
		<Row>
			<Col md={8}>
				<h1 className="text-center py-3">Cart</h1>
				{dishesInCart.length === 0
					? (
						<Link to="/" style={{ textDecoration: 'none' }}>
                            Back to Dashboard
						</Link>
					)
					: <ListGroup variant="flush">
						{dishesInCart.map(dish => (
							<ListGroup.Item key={dish.id}>
								<Row className="align-items-center">
									<Col md={2}>
										<Image rounded src="/images/1.jpg" fluid alt={dish.name} />
									</Col>
									<Col md={3}>
										{dish.name}
									</Col>
									<Col md={2}>
										{countDish(dish.id)}
									</Col>
									<Col md={2}>
										<div style={circleButtonStyle} onClick={() => add(dish)}>+</div>
									</Col>
									<Col md={2}>
										<div style={circleButtonStyle} onClick={() => removeOne(dish.id)}>-</div>
									</Col>
									<Col md={1}>
										<div onClick={() => remove(dish.id)}>
											❌
										</div>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>}
			</Col>
			<Col md={4}>
				<Card style={{ marginTop: '77px' }}>
					<ListGroup variant="flush">
						<ListGroup.Item className="text-center">
							<h3>Subtotal ~ {sum(dishesInCart.map(x => x.quantity))} Items</h3>
							${sumBy(dishesInCart, x => x.price * x.quantity).toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item className="text-center">
							<Button
								className="btn-inherit"
								variant="light"
								type="button"
								disabled={dishesInCart.length === 0}
							><MdOutlineShoppingCartCheckout size={25} /></Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}
