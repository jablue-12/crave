import { sum } from 'lodash';
import React, { useEffect, useState, memo } from 'react';
import { Container, Image, Nav, NavDropdown, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsFillBellFill } from 'react-icons/bs';
import { FaChartPie, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { w3cwebsocket as WebSocket } from 'websocket';
import { iconColor } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import Popup from './../../common/Popup';
import Login from './../auth/Login';
import Register from './../auth/Register';

const Header = ({ setIsSliderOn }) => {
	const { dishesInCart } = useCart();
	const { user } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:3000/ws');

		socket.onopen = () => {
			console.log('WebSocket connection opened');
		};

		socket.onmessage = (event) => {
			const message = JSON.parse(event.data);

			if (message.channel === '/topic/orders') {
				// Handle the notification received from the WebSocket
				console.log('Received notification:', message);
			}
		};

		socket.onclose = (event) => {
			if (event.wasClean) {
				console.log(`WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`);
			} else {
				console.error('WebSocket connection abruptly closed');
			}
		};

		socket.onerror = (error) => {
			console.error('WebSocket connection error:', error);
		};

		return () => {
			socket.close();
		};
	}, []);

	return (
		<header>
			<Navbar className="p-0" expand="md" collapseOnSelect>
				<Container>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Navbar.Brand className="d-flex" style={{ alignItems: 'center' }}>
							<Image style={{ height: '80px', marginRight: '10px' }} src="/images/crave-logo.png" fluid />
							<Typewriter
								options={{
									strings: [
										'RAVE',
										'Quench your thirsts',
										'Crave is a food ordering application that allows users',
										'to conveniently order dishes from a diverse range of eateries'
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
							<BsFillBellFill color="orange" />
							{user && <Link to="profile" style={{ textDecoration: 'none' }}>
								<FaChartPie color={iconColor} />
							</Link>}
							<OverlayTrigger
								key="bottom"
								placement="bottom"
								overlay={
									<Tooltip id="tooltip-bottom" style={{ opacity: 0.7 }}>
										{sum(dishesInCart.map(x => x.quantity))}
									</Tooltip>
								}
							>
								<Link style={{ textDecoration: 'none', marginLeft: '20px' }} onClick={() => setIsSliderOn(true)}>
									{dishesInCart.length === 0
										? <SlBasket />
										: <>
											<FaShoppingCart color={iconColor} />
										</>
									}
								</Link>
							</OverlayTrigger>
							<NavDropdown title={<FaUserCircle color={user ? `${iconColor}` : 'red'} style={{ textDecoration: 'none', marginLeft: '15px' }} />} menuVariant="light">
								<NavDropdown.Item onClick={() => setIsRegistering(true)}>Register</NavDropdown.Item>
								<NavDropdown.Item onClick={() => setIsLoggingIn(true)}>Login</NavDropdown.Item>
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
