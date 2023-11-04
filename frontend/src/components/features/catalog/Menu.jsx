import axios from 'axios';
import { groupBy, keys, orderBy, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { menu } from './../../../sample/menu';
import { singleRestaurant } from './../../../sample/singleRestaurant';
import Loader from './../../common/Loader';
import DishCard from './DishCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';

const Menu = () => {
	const { id } = useParams();
	const [dishes, setDishes] = useState(menu);
	const [restaurant, setRestaurant] = useState(singleRestaurant);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const [restaurantById, menu] = await Promise.all([
					axios.get(`/api/restaurants/${id}`),
					axios.get(`/api/restaurants/${id}/menu`)
				]);

				setRestaurant(restaurantById.data);
				setDishes(menu.data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		})();
	}, [id]);

	if (isLoading) {
		return <Loader />;
	}

	const dishesByTag = groupBy(dishes, 'tag');
	const topSellers = take(orderBy(dishes, ['price'], ['desc']), Math.min(dishes.length, 5));

	return <Container>
		<Row>
			<Col md={5}>
				<h4 className="text-center">Featured Dishes</h4>
				<Swiper
					style={{
						width: '350px',
						height: '300px',
						'--swiper-navigation-color': 'white',
						'--swiper-navigation-size': '25px'
					}}
					modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
					spaceBetween={20}
					slidesPerView={1}
					navigation
					effect="cube"
					loop="true"
				>
					{topSellers.map(dish =>
						<SwiperSlide key={dish.id}>
							<Image
								src={dish.photos ? dish.photos[0].getUrl() : '/images/1.jpg'}
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
						</SwiperSlide>
					)}
				</Swiper>
			</Col>
			<Col md={7}>
				<h4 className="text-center">{restaurant.name}</h4>
				<div>{restaurant.description}</div>
				<div>{restaurant.rating}</div>
				<div>{restaurant.priceLevel}</div>
				<div>{restaurant.location}</div>
			</Col>
		</Row>
		<h2 className="my-5 text-center">{restaurant.name} Menu</h2>
		<Row>
			<Col>
				<Container>
					{keys(dishesByTag).map((tag) => (
						<div key={tag}>
							<h4>{tag}</h4>
							<Swiper
								style={{
									height: '150px',
									'--swiper-navigation-color': 'green',
									'--swiper-navigation-size': '25px'
								}}
								modules={[Navigation, Pagination, Scrollbar, A11y]}
								spaceBetween={20}
								slidesPerView={3}
								navigation
							>
								{dishesByTag[tag].map((dish) =>
									<SwiperSlide key={dish.id}>
										<DishCard key={dish.id} dish={dish} />
									</SwiperSlide>
								)}
							</Swiper>
							<hr />
						</div>
					))}
				</Container>
			</Col>
		</Row>

	</Container>;
};

export default Menu;
