import { sum } from 'lodash';
import React, { memo, useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { SlBasket } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import Popup from './../../common/Popup';
import Login from './../auth/Login';
import Register from './../auth/Register';

const Header = ({ setIsSliderOn }) => {
	const { dishesInCart } = useCart();
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
							<Link style={{ textDecoration: 'none' }} onClick={() => setIsSliderOn(true)}>
								{dishesInCart.length === 0
									? <SlBasket />
									: <>
										<FaShoppingCart color="lightseagreen" /> {sum(dishesInCart.map(x => x.quantity))}
									</>
								}
							</Link>
							<Link to="profile" style={{ textDecoration: 'none', marginLeft: '15px' }}>
								<ImStatsDots />
							</Link>
							<NavDropdown title={<FaUser color="red" />} menuVariant="light">
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
