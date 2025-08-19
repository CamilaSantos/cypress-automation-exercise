describe('Test Case 13 - Validar a quantidade de produto no carrinho', () => {
  beforeEach("", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.url().should('include', "/");
  });

  it("Na tela de produto adicionar 4 produtos no carrinho e validar a quantidade de produtos na página Cart", () => {
    cy.get('.nav.navbar-nav a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.contains("h2", "All Products").should("be.visible");


    cy.get('a[href="/product_details/1"]').click();
    cy.url().should('include','/product_details/1');
    cy.get('input#quantity').clear().type('4');
    cy.get('.btn.btn-default.cart').click();

    cy.get('p.text-center a[href="/view_cart"]').click();
    cy.url().should('include','/view_cart');

    cy.get('td.cart_quantity button').should('have.text', '4');
    cy.get('td.cart_total p.cart_total_price').should('have.text', 'Rs. 2000');


  });
});
