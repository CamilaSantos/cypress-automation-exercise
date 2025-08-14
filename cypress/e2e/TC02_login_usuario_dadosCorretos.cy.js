describe('Test Case 2: Login User with correct email and password', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");


    before(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
        cy.log('before - Criando usuário de teste para o Test Case 2 via UI.');
        
        //command.js Criar usuário
        cy.createTestUserViaUI(email, password, nome);
        
        cy.log('before - Logout do usuário de teste para o Test Case 2 via UI.');
        //command.js Logout do usuário
        cy.logoutUserViaUI();
    });

    

    after(() =>{
        cy.viewport(1920, 1080);
        cy.visit('/');
        cy.log('Deletando usuário de teste após o Test Case 2 finalizar');

        cy.contains("Signup / Login").click();
        cy.loginUserViaUI(email, password, nome)
        //commands.js Deletar usuário

        cy.log('After - Deletando o usuário.');
        cy.deleteUserViaUI();
        cy.log('Usuário deletado. O ambiente está limpo.');
    });

    it('Deve realizar o login com credenciais corretas e validar o acesso', () => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.log('Iniciando teste de login.');

        cy.contains("Signup / Login").click();
        cy.url().should('include', '/login');
        cy.contains('Login to your account').should('be.visible');

        cy.log('it() - Iniciando o login.');
        cy.loginUserViaUI(email, password, nome);

        // cy.contains(`Logged in as ${nome}`).should('be.visible');
        
        cy.logoutUserViaUI();

    });

});