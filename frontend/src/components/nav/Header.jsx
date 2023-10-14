import { sum } from 'lodash';
import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export default function Header () {
	const { dishesInCart } = useContext(CartContext);

	return (
		<header>
			<Navbar expand="md" collapseOnSelect>
				<Container>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Navbar.Brand style={{ fontSize: '2rem' }}>Crave</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Link to="/cart" style={{ textDecoration: 'none', marginRight: '25px' }}>
								{dishesInCart.length === 0
									? <SlBasket />
									: <>
										<FaShoppingCart /> {sum(dishesInCart.map(x => x.quantity))}
									</>}
							</Link>
							<Link to="login" style={{ textDecoration: 'none' }}>
								<FaUser color="red" />
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}
