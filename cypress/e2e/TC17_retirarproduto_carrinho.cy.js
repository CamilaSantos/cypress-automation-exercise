describe('Test case 17 - Remover produto do carrinho',() =>{

    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    it('Incluir produto no carrinho, consultar a página "Cart" e remover produto do carrinho. ', () => {
        cy.get('.nav.navbar-nav a[href="/products"]').click();
        cy.url().should('include', '/products');

        cy.get('.productinfo.text-center a[data-product-id="5"]').should('contain.text', 'Add to cart').click();
        cy.get('.modal-body p.text-center').should('contain.text', 'Your product has been added to cart.');
        cy.get('.modal-body p.text-center a[href="/view_cart"]').should('contain.text', 'View Cart').click();
        cy.url().should('include','/view_cart');
        cy.get('td.cart_description h4').should('contains.text', 'Winter Top');
        cy.get('td.cart_total p.cart_total_price').should('contains.text', 'Rs. 600');
        cy.get('td.cart_delete a[data-product-id="5"]').click();

        cy.get("span#empty_cart .text-center")
        .invoke("text")
        .then((text) => {
            const normalizedText = text.trim().replace(/\s+/g, " ");
            expect(normalizedText).to.equal("Cart is empty! Click here to buy products.");
        });
    });

});