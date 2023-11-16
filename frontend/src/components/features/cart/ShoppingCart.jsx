import { sum, sumBy } from 'lodash';
<<<<<<< HEAD
<<<<<<< HEAD
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
	const { user } = useAuth();

	console.log('Logging - ShoppingCart');
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
		if (user) {
			const orderInfo = {
				placedAt: new Date().toISOString(),
				username: user.firstName + ' ' + user.lastName,
				email: user.email,
				role: user.userRole
			};
			placeOrder({ orderInfo, orderItems: dishesInCart });
		}
	};
=======
import React from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
=======
import React, { useEffect, useState } from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsCartPlusFill, BsFillCartDashFill, BsTrash3Fill } from 'react-icons/bs';
import { GiPayMoney } from 'react-icons/gi';
import { iconColor } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import { useNotifier } from '../../../contexts/NotifierContext';
import { useOrders } from '../../../contexts/OrderContext';
import Scrollable from '../../common/Scrollable';
import Map from '../dashboard/map/Map';

const ShoppingCart = ({ isSliderOn, setIsSliderOn }) => {
	const [location, setLocation] = useState({ lat: null, lng: null });

	const { dishesInCart, add, removeOne, remove } = useCart();
<<<<<<< HEAD
>>>>>>> 85a6cf9... Refactor frontend
=======
	const { placeOrder } = useOrders();
<<<<<<< HEAD
>>>>>>> abbe86c... Fix backend and frontend issues
=======
	const { notifyOrderPlaced } = useNotifier();
	useAuth();

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
		notifyOrderPlaced(orderInfo);
	};
>>>>>>> 1cd73ca... Add token to axios calls and refactor components

	return <Offcanvas show={isSliderOn} onHide={() => setIsSliderOn(false)} placement="end" name="end">
		<Offcanvas.Header closeButton>
			<Offcanvas.Title>Cart</Offcanvas.Title>
		</Offcanvas.Header>
		<Offcanvas.Body>
			<Card>
				<ListGroup variant="flush">
					<ListGroup.Item className="text-center">
<<<<<<< HEAD
						<h4>Subtotal | <span data-cy="cart-items-count">{sum(dishesInCart.map(x => x.quantity))}</span> Items</h4>
						<div data-cy="subtotal">${sumBy(dishesInCart, x => x.price * x.quantity).toFixed(2)}</div>
					</ListGroup.Item>
					<ListGroup.Item className="text-center">
						{user
							? <GiPayMoney onClick={onPlaceOrder} style={{ cursor: 'pointer' }} />
							: <h6><strong>Please login to place order</strong></h6>
						}
					</ListGroup.Item>
					<ListGroup.Item>
						{isMapOn ? <Map /> : <GrMap onClick={() => setIsMapOn(true)} />}
=======
						<h4>Subtotal | {sum(dishesInCart.map(x => x.quantity))} Items</h4>
							${sumBy(dishesInCart, x => x.price * x.quantity).toFixed(2)}
					</ListGroup.Item>
					<ListGroup.Item className="text-center">
<<<<<<< HEAD
						<Button
							className="btn-inherit"
							variant="light"
							type="button"
							size="sm"
							disabled={dishesInCart.length === 0}
<<<<<<< HEAD
<<<<<<< HEAD
						><MdOutlineShoppingCartCheckout size={25} /></Button>
>>>>>>> 85a6cf9... Refactor frontend
=======
							onClick={() => placeOrder({
								id: 1,
								placedAt: new Date().toISOString()
								// TODO - order items
							})}
=======
							onClick={() => onPlaceOrder()}
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
						>
							<MdOutlineShoppingCartCheckout size={25} />
						</Button>
>>>>>>> abbe86c... Fix backend and frontend issues
=======
						<GiPayMoney onClick={onPlaceOrder} style={{ cursor: 'pointer' }} />
					</ListGroup.Item>
					<ListGroup.Item>
						<div>
							<h2>Your Location</h2>
							<p>Latitude: {location.lat}</p>
							<p>Longitude: {location.lng}</p>
						</div>
					</ListGroup.Item>
					<ListGroup.Item>
						<Map />
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
													<BsCartPlusFill onClick={() => add(dish)} color={color.ICON} />
=======
													<BsCartPlusFill onClick={() => add(dish)} color="black" />
>>>>>>> 85a6cf9... Refactor frontend
=======
													<BsCartPlusFill onClick={() => add(dish)} color="lightseagreen" />
>>>>>>> 63043f4... Update styling for menu
=======
													<BsCartPlusFill onClick={() => add(dish)} color={iconColor} />
>>>>>>> 9dcfcdc... Add contants and logo image
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
