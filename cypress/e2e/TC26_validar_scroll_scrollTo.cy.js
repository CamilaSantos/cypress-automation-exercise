describe('Test Case 25 - Validar scrollTo (TOP e BUTTOM) na página', () => {

    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    it('Realizar scroll até o final da página e ao clicar no botão "scrollup" validar que foi direcionado para o inicio da página.', () => {
        
       
        cy.scrollTo('bottom');
        cy.get('.single-widget h2').should('contain.text', 'Subscription');

        cy.scrollTo('top');
        cy.get('h2').should('contain.text','Full-Fledged practice website for Automation Engineers');

    });

});