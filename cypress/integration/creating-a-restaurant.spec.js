/// <reference types="cypress" />

describe('创建餐馆', () => {
  it('允许添加餐馆', () => {
    const restaurantId = 27;
    const restaurantName = 'Sushi Place';

    cy.server({force404: true});
    cy.route({
      method: 'GET',
      url: '/fakeApi/restaurants',
      response: [],
    });

    cy.route({
      method: 'POST',
      url: '/fakeApi/restaurants',
      response: {
        id: restaurantId,
        name: restaurantName,
      },
    }).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
    cy.contains('Add').click();

    cy.wait('@addRestaurant').its('requestBody').should('deep.equal', {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
