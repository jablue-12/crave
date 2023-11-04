import { sum, sumBy } from 'lodash';
import React from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsCartPlusFill, BsFillCartDashFill, BsTrash3Fill } from 'react-icons/bs';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { useCart } from '../../../contexts/CartContext';
import Scrollable from '../../common/Scrollable';

const ShoppingCart = ({ isSliderOn, setIsSliderOn }) => {
	const { dishesInCart, add, removeOne, remove } = useCart();

	return <Offcanvas show={isSliderOn} onHide={() => setIsSliderOn(false)} placement="end" name="end">
		<Offcanvas.Header closeButton>
			<Offcanvas.Title>Cart</Offcanvas.Title>
		</Offcanvas.Header>
		<Offcanvas.Body>
			<Card>
				<ListGroup variant="flush">
					<ListGroup.Item className="text-center">
						<h4>Subtotal | {sum(dishesInCart.map(x => x.quantity))} Items</h4>
							${sumBy(dishesInCart, x => x.price * x.quantity).toFixed(2)}
					</ListGroup.Item>
					<ListGroup.Item className="text-center">
						<Button
							className="btn-inherit"
							variant="light"
							type="button"
							size="sm"
							disabled={dishesInCart.length === 0}
						><MdOutlineShoppingCartCheckout size={25} /></Button>
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
													<BsCartPlusFill onClick={() => add(dish)} color="lightseagreen" />
												</Col>
												<Col>
													<BsFillCartDashFill onClick={() => removeOne(dish.id)} color="lightseagreen" />
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
