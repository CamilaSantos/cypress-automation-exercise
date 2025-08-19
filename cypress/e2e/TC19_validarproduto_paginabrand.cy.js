describe('Test Case 19 - Validar página Brand', () => {

    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    it('Acessar página Brand através do menu lateral, e selecionar diferentes brands para garantir funcionalidade', () => {
        cy.visit('/products');
        cy.url().should('include', '/products');
        cy.get('.brands_products h2').should('contains.text', 'Brands');
        cy.get('.brands-name a[href="/brand_products/Polo"]').should('contains.text', 'Polo').click();
        cy.get('h2.title.text-center').should('contains.text', 'Brand - Polo Products');
        cy.get('.brands-name a[href="/brand_products/Babyhug"]').should('contains.text', 'Babyhug').click();
        cy.get('h2.title.text-center').should('contains.text', 'Brand - Babyhug Products');
    });

});