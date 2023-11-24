import { capitalize } from 'lodash';
import React from 'react';
import { Badge, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { useCart } from '../../../../contexts/CartContext';
import ActivePieChart from '../../../common/ActivePieChart';
import Comments from './Comments';

const Dish = ({ dish }) => {
	const ingredients = dish.ingredients?.map(ingredient => ({
		name: capitalize(ingredient.name.toLowerCase()),
		value: ingredient.quantity
	}));

	const { add, get } = useCart();

	const dishInCart = get(dish.id);

	const { isAdmin } = useAuth();

	return <>
		{dish && <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
			<h4 className="dish-name">Dish</h4>
			<span style={{ display: 'flex', justifyContent: 'around', alignItems: 'center', paddingBottom: '10px' }}>
				<Badge className="dish-tag mx-2" pill bg="success">{dish.tag}</Badge>
				{dish.isOnSale && <Badge className="dish-tag" pill bg="warning" style={{ marginRight: '8px' }}>- {dish.discount * 100}%</Badge>}
				{!isAdmin && <>
					<div className="bubble add-to-bag" onClick={() => add(dish)}>Buy</div>
					{dishInCart && <div style={{
						height: '20px',
						width: `${dishInCart.quantity > 99 ? '35px' : '20px'}`,
						borderRadius: '20px',
						background: 'lightgray',
						marginLeft: '8px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontSize: '10px',
						fontWeight: 600
					}}>{dishInCart.quantity}</div>}
				</>}
			</span>
		</div>}
		<Row>
			<h6 className="my-2">{dish.name}</h6>
			<Col md={6}>
				<Image rounded fluid src="/images/1.jpg" />
			</Col>
			<Col md={6}>
				<ListGroup variant="flush" style={{ fontSize: '14px' }}>
					<ListGroup.Item>
						{dish.description}
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</Row>
		<Row className="mt-3" style={{ height: 250 }}>
			<h6>Ingredients</h6>
			<Col>
				<ActivePieChart ingredients={ingredients} />
			</Col>
		</Row>
		<Row className="mt-3">
			<Col>
				<h6>Comments</h6>
				<Comments dishId={dish.id} />
			</Col>
		</Row>
	</>;
};

export default Dish;
