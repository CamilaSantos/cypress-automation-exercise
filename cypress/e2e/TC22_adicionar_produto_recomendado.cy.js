describe('', () => {

    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.url().should('include', '/');
    });

    it('Adicionar um produto recomendado ao carrinho', () => {
        
        cy.log("Scroll na página principal e ir até produtos recomendados e adicionar ao carrinho");

        cy.get('h2').should('contains.text', 'recommended items');

        cy.contains('p', 'Men Tshirt')
        // Passo 2: Sobe na hierarquia do DOM para encontrar o elemento pai que envolve o produto
        .closest('.productinfo')
        // Passo 3: Dentro do produto, encontra o botão 'Add to cart'
        .find('a.btn.btn-default.add-to-cart')
        // Passo 4: Clica no botão
        .click();

        cy.log("Acessar página do carrinho e validar produto recomendado incluído");
        
        cy.get('.modal-body p.text-center a[href="/view_cart"]').should('contains.text', 'View Cart').click();
        cy.url().should('include', '/view_cart');
        cy.get('#product-2 h4').should('contains.text', 'Men Tshirt');



    });
});