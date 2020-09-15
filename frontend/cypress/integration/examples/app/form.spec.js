Cypress.on('uncaught:exception', (err, runnable) => {
    debugger
    return false
})
context('Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/form')
    })


    it('displays errors when typed invalid data and keeps button disabled', () => {
        cy.get('input[type="text"]').type('ex').blur()
        cy.get('input[type="email"]').type('meemail.com').blur()
        cy.get('input').eq(2).type('test', {
            force: true
        }).blur()

        cy.get('.alert').its('length').should('eq', 3);
        cy.get('.alert').contains('Event name must be 3 characters long!');
        cy.get('.alert').contains('Email is not valid!');
        cy.get('.alert').contains('Date is required');
        cy.get('button[type="submit"]').should('be.disabled')
    });
    it('new event is added successfully after filled the form correctly', () => {
        cy.get('[type="text"]').type('concert').blur()
        cy.get('[type="email"]').type('me@email.com').blur()
        cy.get('input').eq(2).type('2020-09-30{enter}', {
            force: true,
        }).click();
        cy.get('.form').click();
        cy.get('button[type="submit"]').should('not.be.disabled');
        cy.get('button[type="submit"]').click();


        cy.get('.event').within(() => {
            cy.get('p').contains('Event: concert');
            cy.get('p').contains('Email: me@email.com');
            cy.get('p').contains('Date: 2020-09-30');
            cy.get('button').contains('back to main page')
        });
    })

    it('going back to main page upn clicking back button', () => {
        cy.url().should('include', '/event')
        cy.get('button').click();
        cy.url().should('eq', '/http://localhost:3000')

    })
})