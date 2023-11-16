import { color } from '../../src/common/constants';
import { assert } from '../utils/assert';

describe('auth spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should register user', () => {
		cy.intercept('POST', '/auth/register').as('registerRequest');
		cy.register();
		cy.wait('@registerRequest').then(assert.registered);
	});

	it('should login user', () => {
		cy.intercept('POST', '/auth/login').as('loginRequest');
		cy.login();
		cy.wait('@loginRequest').then(assert.loggedIn);
	});

	it('should logout user', () => {
		cy.login();
		cy.logout();
		cy.get('[data-cy="user"]').should('have.css', 'color').and('eq', color.user.GUEST);
	});
});
