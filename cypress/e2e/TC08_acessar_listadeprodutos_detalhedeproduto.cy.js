describe('Test Case 8 - Verificar lista de produtos e detalhe de produto', () => {

      beforeEach(() =>{
         cy.viewport(1920, 1080);
         cy.visit("/products");
         cy.contains('h2', 'All Products').should('be.visible');
      });
      
      it('Acessar a página de "Product", validar que a lista foi carregada', () => {
          cy.get('.features_items').should('be.visible');
      });

      it('Verificando detalhes do produto Blue Top', () => {
          cy.get('a[href="/product_details/1"]').click();
          
          cy.url().should('include', '/product_details/1');
          
          cy.contains('h2', 'Blue Top').should('be.visible');
          cy.contains('p', 'Category: Women > Tops').should('be.visible');
          cy.contains('span', 'Rs. 500').should('be.visible');
          cy.get('input#quantity').should('have.value', '1');
          cy.contains('p', 'Availability: In Stock').should('be.visible');
          cy.contains('p', 'Condition: New').should('be.visible');
          cy.contains('p', 'Brand: Polo').should('be.visible');

      });
});