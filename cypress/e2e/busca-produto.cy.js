describe('Acessar site "https://automationexercise.com"', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  const searchProduct = "Sleeveless Unicorn Patch Gown - Pink" 

    describe('Localizar produto especifico', () => {
            it('Acessando página "Products" e buscando o produto "Sleeveless Unicorn Patch Gown - Pink"', () => {
                cy.get('a[href="/products"]').should('be.visible').click();
                cy.url().should('include', '/products');
                cy.contains('All Products').should('be.visible');
                cy.get('.features_items').should('exist');
                cy.get('#search_product').type(searchProduct);
                cy.get('#submit_search').click();
                cy.get('.productinfo').contains('p',searchProduct).should('be.visible');
                cy.contains('View Product').click();
                cy.contains(searchProduct).should('be.visible');
                cy.contains('p','Availability:').should('be.visible').and('contain', 'In Stock');
                cy.contains('p','Condition:').should('be.visible').and('contain', 'New');
                cy.contains('p','Brand:').should('be.visible').and('contain', 'Allen Solly Junior');
                cy.contains('Home').click();
            });
        });
});

    