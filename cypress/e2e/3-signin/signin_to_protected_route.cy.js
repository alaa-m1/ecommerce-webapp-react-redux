/// <reference types="cypress" />

const {
  baseUrl,
  loginFakeResponse,
  lookupFakeResponse,
} = require("../../constants");

describe("Test signin to a protected route", () => {
  beforeEach(() => {
    // cy.fixture("user-credentials").as("userCredentials");
    cy.signOut();
    //change language to English
    cy.getTestElement("AppLayout-link-language").click();
    cy.getTestElement("AppLayout-LanguageMenu-menuItem-en").click();
  });

  it("should navigate to the signin page when visiting a protected route", () => {
    cy.getTestElement("Home-div").should("exist");

    //Navigate to setting page
    cy.getTestElement("AppLayout-link-settings").click();
    cy.location("pathname").should("eq", "/auth");
    cy.getTestElement("Auth-SignIn-btn-signin").should("exist");
  });
  
/**
 * To run this test, you should you need to add  cypress.env.json  file with the following values (a real user):
 * {
 * "user_email": "email_address@gmail.com",
 * "user_password": "password"
 * }
 */
  it.skip("Should navigate back to setting page after signing in", () => {
    cy.getTestElement("Home-div").should("exist");

    //Navigate to setting page
    cy.getTestElement("AppLayout-link-settings").click();
    cy.location("pathname").should("eq", "/auth");
    cy.getTestElement("Auth-SignIn-btn-signin").should("exist");

    //sign in process
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts*"
    ).as("signInWithPassword");
    // cy.get("@userCredentials").then((userCred) => {
    cy.getTestElement("Auth-SignIn-text-email").click();
    cy.getTestElement("Auth-SignIn-text-email").type(Cypress.env("user_email"));
    cy.getTestElement("Auth-SignIn-text-password").type(
      Cypress.env("user_password")
    );
    cy.getTestElement("Auth-SignIn-btn-signin").click();
    cy.wait("@signInWithPassword").then(() =>
      cy.location("pathname").should("eq", "/user-dashboard")
    );
    // });
  });
});
