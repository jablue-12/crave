import { sum } from 'lodash';
import React, { useState, memo } from 'react';
import { Container, Image, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaGifts } from 'react-icons/fa';
import { GiBeachBag } from 'react-icons/gi';
import { ImUser } from 'react-icons/im';
import { IoFastFoodSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { color, iconSize } from '../../../common/constants';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import Popup from './../../common/Popup';
import Login from './../auth/Login';
import Register from './../auth/Register';

const Header = ({ setIsSliderOn }) => {
	const { dishesInCart } = useCart();
	const { user, logout, isAdmin } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const nav = useNavigate();

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
										'OMPUTER SCIENCE',
										'OMP4350',
										'HRISTMAS SEASON!'
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
							{isAdmin && <Link to="/sales" style={{ textDecoration: 'none' }}>
								<span className="add-discount">
									<FaGifts size={iconSize} />
								</span>
							</Link>}
							{isAdmin &&
								<Link to="dish-creation" style={{ textDecoration: 'none', marginLeft: '25px' }}>
									<span className="add-dish">
										<IoFastFoodSharp size={iconSize} />
									</span>
								</Link>}
							{!isAdmin && <Link
								style={{ textDecoration: 'none', marginLeft: '25px' }}
								onClick={() => setIsSliderOn(true)}
							>
								<span
									data-cy="shopping-cart"
									style={{
										position: 'relative',
										display: 'inline-block'
									}}
								>
									<span className="shopping-bag">
										<GiBeachBag size={iconSize} />
									</span>
									<span
										style={{
											position: 'absolute',
											top: -3,
											right: -7,
											fontSize: '10px'
										}}
									>
										{sum(dishesInCart.map(x => x.quantity))}
									</span>
								</span>
							</Link>}
							{user &&
								<span style={{ textTransform: 'none', marginLeft: '25px' }}>
									Hi {user.firstName}
								</span>
							}
							<NavDropdown
								title={
									<ImUser
										data-cy="user"
										size={iconSize}
										style={{
											textDecoration: 'none',
											marginLeft: '15px',
											color: `${user ? color.user.AUTHENTICATED : color.user.GUEST}`
										}}
									/>}
								menuVariant="light"
							>
								{user
									? <>
										<NavDropdown.Item>
											<Link
												to="profile"
												style={{
													display: 'flex',
													justifyContent: 'around',
													textDecoration: 'none'
												}}
											>
												Profile
											</Link>
										</NavDropdown.Item>
										<NavDropdown.Item data-cy="logout" onClick={() => {
											logout(user);
											nav('/');
										}}>
											Logout
										</NavDropdown.Item>
									</>
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
								display={isRegistering}
								close={() => setIsRegistering(false)}
								title="Registration"
							>
								<Register setIsRegistering={setIsRegistering} />
							</Popup>
							<Popup
								size="md"
								display={isLoggingIn}
								close={() => setIsLoggingIn(false)}
								title="Login"
							>
								<Login setIsLoggingIn={setIsLoggingIn} />
							</Popup>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default memo(Header);
