import React, { useContext } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { BsCartPlus, BsPatchMinus, BsPatchPlusFill } from 'react-icons/bs';
import { SlTrash } from 'react-icons/sl';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export default function Dish () {
	const { restaurantid, dishid } = useParams();

	const dish = [
		{
			id: 1,
			name: 'Dish Name 1',
			description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
			price: 100,
			isAvailable: true
		},
		{
			id: 2,
			name: 'Dish Name 2',
			description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
			price: 100,
			isAvailable: true
		},
		{
			id: 3,
			name: 'Dish Name 3',
			description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
			price: 100,
			isAvailable: false
		}
	].find(({ id }) => id === Number(dishid));

	const { countDish, add, removeOne, remove } = useContext(CartContext);

	const countInCart = countDish(dish.id);

	return (
		<>
			<Link
				className="btn my-3"
				to={`/restaurants/${restaurantid}`}
			>Back</Link>
			<Row>
				<Col md={3}>
					<Image className={dish.isAvailable ? '' : 'sold-out-img'} src="/images/1.jpg" fluid alt={dish.name} />
				</Col>
				<Col md={6}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{dish.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item style={{ wordWrap: 'break-word' }}>
							{dish.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{dish.isAvailable ? 'Available' : 'Sold Out'}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
									${dish.price}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className="text-center">
								{countInCart <= 0
									? <Button
										className="btn-block"
										variant="light"
										type="button"
										disabled={!dish.isAvailable}
										onClick={() => add(dish)}
									><BsCartPlus size={20} /></Button>
									: <>
										<Form as={Row}>
											<Col className="d-flex align-items-center">
												<Form.Label column="true">{countInCart}</Form.Label>
												<Button className="btn-inherit" variant="light" onClick={() => add(dish)}>
													<BsPatchPlusFill color="green" size={18} />
												</Button>
												<Button className="btn-inherit" variant="light" onClick={() => removeOne(dish.id)}>
													<BsPatchMinus color="red" size={18} />
												</Button>
												<Button className="btn-inherit my-2" variant="light" onClick={() => remove(dish.id)}>
													<SlTrash color="grey" size={18} />
												</Button>
											</Col>
										</Form>
									</>}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}
