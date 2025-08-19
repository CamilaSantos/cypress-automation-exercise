describe("Test Case 24 - Realizar download da fatura ao finalizar a compra", () => {
  const nome = Cypress.env("TEST_USER_NAME");
  const email = Cypress.env("TEST_USER_EMAIL");
  const password = Cypress.env("TEST_USER_PASSWORD");

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.url().should("include", "/");
  });

  after(() => {
    cy.deleteUserViaUI();
  });

  it("Finalizar uma compra e realizar download da fatura", () => {
    cy.get('.productinfo a[data-product-id="12"]')
      .should("contain.text", "Add to cart")
      .click();
    cy.get(".modal-footer button.btn.btn-success.close-modal.btn-block")
      .should("contain.text", "Continue Shopping")
      .click();
    cy.get('.nav.navbar-nav a[href="/view_cart"]')
      .should("contain.text", " Cart")
      .click();
    cy.url().should("include", "/view_cart");

    cy.get("a.btn.btn-default.check_out")
      .should("contain.text", "Proceed To Checkout")
      .click();
    cy.get('.modal-body a[href="/login"]')
      .should("contain.text", "Register / Login")
      .click();

    cy.createTestUserViaUI_Continue(email, password, nome);

    cy.get('.nav.navbar-nav a[href="/view_cart"]')
      .should("contain.text", " Cart")
      .click();
    cy.url().should("include", "/view_cart");
    cy.get("a.btn.btn-default.check_out")
      .should("contain.text", "Proceed To Checkout")
      .click();

    cy.get("h2.heading").should("contain.text", "Address Details");
    cy.get("h2.heading").should("contain.text", "Review Your Order");
    cy.get("textarea.form-control").type("Compra teste!");

    cy.get('a[href="/payment"]').should("contain.text", "Place Order").click();
    cy.url().should("include", "/payment");
    cy.get("h2.heading").should("contain.text", "Payment");
    cy.get('input[data-qa="name-on-card"]').type("Sara Sarah");
    cy.get('input[data-qa="card-number"]').type("5130 2971 5157 2645");
    cy.get('input[data-qa="cvc"]').type("470");
    cy.get('input[data-qa="expiry-month"]').type("02");
    cy.get('input[data-qa="expiry-year"]').type("2027");

    cy.get("#success_message").should(
      "contain.text",
      "Your order has been placed successfully!"
    );

    cy.get('button[data-qa="pay-button"]').click();

    cy.get('h2[data-qa="order-placed"]').should(
      "contain.text",
      "Order Placed!"
    );
    cy.get("p").should(
      "contain.text",
      "Congratulations! Your order has been confirmed!"
    );

    cy.intercept("GET", "/download_invoice/359").as("downloadInvoice");

    cy.get('a[href="/download_invoice/359"]')
      .should("contain.text", "Download Invoice")
      .click();

    cy.wait("@downloadInvoice").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.headers["content-disposition"]).to.include(
        "attachment;"
      );
    });
  });
});
