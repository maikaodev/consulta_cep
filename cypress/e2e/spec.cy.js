describe("Home", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("Verifique se tem um formulário", () => {
    cy.findByTestId("form");
    cy.findByTestId("input-text-zip-code");
    cy.findByTestId("submit");
  });
  it("Enviando um CEP inválido.", () => {
    cy.findByTestId("input-text-zip-code").type("5701500");
    cy.findByTestId("input-text-zip-code").type("@@@3333");
    cy.findByTestId("input-text-zip-code").type("@@@aaaaa");
    cy.findByTestId("submit").click();
    cy.findByTestId("modal").contains("Digite um CEP válido!");
  });
  it("Enviando um CEP válido.", () => {
    cy.findByTestId("input-text-zip-code").type("57015040");
    cy.findByTestId("submit").click();
    cy.findByTestId("loading");
    cy.findByTestId("result-list");
    cy.url().should("include", "http://127.0.0.1:5173/?cep=57015040");
  });
  it("Pegando o CEP pela URL.", () => {
    cy.visit("http://127.0.0.1:5173/?cep=57015040");
    cy.reload();
    cy.findByTestId("result-list");
  });
  it("Verificando os resultados.", () => {
    cy.visit("http://127.0.0.1:5173/?cep=57015040");
    cy.findByTestId("result-cep").contains("CEP: 57015-040");
    cy.findByTestId("result-estado").contains("Estado: AL");
    cy.findByTestId("result-cidade").contains("Cidade: Maceió");
    cy.findByTestId("result-logradouro").contains(
      "Logradouro: Rua Coronel Lucena Maranhão"
    );
  });
  it("Verificando as redes sociais", () => {
    cy.findByTestId("linkedin-maikaodev")
      .should("have.prop", "href", "https://www.linkedin.com/in/maikaodev/")
      .and("not.be.disabled");
    cy.findByTestId("github-maikaodev")
      .should("have.prop", "href", "https://github.com/maikaodev")
      .and("not.be.disabled");
  });
});
