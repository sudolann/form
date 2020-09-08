/* eslint-disable no-undef */
context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })


  it('visible navigation', () => {
    cy.get('.nav').should('be.visible');
    cy.get('.nav--link').its('length').should('eq', 2)

  })
  it('responds for clicking navigation links', () => {
    cy.location('pathname').should('eq', '/');
    cy.get('.nav--link').contains('Add new event').click();
    cy.location('pathname').should('include', 'form');
    cy.get('.nav--link').contains('Events list').click();
    cy.location('pathname').should('not.include', 'form');
    cy.location('pathname').should('eq', '/');
  })
})