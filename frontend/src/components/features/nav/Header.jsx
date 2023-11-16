import { sum } from 'lodash';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, memo } from 'react';
import { Container, Image, Nav, NavDropdown, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
<<<<<<< HEAD
import { FaChartPie, FaPlus, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { Link } from 'react-router-dom';

import Typewriter from 'typewriter-effect';
import { color, iconColor } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import Popup from './../../common/Popup';
import Login from './../auth/Login';
import Register from './../auth/Register';

const Header = ({ setIsSliderOn }) => {
	const { dishesInCart } = useCart();
	const { user, logout } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const isUserAdmin = () => {
		return user && user.userRole === 'ADMIN';
	};

	return (
		<header className="my-1">
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
=======
import React, { useState } from 'react';
=======
import React, { memo, useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 63043f4... Update styling for menu
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
=======
import { Container, Nav, NavDropdown, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
=======
import { Container, Image, Nav, NavDropdown, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
>>>>>>> 9dcfcdc... Add contants and logo image
=======
import React, { useEffect, useState, memo } from 'react';
=======
import React, { useState, memo } from 'react';
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
import { Container, Image, Nav, NavDropdown, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsFillBellFill } from 'react-icons/bs';
>>>>>>> abbe86c... Fix backend and frontend issues
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
import { FaChartPie, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
>>>>>>> 0a0be0f... Update header icons
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
<<<<<<< HEAD
<<<<<<< HEAD
						<Navbar.Brand style={{ fontSize: '2rem' }}>Crave</Navbar.Brand>
>>>>>>> 85a6cf9... Refactor frontend
=======
						<Navbar.Brand>
							<Image style={{ height: '80px' }} src="/images/crave-logo.png" fluid />
=======
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
>>>>>>> 5ffd710... Add typewriter to header
						</Navbar.Brand>
>>>>>>> 9dcfcdc... Add contants and logo image
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto" style={{ display: 'flex', alignItems: 'center' }}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
							{isUserAdmin() &&
									<Link to="dish-creation" style={{ textDecoration: 'none' }}>
										<FaPlus color={iconColor} />
									</Link>}
							{user &&
								<Link to="profile" style={{ textDecoration: 'none', marginLeft: '20px' }}>
									<FaChartPie color={iconColor} />
								</Link>}
=======
=======
							<BsFillBellFill color="orange" />
<<<<<<< HEAD
>>>>>>> abbe86c... Fix backend and frontend issues
							{user && <Link to="profile" style={{ textDecoration: 'none' }}>
								<FaChartPie color={iconColor} />
							</Link>}
>>>>>>> 0a0be0f... Update header icons
=======
=======
>>>>>>> 97c8cf1... Refactor UI to fit the model business model
							{user &&
								<Link to="profile" style={{ textDecoration: 'none' }}>
									<FaChartPie color={iconColor} />
								</Link>}
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
							<OverlayTrigger
								key="bottom"
								placement="bottom"
								overlay={
									<Tooltip id="tooltip-bottom" style={{ opacity: 0.7 }}>
										{sum(dishesInCart.map(x => x.quantity))}
<<<<<<< HEAD
<<<<<<< HEAD
									</Tooltip>}
							>
								<Link
									style={{ textDecoration: 'none', marginLeft: '20px' }}
									onClick={() => setIsSliderOn(true)}
								>
									<span data-cy="shopping-cart">
										{dishesInCart.length === 0
											? <SlBasket />
											: <FaShoppingCart color={iconColor} />}
									</span>
								</Link>
							</OverlayTrigger>
							<NavDropdown
								title={
									<FaUserCircle
										data-cy="user"
										style={{
											textDecoration: 'none',
											marginLeft: '15px',
											color: `${user ? color.user.AUTHENTICATED : color.user.GUEST}`
										}}
									/>}
								menuVariant="light"
							>
								{user
									? <NavDropdown.Item data-cy="logout" onClick={() => logout(user)}>
										Logout
									</NavDropdown.Item>
									: <>
										<NavDropdown.Item data-cy="register" onClick={() => setIsRegistering(true)}>
											Register
										</NavDropdown.Item>
										<NavDropdown.Item data-cy="login" onClick={() => setIsLoggingIn(true)}>
											Login
										</NavDropdown.Item>
									</>}
							</NavDropdown>
							<Popup
								size="md"
=======
							<Link style={{ textDecoration: 'none' }} onClick={() => setIsSliderOn(true)}>
								{dishesInCart.length === 0
									? <SlBasket />
									: <>
										<FaShoppingCart color="lightseagreen" /> {sum(dishesInCart.map(x => x.quantity))}
									</>
=======
									</Tooltip>
>>>>>>> 0a0be0f... Update header icons
								}
=======
									</Tooltip>}
>>>>>>> 1cd73ca... Add token to axios calls and refactor components
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
>>>>>>> 85a6cf9... Refactor frontend
								display={isRegistering}
								close={() => setIsRegistering(false)}
								title="Registration"
							>
								<Register />
							</Popup>
							<Popup
<<<<<<< HEAD
								size="md"
=======
>>>>>>> 85a6cf9... Refactor frontend
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
<<<<<<< HEAD
<<<<<<< HEAD
		</header>
	);
};

export default memo(Header);
=======
			<ShoppingCart
				isSliderOn={isSliderOn}
				setIsSliderOn={setIsSliderOn}
				dishesInCart={dishesInCart}
			/>
		</header>
	);
}
>>>>>>> 85a6cf9... Refactor frontend
=======
		</header>
	);
};

export default memo(Header);
>>>>>>> 63043f4... Update styling for menu
