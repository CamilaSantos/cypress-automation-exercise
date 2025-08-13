describe('Test Case 6 - Preencher e enviar o formulário Contact Us', () => {

  it('Preenchendo e enviando o formulário para "Contact Us"', () => {
    
      Cypress.env('popupConfirmado', false);

      cy.viewport(1900,1080);
      cy.visit('/');
      cy.contains(' Contact us').click();
      cy.url().should('include', '/contact_us');
      cy.contains('h2', 'Get In Touch').should('be.visible');

      //No ouvinte, acesse e altere a variável de ambiente.
      cy.on('window:confirm', (str) => {
          Cypress.env('popupConfirmado', true);
          expect(str).to.equal('Press OK to proceed!');
      });

      cy.get('input[data-qa="name"]').type('Ana Almeida');
      cy.get('input[data-qa="email"]').type('ana@teste2.com.br');
      cy.get('input[data-qa="subject"]').type('Blusa sem estoque');
      cy.get('textarea[data-qa="message"]').type('Notei que não tem em estoque 12-Azul em estoque, poderia avisar quando estiver disponível? Atenciosamente Ana Almeida');
      cy.get('input[type="file"]').selectFile('cypress/fixtures/test.txt');
      cy.get('input[type="file"]').should('include.value', 'test.txt');

      cy.get('input[data-qa="submit-button"]').click();

      //Garante que a validação só ocorrerá após o clique.
      cy.then(() => {
          expect(Cypress.env('popupConfirmado')).to.be.true;
      });

   
      cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
      cy.get('a.btn-success[href="/"]').click();
      cy.url().should('include', '/');
  });

});