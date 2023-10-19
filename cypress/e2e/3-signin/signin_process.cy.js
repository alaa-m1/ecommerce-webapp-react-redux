/// <reference types="cypress" />

const {
  baseUrl,
  loginFakeResponse,
  lookupFakeResponse,
} = require("../../constants");

describe("Test signin process", () => {
  beforeEach(() => {
    // cy.fixture("user-credentials").as("userCredentials");
    cy.signOut();
    //change language to English
    cy.getTestElement("AppLayout-link-language").click();
    cy.getTestElement("AppLayout-LanguageMenu-menuItem-en").click();
  });

  it("should navigate to the signup page and then go back to the home page", () => {
    cy.getTestElement("Home-div").should("exist");

    //Navigate to signin page
    cy.getTestElement("AppLayout-link-signin").click();
    cy.location("pathname").should("eq", "/auth");
    cy.getTestElement("Auth-SignIn-btn-signin").should("exist");
    cy.getTestElement("Auth-btn-signup").click();
    cy.location("href").should("eq", `${baseUrl}/auth?p=signup`);
    cy.getTestElement("Auth-SignUp-btn-signup").should("exist");
    cy.go("back");
    cy.go("back");
    cy.getTestElement("Home-div").should("exist");
  });

  it("Should verify signing in with invalid credentials", () => {
    cy.getTestElement("Home-div").should("exist");

    //Navigate to signin page
    cy.getTestElement("AppLayout-link-signin").click();

    //verify using invalid email
    cy.getTestElement("Auth-SignIn-text-email").click();
    cy.getTestElement("Auth-SignIn-text-email").type("wrongemail@google");
    cy.getTestElement("Auth-SignIn-btn-signin").as("loginBtn").click();
    cy.getTestElement("Auth-SignIn-text-email")
      .parent()
      .should("have.attr", "class")
      .and("contain", "error-border");
    // .should((element) => {
    //   expect(element.attr("class")).to.contain("error-border");
    // });
    cy.getTestElement("TextField-label-error").should(
      "contain",
      "You must enter a valid Email"
    );
    //verify using empty email field
    cy.getTestElement("Auth-SignIn-text-email").clear();
    cy.get("@loginBtn").click();
    cy.getTestElement("TextField-label-error").should(
      "contain",
      "You must enter a valid Email"
    );
  });
  it("Should verify signing in with wrong empty password field", () => {
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts*"
    ).as("signInWithPassword");

    cy.getTestElement("Home-div").should("exist");

    //Navigate to signin page
    cy.getTestElement("AppLayout-link-signin").click();
    cy.getTestElement("Auth-SignIn-text-email").click();
    cy.getTestElement("Auth-SignIn-text-email").type("wrongemail@google.com");
    cy.getTestElement("Auth-SignIn-btn-signin").click();
    cy.wait("@signInWithPassword").then(() =>
      cy.get(".Toastify__toast-body").should("contain", "auth/missing-password")
    );
  });

  it("Should verify signing in with wrong credentials", () => {
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts*"
    ).as("signInWithPassword");

    cy.getTestElement("Home-div").should("exist");

    //Navigate to signin page
    cy.getTestElement("AppLayout-link-signin").click();

    cy.getTestElement("Auth-SignIn-text-email").type("wrongemail@google.com");
    cy.getTestElement("Auth-SignIn-text-password").type("55555");
    cy.getTestElement("Auth-SignIn-btn-signin").click();
    cy.wait("@signInWithPassword").then(() =>
      cy.get(".Toastify__toast-body").should("contain", "auth/user-not-found")
    );
  });

  /**
 * To run this test, you should you need to add  cypress.env.json  file with the following values (a real user):
 * {
 * "user_email": "email_address@gmail.com",
 * "user_password": "password"
 * }
 */
  it.skip("Should verify signing in with valid credentials", () => {
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts*"
    ).as("signInWithPassword");

    cy.getTestElement("Home-div").should("exist");

    cy.getTestElement("Home-div").should("exist");

    //Navigate to signin page
    cy.getTestElement("AppLayout-link-signin").click();
    // cy.get("@userCredentials").then((userCred) => {
    cy.getTestElement("Auth-SignIn-text-email").click();
    cy.getTestElement("Auth-SignIn-text-email").type(Cypress.env("user_email"));
    cy.getTestElement("Auth-SignIn-text-password").type(
      Cypress.env("user_password")
    );
    cy.getTestElement("Auth-SignIn-btn-signin").click();
    cy.wait("@signInWithPassword").then(() =>
      cy.getTestElement("AppLayout-link-signout").should("exist")
    );
    // });
  });

  it("Should verify signing in with valid credentials (stubbing the response)", () => {
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword*",
      {
        ...loginFakeResponse,
      }
    ).as("signInWithPassword");
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup*",
      {
        ...lookupFakeResponse,
      }
    ).as("lookup");

    cy.getTestElement("Home-div").should("exist");

    cy.getTestElement("Home-div").should("exist");

    //Navigate to signin page
    cy.getTestElement("AppLayout-link-signin").click();
    // cy.get("@userCredentials").then((userCred) => {
      cy.getTestElement("Auth-SignIn-text-email").click();
      cy.getTestElement("Auth-SignIn-text-email").type("anyemail@gmail.ccom");
      cy.getTestElement("Auth-SignIn-text-password").type("12345");
      cy.getTestElement("Auth-SignIn-btn-signin").click();
      cy.wait("@lookup").then(() =>
        cy.getTestElement("AppLayout-link-signout").should("exist")
      );
    // });
  });
});
