describe('Test Case 18 - Visualizar categoria de produtos', () => {
    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    it('Selecionar categoria de produto ', () => {
        
        cy.contains('h2','Category').should('be.visible');

        cy.log('Categoria WOMEN');
        cy.get('a[href="#Women"]').click();
        cy.get('a[href="/category_products/2"]').should('contains.text', 'Tops ').click();
        cy.get('h2.title.text-center').should('contains.text','Women - Tops Products');
        cy.url().should('include', '/category_products/2');

        cy.log('Categoria MEN');
        cy.get('a[href="#Men"]').click();
        cy.get('a[href="/category_products/6"]').should('contains.text', 'Jeans ').click();
        cy.url().should('include', '/category_products/6');



    });
});