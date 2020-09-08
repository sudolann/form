/* eslint-disable no-undef */
/// <reference types="cypress" />

// eslint-disable-next-line no-undef
context('Events list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays events', () => {
    cy.get('ul.list li.list--li').its('length').should('be.gt', 2)

    cy.get('ul.list li.list--li').each(($el, index, $list) => {

      cy.get($el).within(() => {
        cy.get('p').contains('name');
        cy.get('p').contains('email');
        cy.get('p').contains('date');
      });
    })
  })



})