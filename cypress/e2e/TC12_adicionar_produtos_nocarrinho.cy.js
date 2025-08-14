describe('Test Case 12 - Adicionar produtos ao carrinho', () => {
    beforeEach('Acessar página Products', () => {
        cy.viewport(1920,1080 );
        cy.visit('/');
        cy.url().should('include', '/');

    });

    it('Incluir o primeiro produto no carrinho de compras e validar o produto na página Cart', () => {
        cy.visit('/products');
        cy.url().should('include', '/products');
        cy.contains('h2', 'All Products').should('be.visible');

        cy.get('.productinfo.text-center a[data-product-id="1"]').click();
        cy.contains('p', 'Your product has been added to cart.').should('be.visible');
        cy.get('p.text-center a[href="/view_cart"]').click();

        cy.url().should('include', '/view_cart');

        cy.get('td.cart_description a[href="/product_details/1"]').should('have.text', 'Blue Top');
        cy.get('td.cart_price p').should('have.text', 'Rs. 500');
        cy.get('td.cart_quantity button').should('have.text', '1');
        cy.get('td.cart_total p').should('have.text', 'Rs. 500');


    });
});
