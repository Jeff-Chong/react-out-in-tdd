/// <reference types="cypress"/>

describe('Smoke Test', () => {
  it('能查看主页', () => {
    cy.visit('/');
    cy.contains('Learn React');
  });
});
