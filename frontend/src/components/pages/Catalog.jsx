import { groupBy, keys, orderBy, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, OverlayTrigger, Tooltip, ListGroup } from 'react-bootstrap';
import { FaCartArrowDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
<<<<<<< HEAD
<<<<<<< HEAD
import { agent } from '../../common/api';
import { REQUEST_TIMEOUT, iconColor, endpoint } from '../../common/constants';
=======
import api from '../../common/api';
<<<<<<< HEAD
import { RESTAURANTS_PATH, iconColor } from '../../common/constants';
>>>>>>> 5ffd710... Add typewriter to header
=======
import { TOKEN_KEY, iconColor, url } from '../../common/constants';
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
=======
import { agent } from '../../common/api';
import { REQUEST_TIMEOUT, iconColor, endpoint } from '../../common/constants';
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import { useCart } from '../../contexts/CartContext';
import { menu } from '../../sample/menu';
import { singleRestaurant } from '../../sample/singleRestaurant';
import Loader from '../common/Loader';
import DishCard from '../features/catalog/DishCard';
import PriceLevel from '../features/dashboard/core/PriceLevel';
import RatingBar from '../features/dashboard/core/RatingBar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const Catalog = () => {
	const { id } = useParams();
	const [dishes, setDishes] = useState(menu);
	const [restaurant, setRestaurant] = useState(singleRestaurant);
	const [isLoading, setIsLoading] = useState(true);
	const dishesByTag = groupBy(dishes, 'tag');
	const topSellers = take(orderBy(dishes, ['price'], ['desc']), Math.min(dishes.length, 5));
	const [selectedTopSeller, setSelectedTopSeller] = useState(topSellers[0] || null);

	const { add } = useCart();

<<<<<<< HEAD
<<<<<<< HEAD
	const controller = new AbortController();

	useEffect(() => {
		(async () => {
			try {
				const timer = setTimeout(() => {
					controller.abort();
				}, REQUEST_TIMEOUT);

				const [restaurantsResult, menuResult] = await Promise.all([
					agent.getTokenized(`${endpoint.RESTAURANTS}/${id}`, controller.signal),
					agent.getTokenized(`${endpoint.RESTAURANTS}/${id}/menu`, controller.signal)
				]);

				clearTimeout(timer);

				setRestaurant(restaurantsResult.data);
				setDishes(menuResult.data);
			} catch (e) {
				console.error(e);
			} finally {
=======
=======
	const controller = new AbortController();

>>>>>>> 97c8cf1... Refactor UI to fit the model business model
	useEffect(() => {
		(async () => {
			try {
				const timer = setTimeout(() => {
					controller.abort();
				}, REQUEST_TIMEOUT);

				const [restaurantsResult, menuResult] = await Promise.all([
					agent.getTokenized(`${endpoint.RESTAURANTS}/${id}`, controller.signal),
					agent.getTokenized(`${endpoint.RESTAURANTS}/${id}/menu`, controller.signal)
				]);

<<<<<<< HEAD
				setRestaurant(restaurantById.data);
				setDishes(menu.data);
			} catch (error) {
				console.error(error);
<<<<<<< HEAD
>>>>>>> 5ffd710... Add typewriter to header
=======
=======
				clearTimeout(timer);

				setRestaurant(restaurantsResult.data);
				setDishes(menuResult.data);
			} catch (e) {
				console.error(e);
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
			} finally {
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
				setIsLoading(false);
			}
		})();
	}, [id]);

	if (isLoading) {
		return <Loader />;
	}

	return <Container>
		<Row>
			<Col md={7}>
				<h4 className="text-center">Featured Dishes</h4>
				<Swiper
					style={{
						width: '100%',
						height: '300px',
						'--swiper-navigation-color': 'black',
						'--swiper-navigation-size': '25px'
					}}
					modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
					spaceBetween={5}
					slidesPerView={3}
					navigation
					effect="coverflow"
					loop="true"
				>
					{topSellers.map(dish =>
						<SwiperSlide key={dish.id}>
							<OverlayTrigger
								key="bottom"
								placement="bottom"
								overlay={
									<Tooltip id="tooltip-bottom" style={{ opacity: 0.8 }}>
										{dish.name}
									</Tooltip>
								}
							>
								<Image
									src={dish.photos ? dish.photos[0].getUrl() : '/images/1.jpg'}
									onClick={() => setSelectedTopSeller(dish)}
									fluid
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
										borderRadius: '5px',
										cursor: 'pointer'
									}}
									alt={dish.name}
								/>
							</OverlayTrigger>
						</SwiperSlide>
					)}
				</Swiper>
			</Col>
			<Col md={5}>
				<Row className="mb-4">
					<Col>
						<ListGroup variant="flush">
							<h4 className="text-center">{restaurant.name}</h4>
							<ListGroup.Item style={{ fontSize: '14px' }}>
								{restaurant.description}
							</ListGroup.Item>
							<ListGroup.Item style={{
								fontSize: '14px'
							}}>
								<Row>
									<Col xs={2} sm={2} md={2}>
										<PriceLevel level={restaurant.priceLevel} />
									</Col>
									<Col xs={3} sm={3} md={3}>
										<RatingBar rating={restaurant.rating} />
									</Col>
									<Col xs={3} sm={3} md={3}>
										<div>{restaurant.rating || 'N/A'}</div>
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
				<Row>
					<Col xs={5} sm={5} md={5}>
						<ListGroup>
							<ListGroup.Item>
								<h5>{selectedTopSeller.name}</h5>
							</ListGroup.Item>
							<ListGroup.Item style={{ fontSize: '14px' }}>
								${selectedTopSeller.price}
							</ListGroup.Item>
							<ListGroup.Item className="text-center">
								<span
									onClick={() => add(selectedTopSeller)}
									style={{ cursor: 'pointer' }}
								>
									<FaCartArrowDown color={iconColor} />
								</span>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</Col>
		</Row>
		<h2 className="my-5 text-center">{restaurant.name} Menu</h2>
		<Row>
			<Col>
				<Container>
					{keys(dishesByTag).map((tag) => (
						<div className="mt-2" key={tag}>
							<h4>{tag}</h4>
							<Swiper
								style={{
									height: '147px',
									'--swiper-navigation-color': 'black',
									'--swiper-navigation-size': '20px'
								}}
								modules={[Navigation, Pagination, Scrollbar, A11y]}
								spaceBetween={10}
								slidesPerView={3}
								navigation
								loop="true"
							>
								{dishesByTag[tag].map((dish) =>
									<SwiperSlide key={dish.id}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
										<DishCard
											key={dish.id}
											dish={dish}
											restaurant={restaurant}
										/>
<<<<<<< HEAD
=======
										<DishCard key={dish.id} dish={dish} />
>>>>>>> 5ffd710... Add typewriter to header
=======
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
									</SwiperSlide>
								)}
							</Swiper>
						</div>
					))}
				</Container>
			</Col>
		</Row>

	</Container>;
};

export default Catalog;
