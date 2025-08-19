describe('Test Case 21 - Incluir Review em um produto', () => {

    const nome = Cypress.env("TEST_USER_NAME");
    const email = Cypress.env("TEST_USER_EMAIL");
    const password = Cypress.env("TEST_USER_PASSWORD");

    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    it('Visualizar detalhes do produto e adcionar um review através do formulário da página', () => {
        
        cy.log("Acessando a página Products");

        cy.get('ul.nav.navbar-nav a[href="/products"]').should('contains.text', ' Products').click();
        cy.get('h2.title.text-center').should('contains.text', 'All Products');

        cy.log("Visualizar detalhe do produto");

        cy.get('a[href="/product_details/2"]').should('contains.text', 'View Product').click();
        cy.get('.product-information h2').should('contains.text', 'Men Tshirt');

        cy.log("Adicionar review de produto");

        cy.get('li.active a[data-toggle="tab"]').should('contains.text', 'Write Your Review');
        cy.get('form#review-form input#name').type(nome);
        cy.get('form#review-form input#email').type(email);
        cy.get('form#review-form textarea#review').type('Produto muito bom!');
        cy.get('button#button-review').should('contains.text', 'Submit').click();
        cy.get('#review-section.form-row .alert-success.alert').should('contains.text', 'Thank you for your review.');



    });

});