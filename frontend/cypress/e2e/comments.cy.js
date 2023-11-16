import { generateString } from '../utils/generateString';

describe('comments spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
		cy.login();
	});

	it('should add comment', () => {
		cy.get('[data-cy="dish-image"]').eq(0).click();
		cy.get('[data-cy="add-comment"]').click();
		const content = generateString();
		cy.get('[data-cy="add-comment-textarea"]').type(content);
		cy.get('[data-cy="add-comment-submit"]').click();
		cy.get('[data-cy="comment-content"]').first().should('have.text', content);
	});
});
