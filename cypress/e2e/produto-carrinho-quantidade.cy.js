describe("", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  const prod1 = 22;

  describe("Incluir produtos no carrinho", () => {
    it("Adicionar 3 produtos no carrinho e validar que os produtos estão no carrinho", () => {
      cy.get('a[href="/products"]').should("be.visible").click();
      cy.url().should("include", "/products");
      cy.contains("All Products").should("be.visible");
      cy.get(".features_items").should("exist");
      cy.get(
        `.productinfo.text-center .btn.btn-default.add-to-cart[data-product-id="${prod1}"]`
      ).should("be.visible");
      cy.get(`a[href="/product_details/${prod1}"`)
        .should("be.visible")
        .and("contain", "View Product")
        .click();

      cy.url().should("include", `/product_details/${prod1}`);
      cy.get(".product-information").should("exist");
      cy.contains("Long Maxi Tulle Fancy Dress Up Outfits -Pink").should(
        "be.visible"
      );

      cy.get(`input#quantity`).should("be.visible").clear().type("4");
      cy.get("button.btn.btn-default.cart")
        .should("be.visible")
        .and("contain", "Add to cart")
        .click();

      cy.get('p.text-center a[href="/view_cart"]')
        .should("be.visible")
        .and("contain", "View Cart")
        .click();
      cy.url().should("include", "/view_cart");

      cy.get("li.active").should("be.visible").and("contain", "Shopping Cart");

      cy.get("#cart_info.table-responsive.cart_info").should("be.visible");

      cy.get(`tr#product-${prod1}`).should("be.visible");

      cy.get("td.cart_quantity button")
        .should("be.visible")
        .and("contain", "4");
    });
  });
});
