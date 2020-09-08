/* eslint-disable no-undef */
Cypress.on('uncaught:exception', (err, runnable) => {
    debugger
    return false
})
context('Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/form')
    })


    it('displays errors when typed invalid data', () => {
        cy.get('[type="text"]').eq(0).type('ex').blur()
        cy.get('[type="text"]').eq(1).type('meemail.com').blur()
        cy.get('button[type="submit"]').click();
        cy.get('.alert').its('length').should('eq', 4);
        cy.get('.alert').contains('Min three letters name');
        cy.get('.alert').contains('Invalid email address');
        cy.get('.alert').contains('Date is required')
    });

    it('displays errors when did not added data', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.alert').its('length').should('eq', 3);
        cy.get('.alert').contains('Name is required');
        cy.get('.alert').contains('Email is required')
        cy.get('.alert').contains('Date is required')
    });

    it('new event is added successfully after filled the form correctly', () => {
        cy.get('[type="text"]').eq(0).type('concert').blur()
        cy.get('[type="text"]').eq(1).type('me@email.com').blur()
        cy.get('[name="event date"]').type('2020-10-20', {
            force: true
        }).type('{enter}');
        cy.get('button[type="submit"]').click();

        cy.location('pathname').should('not.include', 'form');

        cy.get('.event').within(() => {
            cy.get('p').contains('Event: concert');
            cy.get('p').contains('Email: me@email.com');
            cy.get('p').contains('Date: 2020-10-20');
            cy.get('button').contains('back to main page')
        });
    })

    it('goes back to main page after clicking button', () => {
        cy.visit('http://localhost:3000/5f574beced019d09776c86b5')
        cy.get('button').contains('back to main page').click();
        cy.location('pathname').should('eq', '/');
    });
})