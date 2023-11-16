import { sum, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsCartPlusFill, BsFillCartDashFill, BsTrash3Fill } from 'react-icons/bs';
import { GiPayMoney } from 'react-icons/gi';
import { GrMap } from 'react-icons/gr';
import { color } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import { useOrders } from '../../../contexts/OrderContext';
import Scrollable from '../../common/Scrollable';
import Map from '../dashboard/map/Map';

const ShoppingCart = ({ isSliderOn, setIsSliderOn }) => {
	const [location, setLocation] = useState({ lat: null, lng: null });
	const [isMapOn, setIsMapOn] = useState(false);

	const { dishesInCart, add, removeOne, remove } = useCart();
	const { placeOrder } = useOrders();
	useAuth();

	console.log(location);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			});
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}, []);

	const onPlaceOrder = () => {
		// TODO - replace with actual user
		const orderInfo = {
			id: 1,
			placedAt: new Date().toISOString(),
			username: 'John Doe', // TODO - `${firstname} ${lastname}`,
			email: 'xr323@gmail.com'
		};
		placeOrder({ orderInfo, orderItems: dishesInCart });
	};

	return <Offcanvas show={isSliderOn} onHide={() => setIsSliderOn(false)} placement="end" name="end">
		<Offcanvas.Header closeButton>
			<Offcanvas.Title>Cart</Offcanvas.Title>
		</Offcanvas.Header>
		<Offcanvas.Body>
			<Card>
				<ListGroup variant="flush">
					<ListGroup.Item className="text-center">
						<h4>Subtotal | <span data-cy="cart-items-count">{sum(dishesInCart.map(x => x.quantity))}</span> Items</h4>
						<div data-cy="subtotal">${sumBy(dishesInCart, x => x.price * x.quantity).toFixed(2)}</div>
					</ListGroup.Item>
					<ListGroup.Item className="text-center">
						<GiPayMoney onClick={onPlaceOrder} style={{ cursor: 'pointer' }} />
					</ListGroup.Item>
					<ListGroup.Item>
						{isMapOn ? <Map /> : <GrMap onClick={() => setIsMapOn(true)} />}
					</ListGroup.Item>
				</ListGroup>
			</Card>
			<ListGroup variant="flush">
				<Scrollable height={700}>
					{dishesInCart.map(dish =>
						<ListGroup.Item key={dish.id}>
							<Row>
								<Col>
									<Image
										src="/images/1.jpg"
										fluid
										rounded
										alt={dish.name}
									/>
								</Col>
								<Col>
									<ListGroup variant="flush">
										<ListGroup.Item>
											{dish.name}
										</ListGroup.Item>
										<ListGroup.Item>
											${dish.price} ({dish.quantity})
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>
													<BsCartPlusFill onClick={() => add(dish)} color={color.ICON} />
												</Col>
												<Col>
													<BsFillCartDashFill onClick={() => removeOne(dish.id)} />
												</Col>
												<Col>
													<BsTrash3Fill color="red" onClick={() => remove(dish.id)} />
												</Col>
											</Row>
										</ListGroup.Item>
									</ListGroup>
								</Col>
							</Row>
						</ListGroup.Item>)}
				</Scrollable>
			</ListGroup>
		</Offcanvas.Body>
	</Offcanvas>;
};

export default ShoppingCart;
