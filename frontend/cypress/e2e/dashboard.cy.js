import { tags } from '../../src/common/dishTags';

describe('tags spec', () => {
	beforeEach(() => {
		cy.intercept('GET', 'http://localhost:8080/dishes', { fixture: 'dishes.json' }).as('getDishes');
		cy.visit('http://localhost:3000');
		cy.wait('@getDishes');
	});

	it('should contain tags', () => {
		cy.get('.badge').each(($badge, i) => {
			cy.wrap($badge.text()).should('contain', tags[i]);
		});
	});

	it('should display each dish name', () => {
		cy.fixture('dishes').then((dishes) => {
			dishes.forEach((dish) => {
				cy.get(`h6:contains(${dish.name})`).should('exist');
			});
		});
	});

	it('should display each dish details', () => {
		cy.fixture('dishes').then(dishes => {
			dishes.forEach((dish, i) => {
				cy.get('[data-cy="dish-image"]').eq(i).click();
				cy.get('.dish-name').contains(dish.name).should('exist');
				cy.get('.dish-tag').contains(dish.tag).should('exist');
			});
		});
	});
});
