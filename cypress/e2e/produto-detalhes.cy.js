describe('', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  describe('Visualizar produtos - "Products"', () => {

        it('Acessar a página de produtos visualizar seus detalhes', () => {
            cy.get('a[href="/products"]').should('be.visible').click();
            cy.url().should('include', '/products');
            cy.contains('All Products').should('be.visible');
            cy.get('.features_items').should('exist');
            cy.get('a[href="/product_details/1"]').should('be.visible').click();
            cy.get('.product-information').should('exist');
            cy.contains('Blue Top').should('be.visible');
            cy.contains('Category: Women > Tops').should('be.visible');
            cy.contains('Rs. 500').should('be.visible');
            cy.contains('p','Availability:').should('be.visible');
            cy.contains('p','Condition:').should('be.visible');
            cy.contains('p','Brand:').should('be.visible');
            cy.contains('Home').click();

        });
  });


});