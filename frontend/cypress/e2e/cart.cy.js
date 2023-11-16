import { range } from 'lodash';

describe('cart spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		range(2).forEach(i => {
			cy.get('[data-cy="dish-image"]').eq(i).click();
			cy.get('[data-cy="add-to-cart"]').click();
		});
	});

	it('should display correct cart items count', () => {
		cy.get('[data-cy="shopping-cart"]').click();
		cy.fixture('cart').then(cart => {
			const count = cart.reduce((result, item) =>
				result + item.quantity, 0);
			cy.get('[data-cy="cart-items-count"]').contains(count).should('exist');
		});
	});

	it('should display correct subtotal', () => {
		cy.get('[data-cy="shopping-cart"]').click();
		cy.fixture('cart').then(cart => {
			const subtotal = cart.reduce((result, item) =>
				result + item.quantity * item.price, 0);
			cy.get('[data-cy="subtotal"]').contains(subtotal).should('exist');
		});
	});

	it('should add dish to cart', () => {
		cy.get('[data-cy="dish-image"]').eq(0).click();
		cy.get('[data-cy="add-to-cart"]').click();

		cy.get('[data-cy="shopping-cart"]').click();
		cy.get('[data-cy="cart-items-count"]').contains(3).should('exist');
	});
});
