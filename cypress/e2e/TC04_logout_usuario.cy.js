describe('Test Case 4 - Realizar Logout de usuário', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    before(() =>{
        cy.viewport(1900,1080);
        cy.visit('/');

        //commands.js Criar novo usuário e realizar logout
        cy.createTestUserViaUI(email, password, nome);
        cy.logoutUserViaUI();
    });

    beforeEach(() => {
        cy.viewport(1900,1080);
        cy.visit('/');
        //commands.js Login do usuário
        cy.loginUserViaUI(email, password, nome);
    });

    after(() =>{
        cy.viewport(1900,1080);
        cy.visit('/');

        //commands.js Login do usuário para depois deletar
        cy.loginUserViaUI(email, password, nome);
        cy.deleteUserViaUI();
    });

    it('Deve realizar o logout do usuário logado', () =>{
        cy.viewport(1900,1080);
        cy.visit('/');
        //commands.js Logout do usuário logado.
        cy.logoutUserViaUI();
    });

});