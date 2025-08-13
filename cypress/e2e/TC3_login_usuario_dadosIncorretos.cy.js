describe('Test Case 3 - Login de usuário com email e senha incorretos', () => {

    const email = "teste12M@teste.com.br";
    const password = "teste12M";

    it('Deverá retornar mensagem de erro ao realizar login com dados inexistentes', () => {
        cy.viewport(1920,1080);
        cy.visit('/');

        cy.contains('a', ' Signup / Login').click();
        cy.get('input[data-qa="login-email"]').should('be.visible').type(email);
        cy.get('input[data-qa="login-password"]').should('be.visible').type(password);
        cy.get('button[data-qa="login-button"]').click();
        cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
        
    });
});