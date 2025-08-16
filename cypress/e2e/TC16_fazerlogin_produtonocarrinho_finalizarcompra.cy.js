describe('Test Case 16 - Realizar login e finalizar uma compra', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    beforeEach(()=>{
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should("include", "/");
        cy.createTestUserViaUI(email, password, nome);
        cy.logoutUserViaUI();
    });

    after(()=>{
        cy.deleteUserViaUI();
    });

    it('Fazer login completar uma compra', () => {

        cy.loginUserViaUI(email, password, nome);
        
        cy.visit('/products');
        cy.url().should("include", "/products");
        cy.get('a[data-product-id="3"]').contains('Add to cart').click();
        cy.get('p.text-center').contains('Your product has been added to cart.').should('be.visible');
        cy.get('a[href="/view_cart"]').contains('View Cart').click();
        cy.get('h4').contains('Sleeveless Dress').should('be.visible');
        cy.get('a.btn.btn-default.check_out').contains('Proceed To Checkout').click();


        cy.get('h2').contains('Address Details').should('be.visible');

        cy.get('h3.page-subheading').contains('Your delivery address').should('be.visible');
        cy.get('li.address_firstname.address_lastname').contains('Mr. Sara Sarah').should('be.visible');
        cy.get('li.address_address1.address_address2').contains('Quadra Quadra 5 Comércio Local 5').should('be.visible');
        cy.get('li.address_city.address_state_name.address_postcode')
        .invoke('text')
        .then(text => {
            expect(text).to.include('BRASILIA DF');
            expect(text).to.include('73031515');
        });
        cy.get('li.address_country_name').contains('New Zealand').should('be.visible');
        cy.get('li.address_phone').contains('61985216700').should('be.visible');
        cy.get('h2').contains('Review Your Order').should('be.visible');
        cy.get('h4').contains('Sleeveless Dress').should('be.visible');
        cy.get('textarea.form-control').type('texto na área de texto');
        cy.get('a[href="/payment"]').contains('Place Order').click();

        cy.url().should('include', '/payment');

        cy.get('input[data-qa="name-on-card"]').type('Sara Sarah');
        cy.get('input[data-qa="card-number"]').type('5467 3114 9884 6464');
        cy.get('input[data-qa="cvc"]').type('648');
        cy.get('input[data-qa="expiry-month"]').type('02');
        cy.get('input[data-qa="expiry-year"]').type('2026');
        cy.get('button[data-qa="pay-button"]').contains('Pay and Confirm Order').click();

        cy.url().should('include', '/payment_done/');
        cy.get('h2[data-qa="order-placed"]').contains('Order Placed!').should('be.visible');
        cy.get('p').contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.get('a[data-qa="continue-button"]').contains('Continue').click();

    });

});