// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//Criando o comando cy.login para poder ser utilizada nos demais scripts
Cypress.Commands.add('login', (email, password, nome) => {
    cy.session([email, password, nome], () => {
        cy.visit('/login'); //Acessando a página de login do site
    
        cy.get('input[data-qa="login-email"]').should('be.visible').type(email);
        cy.get('input[data-qa="login-password"]').should('be.visible').type(password);
        cy.get('[data-qa="login-button"]').should('be.visible').click();

    },
    {
        validate: () => {
            cy.contains('a',' Logged in as ').should('be.visible').and('contain', nome);
            // cy.visit('/'); //Envia para a página principal
        },
    });
});

// Criar usuário
Cypress.Commands.add('createTestUserViaUI', (nome, email, password) => {
    cy.log(`Executando criação de usuário via UI: ${email} (Nome: ${nome})`);

     cy.contains("Signup / Login").click();
        cy.url().should("include", "/login");
        cy.contains("New User Signup!").should("be.visible");
        cy.get('input[data-qa="signup-name"]').type(nome);
        cy.get('input[data-qa="signup-email"]').type(email);

        // Caso o dev utilize boa práticas incluindo atributos personalizados no front, ex.: data-qa
        cy.get('[data-qa="signup-button"]').click();
        cy.contains("Enter Account Information").should("be.visible");
        cy.get("#id_gender1").check();
        cy.get("#id_gender1").should("be.checked");
        cy.get("#id_gender2").should("not.be.checked");

        cy.get('input[data-qa="name"]')
          .should("be.visible")
          .and("have.value", nome);
        cy.get('input[data-qa="email"]')
          .should("be.visible")
          .and("have.value", email);

        cy.get('input[data-qa="password"]').type(password);

        cy.get('[data-qa="days"]')
          .select("19")
          .find("option:selected") //Encontra o option selecionado
          .should("have.text", "19"); //Valida se o texto visível desse option é '27'
        cy.get('[data-qa="months"]')
          .select("April")
          .find("option:selected") 
          .should("have.text", "April"); 
        cy.get('[data-qa="years"]')
          .select("1990")
          .find("option:selected") 
          .should("have.text", "1990");

        cy.get("#newsletter").uncheck();
        cy.get("#newsletter").should("not.be.checked"); //Valida se está a caixa está checkada
        cy.get("#optin").check();
        cy.get("#optin").should("be.checked"); //Valida se está a caixa está checkada

        cy.contains("Address Information").should("be.visible");

        cy.get('input[data-qa="first_name"]').type(nome);
        cy.get('input[data-qa="last_name"]').type("Sarah");
        cy.get('input[data-qa="address"]').type("Quadra Quadra 5 Comércio Local 5");
        cy.get('[data-qa="country"]')
          .select("New Zealand")
          .find("option:selected")
          .should("have.text", "New Zealand");
        cy.get('input[data-qa="state"]').type("DF");
        cy.get('input[data-qa="city"]').type("BRASILIA");
        cy.get('input[data-qa="zipcode"]').type("73031515");
        cy.get('input[data-qa="mobile_number"]').type("61985216700");
        cy.get('[data-qa="create-account"]').click();
        
        cy.url().should('include', '/account_created');
        cy.contains("Account Created!").should("be.visible");
        cy.get('a[data-qa="continue-button"]').click();
        cy.url().should('include', '/'); // Volta para a home page logado
        cy.contains('a', ' Logged in as ').should('be.visible').and('contain', nome);
});

//Deleta usuário
Cypress.Commands.add('deleteUserViaUI', () => {
    cy.log('Executando deleção do usuário via UI.');

    cy.get('a[href="/delete_account"]').should('be.visible').click();
    cy.url().should('include', '/delete_account');
    cy.contains('Account Deleted!').should('be.visible'); // Mensagem de sucesso na tela
    cy.wait(1000);
    cy.get('a[data-qa="continue-button"]').should('be.visible').click();
});

//Realizar logout do usuário logado
Cypress.Commands.add('logout', () => {
  cy.log('Executando logout...');
  cy.get('a[href="/logout"]').click();
  cy.url().should('include', '/login');
  cy.contains("Signup / Login").should('be.visible');
});