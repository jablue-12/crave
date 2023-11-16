// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { generateString } from '../utils/generateString';

Cypress.Commands.add('register', () => {
	cy.get('[data-cy="user"]').click();
	cy.get('[data-cy="register"]').click();
	cy.get('[data-cy="first-name"]').type('John');
	cy.get('[data-cy="last-name"]').type('Doe');
	cy.get('[data-cy="email"]').type(`${generateString()}@gmail.com`);
	cy.get('[data-cy="password"]').type('123');
	cy.get('[data-cy="auth-form"]').submit();
	cy.get('.btn-close').click();
});

Cypress.Commands.add('login', () => {
	cy.get('[data-cy="user"]').click();
	cy.get('[data-cy="login"]').click();
	cy.get('[data-cy="email"]').type('userdemo@gmail.com');
	cy.get('[data-cy="password"]').type('demo');
	cy.get('[data-cy="auth-form"]').submit();
	cy.get('.btn-close').click();
});

Cypress.Commands.add('logout', () => {
	cy.get('[data-cy="user"]').click();
	cy.get('[data-cy="logout"]').click();
});
