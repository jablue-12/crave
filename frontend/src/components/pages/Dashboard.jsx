import { orderBy, take, range } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Badge, Col, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { REQUEST_TIMEOUT, endpoint } from '../../common/constants';
import { menu } from '../../sample/menu';
import Restaurant from '../features/dashboard/core/Restaurant';
import DishesList from '../features/dashboard/core/Restaurants';
import { agent } from './../../common/api';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import Loader from './../common/Loader';

export default function Dashboard () {
	const featuredDishes = take(orderBy(menu, ['rating'], ['desc']), Math.min(menu.length, 5));
	const [tags, setTags] = useState([...range(1, 10).map(n => 'tag tag')]);
	const [dishes, setDishes] = useState([]);
	const [selectedDish, setSelectedDish] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const controller = new AbortController();

	useEffect(() => {
		(async () => {
			try {
				const timer = setTimeout(() => {
					controller.abort();
				}, REQUEST_TIMEOUT);

				const [dishesResult, tagsResult] = await Promise.all([
					agent.get(endpoint.RESTAURANTS, controller.signal) // TODO - dishes
					// agent.get(endpoint.TAGS, controller.signal)
				]);

				clearTimeout(timer);

				console.log('Logging - dishesResult.data - Dashboard');
				console.log(dishesResult.data);

				setDishes(orderBy(dishesResult.data, ['rating'], ['desc']));
				setTags(tagsResult.data);
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

	return <Row className="mx-5">
		<Col md={2}>
			<h4>THINGS</h4>
		</Col>
		<Col md={5}>
			<h4>MENU</h4>
			<Row>
				<Col>
					<h6>Tags</h6>
					<div style={{ paddingRight: '20px' }}>
						{tags.map((tag, i) =>
							<Badge key={i} className="mx-1" pill bg="success">
								{tag}
							</Badge>)}
					</div>
				</Col>
			</Row>
			<Row className="my-4">
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
						dishes={dishes}
						setSelectedDish={setSelectedDish}
					/>
				</Col>
			</Row>
		</Col>
		<Col md={4} className="mx-4">
			{selectedDish && <Restaurant dish={selectedDish} />}
		</Col>
	</Row>;
};
