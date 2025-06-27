describe('', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  describe('Visualizar produtos - "Products"', () => {
        //1 Acessar a página principal
        //2 Verificar que está na página principal
        //3 Cliar em 'Products'
        //4 Verificar que está na pagina 'Products' texto: ALL PRODUCTS
        //5 Lita de produtos visiveis 
        //6 Cliar em 'View Product' do primeiro produto
        //7 O usuário sendo direicionado para tela de detalhe do produto, valide se os seguintes elementos estão visíveis: 
        // product name, category, price, availability, condition, brand

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