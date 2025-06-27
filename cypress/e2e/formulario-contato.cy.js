describe('Enviando relatório de contato "Contact us"', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  describe('Entrando em contato através do Contact us', () => {
      it('Acessar página "Contact us"', () => {

          cy.contains("Contact us").click();
          cy.url().should("include","/contact_us");
          cy.contains("Contact Us").should("be.visible");
          
          cy.get('input[data-qa="name"]').type("Test1");  
          
          cy.get('input[data-qa="email"]').type("testfake@fake.com.br");
          
          cy.get('input[data-qa="subject"]').type("Test de contato");
          
          cy.get('[data-qa="message"]').type("Meu pedido #78451 (blusa azul, 16/06) chegou roxa. Peço troca ou reembolso urgente.");

          // Upload do arquivo
          cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/test.txt');

          // Verifica se o arquivo está
          cy.get('input[type="file"]').should(($input) => {
            expect($input[0].files).to.have.length(1);
            expect($input[0].files[0].name).to.equal('test.txt');
          });

          cy.get('[data-qa="submit-button"]').click();
          
          cy.contains('Success! Your details have been submitted successfully.')
          .should('be.visible');

          cy.contains('Home').click();
      });
  });
});
