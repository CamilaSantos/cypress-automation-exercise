describe("", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  const prod1 = 1;

  describe("Checkout e criação de usuário", () => {
    it("Selecionar produto e na página cart criar um usuário através do Checkout", () => {
      // cy.url().should("include", "/");
      cy.log('localiza produto 1');
      cy.get(
        `a.btn.btn-default.add-to-cart[data-product-id="${prod1}"]`
      ).should("be.visible").and("contain", "Add to cart").click();
      cy.log('Localizou produto 1 e adicionou no carrinho [popup]');
      cy.get(".modal-content")
        .should("be.visible")
        .and("contain", "Your product has been added to cart.");
      cy.get('p.text-center a[href="/view_cart"]').should("be.visible").click();
      cy.url().should("include", "/view_cart");
    });
  });
});
