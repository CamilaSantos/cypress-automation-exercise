describe('Test Case 23 - Validar endereços na tela de Checkout', () =>{

    const nome = Cypress.env('TEST_USER_NAME');
    const email = Cypress.env('TEST_USER_EMAIL');
    const password = Cypress.env('TEST_USER_PASSWORD');

    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
        cy.createTestUserViaUI(email, password, nome);
    });

    after(() => {
        cy.deleteUserViaUI();
    });

    it('Validar endereço de usuário na tela de checkout', () => {
        cy.get('ul.nav.navbar-nav a[href="/products"]').should('contains.text', ' Products').click();
        cy.url().should('include', '/products');
        cy.get('h2.title.text-center').should('contain.text', 'All Products');
        cy.get('.productinfo a[data-product-id="5"]').click();
        cy.get('.modal-dialog button.btn.btn-success.close-modal.btn-block').should('contain.text', 'Continue Shopping').click();
        
        cy.get('ul.nav.navbar-nav a[href="/view_cart"]').should('contains.text', ' Cart').click();
        cy.url().should('include', '/view_cart');
        cy.get('a.btn.btn-default.check_out').should('contain.text', 'Proceed To Checkout').click();
        
        cy.get('.step-one h2').should('contain.text', 'Address Details');

        cy.get('li.address_title h3.page-subheading').should('contain.text', 'Your delivery address');
        cy.get('li.address_firstname.address_lastname').should('contain.text', 'Mr. Sara Sarah');
        cy.get('li.address_address1.address_address2').should('contain.text', 'Quadra Quadra 5 Comércio Local 5');
        cy.get('li.address_city.address_state_name.address_postcode')
        .invoke("text")
        .then((text) => {
            expect(text).to.include('BRASILIA DF');
            expect(text).to.include('73031515');
        });
        cy.get('li.address_country_name').should('contain.text', 'New Zealand');
        cy.get('li.address_phone').should('contain.text', '61985216700');


        cy.get('li.address_title h3.page-subheading').should('contain.text', 'Your billing address');
        cy.get('li.address_firstname.address_lastname').should('contain.text', 'Mr. Sara Sarah');
        cy.get('li.address_address1.address_address2').should('contain.text', 'Quadra Quadra 5 Comércio Local 5');
        cy.get('li.address_city.address_state_name.address_postcode')
        .invoke("text")
        .then((text) => {
            expect(text).to.include('BRASILIA DF');
            expect(text).to.include('73031515');
        });
        cy.get('li.address_country_name').should('contain.text', 'New Zealand');
        cy.get('li.address_phone').should('contain.text', '61985216700');


    });

});