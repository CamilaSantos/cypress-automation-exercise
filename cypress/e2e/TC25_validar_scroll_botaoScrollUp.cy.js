describe('Test Case 25 - Validar funcionalidade do botão "ScrollUp" ao chegar no fim da página', () => {

    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    it('Realizar scroll até o final da página e ao clicar no botão "scrollup" validar que foi direcionado para o inicio da página.', () => {
        
        // cy.get('.footer-bottom').scrollTo('bottom');
        cy.scrollTo('bottom');
        cy.get('#scrollUp').should('be.visible').click();
        cy.get('h2').should('contain.text','Full-Fledged practice website for Automation Engineers');

    });

});