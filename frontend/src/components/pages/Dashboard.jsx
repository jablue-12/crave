import { orderBy, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { endpoint } from '../../common/constants';
import { useSale } from '../../contexts/SaleContext';
import { defaultDishes } from '../../sample/defaultDishes';
import Dish from '../features/dashboard/core/Dish';
import DishesList from '../features/dashboard/core/DishesList';
import Filter from '../features/dashboard/core/Filter';
import DishFinder from '../features/finder/DishFinder';
import { agent } from './../../common/api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import Loader from './../common/Loader';

export default function Dashboard () {
	const [dishes, setDishes] = useState([...defaultDishes]);
	const featuredDishes = take(orderBy(dishes, ['rating'], ['desc']), Math.min(dishes.length, 5));
	const [selectedDish, setSelectedDish] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { dishesOnSale } = useSale();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await agent.get(endpoint.DISHES);
				setDishes(orderBy(data, ['rating'], ['desc']));
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				setIsLoading(false);
			}
		})();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	const dishesToDisplay = dishes
		.map(dish => {
			const dishOnSale = dishesOnSale.find(x => x.id === dish.id);
			return {
				...dish,
				discount: (dishOnSale ? dishOnSale.discount : 0).toFixed(2)
			};
		})
		.map(dish => ({
			...dish,
			isOnSale: dish.discount > 0,
			price: (dish.discount * dish.price).toFixed(2),
			regularPrice: dish.price.toFixed(2)
		}));

	return <Row className="mx-5">
		<Col style={{ marginRight: '15px' }} md={3}>
			<h4>THINGS</h4>
			<Row className="my-3">
				<Col>
					<h6 className="my-2">Tags</h6>
					<Filter setDishes={setDishes} setSelectedDish={setSelectedDish} />
				</Col>
			</Row>
			<Row className="my-3">
				<Col>
					<h6 className="my-2">Finder</h6>
					<DishFinder />
				</Col>
			</Row>
		</Col>
		<Col md={5}>
			<h4>MENU</h4>
			<Row className="my-3">
				<Col>
					<h6 className="my-2">FEATURED</h6>
					<div style={{ paddingRight: '20px' }}>
						<Swiper
							style={{
								width: '100%',
								height: '130px',
								'--swiper-navigation-color': 'black',
								'--swiper-navigation-size': '15px'
							}}
							modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
							spaceBetween={5}
							slidesPerView={3}
							navigation
							effect="coverflow"
							loop="true"
						>
							{featuredDishes.map(dish =>
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
											onClick={() => setSelectedDish(dish)}
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
									</OverlayTrigger>
								</SwiperSlide>
							)}
						</Swiper>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<h6>DISHES</h6>
					<DishesList
						dishes={dishesToDisplay}
						setSelectedDish={setSelectedDish}
					/>
				</Col>
			</Row>
		</Col>
		<Col md={3} className="mx-4">
			{selectedDish && <Dish dish={selectedDish} />}
		</Col>
	</Row>;
};
