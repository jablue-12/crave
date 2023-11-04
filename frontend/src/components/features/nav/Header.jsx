import { sum } from 'lodash';
import React, { memo, useState } from 'react';
import { Container, Nav, NavDropdown, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaChartPie, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { Link } from 'react-router-dom';
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

	return (
		<header>
			<Navbar expand="md" collapseOnSelect>
				<Container>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Navbar.Brand style={{ fontSize: '2rem' }}>Crave</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto" style={{ display: 'flex', alignItems: 'center' }}>
							{user && <Link to="profile" style={{ textDecoration: 'none' }}>
								<FaChartPie color="lightseagreen" />
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
											<FaShoppingCart color="lightseagreen" />
										</>
									}
								</Link>
							</OverlayTrigger>
							<NavDropdown title={<FaUserCircle color={user ? 'lightseagreen' : 'red'} style={{ textDecoration: 'none', marginLeft: '15px' }} />} menuVariant="light">
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
