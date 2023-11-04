import { groupBy, keys, orderBy, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RESTAURANTS_PATH } from '../../../common/constants';
import api from './../../../common/api';
import { menu } from './../../../sample/menu';
import { singleRestaurant } from './../../../sample/singleRestaurant';
import Loader from './../../common/Loader';
import DishCard from './DishCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const Menu = () => {
	const { id } = useParams();
	const [dishes, setDishes] = useState(menu);
	const [restaurant, setRestaurant] = useState(singleRestaurant);
	const [isLoading, setIsLoading] = useState(true);
	const dishesByTag = groupBy(dishes, 'tag');
	const topSellers = take(orderBy(dishes, ['price'], ['desc']), Math.min(dishes.length, 5));
	const [selectedTopSeller, setSelectedTopSeller] = useState(topSellers[0] || null);

	useEffect(() => {
		(async () => {
			try {
				const [restaurantById, menu] = await Promise.all([
					api.get(`${RESTAURANTS_PATH}/${id}`),
					api.get(`${RESTAURANTS_PATH}/${id}/menu`)
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
				<Row>
					<Col>
						<h4 className="text-center">{restaurant.name}</h4>
						<div>{restaurant.description}</div>
						<div>{restaurant.priceLevel}</div>
						<div>{restaurant.location}</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<h4 className="text-center">{selectedTopSeller.name}</h4>
						<div>{selectedTopSeller.description}</div>
						<div>{selectedTopSeller.price}</div>
					</Col>
				</Row>
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
									height: '145px',
									'--swiper-navigation-color': 'black',
									'--swiper-navigation-size': '25px'
								}}
								modules={[Navigation, Pagination, Scrollbar, A11y]}
								spaceBetween={20}
								slidesPerView={3}
								navigation
								loop="true"
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
