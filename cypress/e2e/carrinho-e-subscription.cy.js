describe('', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const email = Cypress.env("TEST_USER_EMAIL");

  describe('Realizar a inscrição no site', () => {

    it(`Acessar página "Cart" realizar a inscrição informando o ${email} no campo SUBSCRIPTION, confirmando inscrição.` , () => {

        cy.url().should('include', '/');
        cy.get('.nav.navbar-nav a[href="/view_cart"]').should('be.visible').and('contain', 'Cart').click();
        cy.get('li.active').should('be.visible').and('contain', 'Shopping Cart')
        cy.scrollTo('bottom');
        cy.contains('h2', 'Subscription').should('be.visible');
        cy.get('#susbscribe_email').should('be.visible').type(email);
        cy.get('#subscribe').should('be.visible').click();
        cy.get('.alert-success.alert')
        .should('be.visible')
        .and('contain', 'You have been successfully subscribed!');
    });

  });


});
