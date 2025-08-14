describe('Test Case 7 - Acessar página Test Cases', () => {
    it('Acessar e validar página Test Cases', () => {
        
        cy.viewport(1900,1080);
        cy.visit('/');
        cy.contains(' Test Cases').click();
        cy.url().should('include', '/test_cases');
        cy.contains('h2', 'Test Cases').should('be.visible');

    });
});