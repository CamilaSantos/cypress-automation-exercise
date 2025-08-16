describe("Test Case 15 - Criar usuário e finalizar uma compra", () => {
  const nome = Cypress.env("TEST_USER_NAME");
  const email = Cypress.env("TEST_USER_EMAIL");
  const password = Cypress.env("TEST_USER_PASSWORD");

  beforeEach(`Criando um novo usuário para: ${email}`, () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.url().should("include", "/");
    cy.createTestUserViaUI(email, password, nome);
  });

  after(`Deletar usuário: ${email}`, () => {
    cy.deleteUserViaUI();
  });

  it(`Com o login ao usuário ${nome}, selecionar produto e finalizar o pedido`, () => {
    cy.visit("/products");
    cy.url().should("include", "/products");
    cy.get('.productinfo.text-center a[data-product-id="2"]')
      .contains("Add to cart")
      .click();
    cy.get(".modal-body p.text-center").should(
      "contain.text",
      "Your product has been added to cart."
    );
    cy.get('.modal-body p.text-center a[href="/view_cart"]')
      .contains("View Cart")
      .click();
    cy.url().should("include", "/view_cart");

    cy.get("a.btn.btn-default.check_out").contains("Checkout").click();
    cy.url().should("include", "/checkout");

    cy.get("h2").should("contain.text", "Address Details");

    cy.get("h3.page-subheading").contains("Your delivery address");
    cy.get("li.address_firstname.address_lastname").contains("Mr. Sara Sarah");
    cy.get("li.address_address1.address_address2").contains(
      "Quadra Quadra 5 Comércio Local 5"
    );
    cy.get("li.address_city.address_state_name.address_postcode ")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("BRASILIA DF");
        expect(text).to.include("73031515");
      });
    cy.get("li.address_country_name").contains("New Zealand");
    cy.get("li.address_phone").contains("61985216700");

    cy.contains("h2", "Review Your Order").should("be.visible");

    cy.get("h4").contains("Men Tshirt");

    cy.get("p.cart_total_price").contains("Rs. 400");

    cy.get("textarea.form-control").type("Texto na área ...");

    cy.get('a[href="/payment"]').contains("Place Order").click();
    cy.url().should("include", "/payment");

    cy.contains("h2", "Payment").should("be.visible");

    cy.get('input[data-qa="name-on-card"]').type("Sara Sarah");
    cy.get('input[data-qa="card-number"]').type("5467 3114 9884 6464");
    cy.get('input[data-qa="cvc"]').type("648");
    cy.get('input[data-qa="expiry-month"]').type("02");
    cy.get('input[data-qa="expiry-year"]').type("2026");
    

    cy.get('button[data-qa="pay-button"]')
      .contains("Pay and Confirm Order")
      .click();


    cy.contains('h2','Order Placed!').should('be.visible');

    cy.get("p").contains(
      "Congratulations! Your order has been confirmed!"
    );
    cy.get('a[data-qa="continue-button"]').contains("Continue").click();

    cy.url().should("include", "/");
  });
});
