describe('Verificar site Automation Exercise', () =>{

    it('Deve visitar a página inicio com sucesso e verificar o título', () => {
        cy.visit('/');
        cy.url().should('include', 'automationexercise.com');
        cy.title().should('eq', 'Automation Exercise')
    });

    it('Deve navegar para a página de Login/Signup e verificar o texto', () => {
        cy.visit('/');
        cy.contains('Signup / Login').click();
        cy.url().should('include', '/login');
        cy.contains('Login to your account').should('be.visible');
    });
})