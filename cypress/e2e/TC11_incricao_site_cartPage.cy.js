describe('Test Case 10 - Se inscrever no site através do "Subscriber" na Home Page', () =>{

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit("/");
    });
    
    it('Inscrição através do SUBSCRIPTION da home page', () => {
        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
        cy.url().should('include', '/view_cart');
        cy.contains('h2', 'Subscription').should('be.visible');
        cy.get('input#susbscribe_email').type('teste1@teste.com.br');
        cy.get('button#subscribe').click();
        cy.get('.alert-success.alert').should('be.visible').and('have.text', 'You have been successfully subscribed!')
    });

});