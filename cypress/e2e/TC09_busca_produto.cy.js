describe('Test Case 9 - Busca produto no campo de busca"', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.url().should('include', '/');
  });
  
  it('Localizar produto "Green Side Placket Detail T-Shirt" no campo de busca', () => {

    cy.get('.nav.navbar-nav a[href="/products"]').should('contain.text', ' Products').click();
    cy.url().should('include', '/products');

    cy.contains('h2', 'All Products').should('be.visible');
    cy.get('input#search_product').type('Green Side Placket Detail T-Shirt');
    cy.get('button#submit_search').click();
    cy.contains('h2', 'Searched Products').should('be.visible');
    cy.get('.product-image-wrapper').should('be.visible');
    cy.contains('p', 'Green Side Placket Detail T-Shirt').should('be.visible');

  });
  
});

    