describe("", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  const prod1 = 16;
  const prod2 = 22;
  const prod3 = 39;

  describe("Incluir produtos no carrinho", () => {
    it("Adicionar 3 produtos no carrinho e validar que os produtos estão no carrinho", () => {
      cy.get('a[href="/products"]').should("be.visible").click();
      cy.url().should("include", "/products");
      cy.contains("All Products").should("be.visible");
      cy.get(".features_items").should("exist");
      cy.get(
        `.productinfo.text-center .btn.btn-default.add-to-cart[data-product-id="${prod1}"]`
      )
        .should("be.visible")
        .and("contain", "Add to cart")
        .click();
      cy.contains("Added!").should("be.visible");
      cy.contains("p", "Your product has been added to cart.").should(
        "be.visible"
      );
      cy.get(
        '.modal-footer .btn.btn-success.close-modal.btn-block[data-dismiss="modal"]'
      )
        .should("be.visible")
        .and("contain", "Continue Shopping")
        .click();
      cy.get(
        `.productinfo.text-center .btn.btn-default.add-to-cart[data-product-id="${prod2}"]`
      )
        .should("be.visible")
        .and("contain", "Add to cart")
        .click();
      cy.contains("Added!").should("be.visible");
      cy.contains("p", "Your product has been added to cart.").should(
        "be.visible"
      );
      cy.get(
        '.modal-footer .btn.btn-success.close-modal.btn-block[data-dismiss="modal"]'
      )
        .should("be.visible")
        .and("contain", "Continue Shopping")
        .click();
      cy.get(
        `.productinfo.text-center .btn.btn-default.add-to-cart[data-product-id="${prod3}"]`
      )
        .should("be.visible")
        .and("contain", "Add to cart")
        .click();
      cy.contains("Added!").should("be.visible");
      cy.contains("p", "Your product has been added to cart.").should(
        "be.visible"
      );
      cy.get('p.text-center a[href="/view_cart"]')
        .should("be.visible")
        .and("contain", "View Cart")
        .click();
      cy.url().should("include", "/view_cart");

      cy.get("li.active").should("be.visible").and("contain", "Shopping Cart");

      cy.get("#cart_info.table-responsive.cart_info").should("be.visible");

      cy.get(`tr#product-${prod1}`).should("be.visible");
      cy.get(`.cart_description a[href="/product_details/${prod1}"]`)
        .should("be.visible")
        .and("contain", "Sleeves Top and Short - Blue & Pink");
      cy.get("td.cart_description p")
        .should("be.visible")
        .and("contain", "Kids > Dress");
      cy.get("td.cart_price p").should("be.visible").and("contain", "Rs. 478");
      cy.get("td.cart_quantity button")
        .should("be.visible")
        .and("contain", "1");
      cy.get("td.cart_total p.cart_total_price")
        .should("be.visible")
        .and("contain", "Rs. 478");

      cy.get(`tr#product-${prod2}`).should("be.visible");
      cy.get(`.cart_description a[href="/product_details/${prod2}"]`)
        .should("be.visible")
        .and("contain", "Long Maxi Tulle Fancy Dress Up Outfits -Pink");
      cy.get("td.cart_description p")
        .should("be.visible")
        .and("contain", "Kids > Dress");
      cy.get("td.cart_price p").should("be.visible").and("contain", "Rs. 1600");
      cy.get("td.cart_quantity button")
        .should("be.visible")
        .and("contain", "1");
      cy.get("td.cart_total p.cart_total_price")
        .should("be.visible")
        .and("contain", "Rs. 1600");

      cy.get(`tr#product-${prod3}`).should("be.visible");
      cy.get(`.cart_description a[href="/product_details/${prod3}"]`)
        .should("be.visible")
        .and("contain", "Cotton Silk Hand Block Print Saree");
      cy.get("td.cart_description p")
        .should("be.visible")
        .and("contain", "Women > Saree");
      cy.get("td.cart_price p").should("be.visible").and("contain", "Rs. 3000");
      cy.get("td.cart_quantity button")
        .should("be.visible")
        .and("contain", "1");
      cy.get("td.cart_total p.cart_total_price")
        .should("be.visible")
        .and("contain", "Rs. 3000");
    });
  });
});
