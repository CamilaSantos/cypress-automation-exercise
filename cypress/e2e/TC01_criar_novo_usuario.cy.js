describe('Test Case 1 - Criar acesso de usuário (Signup)', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    beforeEach(() =>{
      cy.viewport(1920, 1080); 
      cy.visit('/');
      cy.url().should('include', '/');
    });

    it("Criar um novo usuário e deletar", () => {
          cy.createTestUserViaUI(email, password, nome);
          cy.deleteUserViaUI();   
    });  
});

