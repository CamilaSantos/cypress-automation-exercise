describe('Test Case 4 - Realizar Logout de usuário', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    beforeEach(() =>{
        cy.viewport(1900,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    after(() =>{
        cy.loginUserViaUI(email, password, nome);
        cy.deleteUserViaUI();
    });

    it('Deve realizar o logout do usuário logado', () =>{
        cy.createTestUserViaUI(email, password, nome);
        cy.logoutUserViaUI();
    });

});