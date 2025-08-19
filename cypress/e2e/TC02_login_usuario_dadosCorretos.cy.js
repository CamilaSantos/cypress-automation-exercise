describe('Test Case 2: Login User with correct email and password', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");


    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
        cy.log('before - Criando usuário de teste para o Test Case 2 via UI.');
        
        //command.js Criar usuário
        cy.createTestUserViaUI(email, password, nome);
        
        cy.log('before - Logout do usuário de teste para o Test Case 2 via UI.');
        //command.js Logout do usuário
        cy.logoutUserViaUI();
    });

    it('Deve realizar o login com credenciais corretas e validar o acesso', () => {
       
        cy.loginUserViaUI(email, password, nome);
        cy.deleteUserViaUI();
    });

});