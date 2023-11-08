import { sum } from 'lodash';
import React, { useState, memo } from 'react';
import { Container, Image, Nav, NavDropdown, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaChartPie, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { Link } from 'react-router-dom';

import Typewriter from 'typewriter-effect';
import { color, iconColor } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import { useNotifier } from './../../../contexts/NotifierContext';
import Popup from './../../common/Popup';
import Login from './../auth/Login';
import Register from './../auth/Register';

const Header = ({ setIsSliderOn }) => {
	const { dishesInCart } = useCart();
	const { user } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const { notifications } = useNotifier();

	console.log('Header notifications');
	console.log(notifications);

	return (
		<header className="my-1">
			{notifications.map((x, i) => <div key={i}>{x.content}</div>)}
			<Navbar className="p-0" expand="md" collapseOnSelect>
				<Container>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Navbar.Brand className="d-flex" style={{ alignItems: 'center' }}>
							<Image style={{ height: '80px', marginRight: '10px' }} src="/images/crave-logo.png" fluid />
							<Typewriter
								options={{
									strings: [
										'RAVE',
										'COMPUTER SCIENCE',
										'SUCKS !'
									],
									autoStart: true,
									loop: true
								}}
							/>
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto" style={{ display: 'flex', alignItems: 'center' }}>
							{user &&
								<Link to="profile" style={{ textDecoration: 'none' }}>
									<FaChartPie color={iconColor} />
								</Link>}
							<OverlayTrigger
								key="bottom"
								placement="bottom"
								overlay={
									<Tooltip id="tooltip-bottom" style={{ opacity: 0.7 }}>
										{sum(dishesInCart.map(x => x.quantity))}
									</Tooltip>}
							>
								<Link
									style={{ textDecoration: 'none', marginLeft: '20px' }}
									onClick={() => setIsSliderOn(true)}
								>
									{dishesInCart.length === 0
										? <SlBasket />
										: <FaShoppingCart color={iconColor} />}
								</Link>
							</OverlayTrigger>
							<NavDropdown
								title={
									<FaUserCircle
										color={user
											? `${color.user.AUTHENTICATED}`
											: `${color.user.GUEST}`}
										style={{
											textDecoration: 'none',
											marginLeft: '15px'
										}}
									/>}
								menuVariant="light"
							>
								<NavDropdown.Item onClick={() => setIsRegistering(true)}>
									Register
								</NavDropdown.Item>
								<NavDropdown.Item onClick={() => setIsLoggingIn(true)}>
									Login
								</NavDropdown.Item>
							</NavDropdown>
							<Popup
								display={isRegistering}
								close={() => setIsRegistering(false)}
								title="Registration"
							>
								<Register />
							</Popup>
							<Popup
								display={isLoggingIn}
								close={() => setIsLoggingIn(false)}
								title="Login"
							>
								<Login />
							</Popup>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default memo(Header);