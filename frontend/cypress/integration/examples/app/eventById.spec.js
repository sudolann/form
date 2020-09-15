Cypress.on('uncaught:exception', (err, runnable) => {
    debugger
    return false
})
context('EventById', () => {
    it('going back to main page upn clicking back button', () => {
        cy.visit('http://localhost:3000/event/5f60fe4d97875cfbb1f48fb5')
        cy.get('button').click();
        cy.url().should('eq', 'http://localhost:3000/')
    });
});