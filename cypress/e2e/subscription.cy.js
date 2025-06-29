describe('', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const email = Cypress.env("TEST_USER_EMAIL");

  describe('Realizar a inscrição no site', () => {

    it(`Informar ${email} no campo SUBSCRIPTION e conformar inscrição.` , () => {

        cy.url().should('include', '/');
        cy.contains('h2', 'Subscription').should('be.visible');
        cy.get('#susbscribe_email').should('be.visible').type(email);
        cy.get('#subscribe').should('be.visible').click();
        cy.get('.alert-success.alert')
        .should('be.visible')
        .and('contain', 'You have been successfully subscribed!');
    });

  });


});
