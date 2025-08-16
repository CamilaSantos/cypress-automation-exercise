describe("Test Cases 14 - Finalização Compra - Se registrar após incluir itens no carrinho", () => {
  const nome = Cypress.env("TEST_USER_NAME");
  const email = Cypress.env("TEST_USER_EMAIL");
  const password = Cypress.env("TEST_USER_PASSWORD");

  beforeEach("", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  after("[hook:after] - Deletar usuário", () => {
    cy.deleteUserViaUI();
  });

  it("Preparar pedido, realizar o cadastro de um novo usuário e finalizar a compra", () => {
    cy.url().should("include", "/");
    cy.visit("/products");
    cy.url().should("include", "/products");
    cy.contains("h2", "All Products").should("be.visible");

    cy.get(".productinfo.text-center").contains("Add to cart").click();
    cy.get(".modal-body p.text-center").should(
      "contain.text",
      "Your product has been added to cart."
    );
    cy.get("p.text-center").contains("View Cart").click();

    cy.url().should("include", "/view_cart");
    cy.get("a.btn.btn-default.check_out")
      .contains("Proceed To Checkout")
      .click();
    cy.get(".modal-body p.text-center").should(
      "contain.text",
      "Register / Login account to proceed on checkout."
    );
    cy.get("p.text-center").contains("Register / Login").click();

    cy.createTestUserViaUI_Continue(email, password, nome);

    cy.visit("/view_cart");
    cy.url().should("include", "/view_cart");
    cy.get("a.btn.btn-default.check_out")
      .contains("Proceed To Checkout")
      .click();
    cy.url().should("include", "/checkout");

    cy.contains("ul#address_delivery h3", "Your delivery address").should(
      "be.visible"
    );
    cy.get("ul#address_delivery li.address_firstname.address_lastname").should(
      "contain.text",
      "Mr. Sara Sarah"
    );
    cy.get("ul#address_delivery li.address_address1.address_address2").should(
      "contain.text",
      "Quadra Quadra 5 Comércio Local 5"
    );
    // cy.get('ul#address_delivery').find('li.address_city.address_state_name.address_postcode').should('have.text', 'BRASILIA DF\n\t\t\t\t\t\t\t\t73031515');
    cy.get("ul#address_delivery")
      .find("li.address_city.address_state_name.address_postcode")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("BRASILIA DF");
        expect(text).to.include("73031515");
      });

    cy.get("ul#address_delivery li.address_country_name").should(
      "contain.text",
      "New Zealand"
    );
    cy.get("ul#address_delivery li.address_phone").should(
      "contain.text",
      "61985216700"
    );

    cy.contains("ul#address_invoice h3", "Your billing address").should(
      "be.visible"
    );
    cy.get("ul#address_invoice li.address_firstname.address_lastname").should(
      "contain.text",
      "Mr. Sara Sarah"
    );
    cy.get("ul#address_invoice li.address_address1.address_address2").should(
      "contain.text",
      "Quadra Quadra 5 Comércio Local 5"
    );
    cy.get("ul#address_invoice")
      .find("li.address_city.address_state_name.address_postcode")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("BRASILIA DF");
        expect(text).to.include("73031515");
      });
    cy.get("ul#address_invoice li.address_country_name").should(
      "contain.text",
      "New Zealand"
    );
    cy.get("ul#address_invoice li.address_phone").should(
      "contain.text",
      "61985216700"
    );

    cy.get('a[href="/payment"]').click();
    cy.url().should("include", "/payment");
    cy.contains("h2", "Payment").should("be.visible");

    cy.get('input[data-qa="name-on-card"]').type("Sara Sarah");
    cy.get('input[data-qa="card-number"]').type("5240 4104 4053 9567");
    cy.get('input[data-qa="cvc"]').type("540");
    cy.get('input[data-qa="expiry-month"]').type("02");
    cy.get('input[data-qa="expiry-year"]').type("2026");
    cy.get('button[data-qa="pay-button"]').click();
    cy.get(".alert-success.alert").should(
      "contain.text",
      "You have been successfully subscribed!"
    );

    cy.contains("h2", "Order Placed!").should("be.visible");
    cy.contains("p", "Congratulations! Your order has been confirmed!").should(
      "be.visible"
    );
  });
});
