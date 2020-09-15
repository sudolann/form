context('Navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('change path to form after clicking form link navigation', () => {
        cy.get('.nav--link').eq(1).click();
        cy.url().should('eq', 'http://localhost:3000/form')
    });

    it('change path to main page after clicking Event list link navigation', () => {
        cy.get('.nav--link').eq(0).click();
        cy.url().should('eq', 'http://localhost:3000/')
    })
});