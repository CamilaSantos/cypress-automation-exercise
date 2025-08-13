describe('Test Case 5 - Registrar um novo usuário com um e-mail já existente', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const nome2 = "Valdir";
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    before(() => {
        cy.viewport(1900,1080);
        cy.visit('/');
        cy.createTestUserViaUI(email, password, nome);
        cy.logoutUserViaUI();
    });

    after(() => {
        cy.viewport(1900,1080);
        cy.visit('/');
        cy.loginUserViaUI(email, password, nome);
        cy.deleteUserViaUI();
    });

    it('Criar um usuário com e-mail já existente', () => {
        cy.log(`Executando criação de usuário via UI: ${email} (Nome: ${nome2})`);

        cy.contains("Signup / Login").click();
        cy.url().should("include", "/login");
        cy.contains("New User Signup!").should("be.visible");
        cy.get('input[data-qa="signup-name"]').type(nome2);
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('[data-qa="signup-button"]').should('be.visible').click();
        cy.contains('p', 'Email Address already exist!').should('be.visible');
    });

});