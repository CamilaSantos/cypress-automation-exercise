const nome = "Jennifer";
const email = "jennifer.sarah.assuncao@cladm.com.br";
const password = "jennifer.sarah";


describe("Criar acesso de usuário (Signup)", () => {
  beforeEach(() =>{
    cy.viewport(1920, 1080); 
    cy.visit('/');
  });

  describe('Casdastro de um novo usuário', () => {
    it("Preencher nome e email do novo usuário e clicar em Signup", () => {
        cy.contains("Signup / Login").click();
        cy.url().should("include", "/login");
        cy.contains("New User Signup!").should("be.visible");
        cy.get('input[data-qa="signup-name"]').type(nome);
        cy.get('input[data-qa="signup-email"]').type(email);

        // Caso o dev utilize boa práticas incluindo atributos personalizados no front, ex.: data-qa
        cy.get('[data-qa="signup-button"]').click();

        // Formas caso o dev não utilize boas práticas como exemplo acima

        // cy.contains("button","Signup").click();  // <- Através do atributo button irá fazer uma varredutar no código e agir no primeiro que tiver esta condição
        // cy.get('button[type="submit"].btn.btn-default'); // <- Através do atrbuto type e class CSS. Não funciona em caso de haver muitos botões com estes atributos o cypress não irá acionar nenhum dos botões.
        // cy.get('.btn.btn-default').contains('Signup').click(); // <- Combinação de get (atributos class do CSS) e contains (atributo HTML texto "Signup")

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
          .find("option:selected") //Encontra o option selecionado
          .should("have.text", "April"); //Valida se o texto visível desse option é 'April'
        cy.get('[data-qa="years"]')
          .select("1990")
          .find("option:selected") //Encontra o option selecionado
          .should("have.text", "1990"); //Valida se o texto visível desse option é '1988'

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

        cy.contains("Account Created!").should("be.visible");

        cy.get('[data-qa="continue-button"]').click();
      });
  });
  
  describe('Realizar login com o ultimo usuário cadastrado e deletar os dados em seguida', () => {
    it('Realizar login com o ultimo usuário cadastrado e deletar os dados em seguida', () => {
        cy.contains("Signup / Login").click();
        cy.url().should("include", "/login");
        cy.contains("Login to your account").should("be.visible");
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);
        cy.get('[data-qa="login-button"]').click();
        
        // cy.log("Deletando dados do usuároio no link Delete Account!")
        cy.contains("Delete Account").click();
        cy.contains("Account Deleted!").should("be.visible");        
      });
  });

});

