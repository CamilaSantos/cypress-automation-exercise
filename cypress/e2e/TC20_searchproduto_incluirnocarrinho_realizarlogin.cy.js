describe('Test Case 20 - Localizar produto incluir no carrinho e consultar após login', () => {


    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    beforeEach(()=>{
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include','/')
    });

    after(() => {
        cy.deleteUserViaUI();
    });

    it('1-Utilizar o Search para localizar produto, 2- incluir no carrinho, 3- Realizar login e validar que o produto está no carrinho', () => {
        
        cy.log("1-Utilizar o Search para localizar produto");
        
        cy.get('a[href="/products"]').should('contains.text', ' Products').click();
        cy.get('h2.title.text-center').should('contains.text','All Products');
        cy.get('input#search_product').type('Cotton Mull Embroidered Dress');
        cy.get('button#submit_search').click();

        cy.log("2- incluir no carrinho");

        cy.get('.productinfo.text-center a[data-product-id="20"]').should('contains.text', 'Add to cart').click();
        cy.get('.modal-body p.text-center').should('contains.text', 'Your product has been added to cart.');
        cy.get('button[data-dismiss="modal"]').should('contains.text', 'Continue Shopping').click();

        cy.log("3- Realizar login e validar que o produto está no carrinho");

        cy.createTestUserViaUI(email, password, nome);
        cy.get('ul.nav.navbar-nav a[href="/view_cart"]').should('contains.text',' Cart').click();
        cy.get('li.active').should('contains.text', 'Shopping Cart');
        cy.get('td.cart_description h4').should('contains.text', 'Cotton Mull Embroidered Dress');
    });
});