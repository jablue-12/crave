import { generateString } from '../utils/generateString';

describe('auth spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should register user', () => {
		cy.intercept('POST', '/auth/register').as('registerRequest');

		cy.get('[data-cy="user"]').click();
		cy.get('[data-cy="register"]').click();
		cy.get('[data-cy="first-name"]').type('John');
		cy.get('[data-cy="last-name"]').type('Doe');
		cy.get('[data-cy="email"]').type(`${generateString()}@gmail.com`);
		cy.get('[data-cy="password"]').type('123');
		cy.get('[data-cy="auth-form"]').submit();

		cy.wait('@registerRequest').then(({ response }) => {
			expect(response.statusCode).to.equal(200);
			expect(response.body.statusMessage).to.equal('Successful registration');
		});
	});

	it('should login user', () => {
		cy.intercept('POST', '/auth/login').as('loginRequest');

		cy.get('[data-cy="user"]').click();
		cy.get('[data-cy="login"]').click();
		cy.get('[data-cy="email"]').type('userdemo@gmail.com');
		cy.get('[data-cy="password"]').type('demo');
		cy.get('[data-cy="auth-form"]').submit();

		cy.wait('@loginRequest').then(({ response }) => {
			expect(response.statusCode).to.equal(200);
			expect(response.body.statusMessage).to.equal('Successful login');
		});
	});
});
