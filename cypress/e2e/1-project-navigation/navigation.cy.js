/// <reference types="Cypress" />

describe("Test navigation logic", () => {
  beforeEach(() => {
    cy.visit("/");
    //Change the language to English
    cy.getTestElement("AppLayout-link-language").click();
    cy.getTestElement("AppLayout-LanguageMenu-menuItem-en").click();
  });
  it("Should navigate to all pages and then return back to the home page", () => {
    cy.getTestElement("Home-div").should("exist");
    // Navigate to classic collection page
    cy.getTestElement("AppLayout-link-classic_collection").click();
    cy.location("pathname").should("eq", "/classic-collection");
    cy.getTestElement("ShopByAllCategories-div").should("exist");
    // Navigate to modern collection page
    cy.getTestElement("AppLayout-link-modern_collection").click();
    cy.location("pathname").should("eq", "/modern-collection");
    cy.getTestElement("ShopByAllCategories-div").should("exist");
    // Navigate to login page
    cy.getTestElement("AppLayout-link-signin").click();
    cy.location("pathname").should("eq", "/auth");
    cy.getTestElement("Auth-SignIn-btn-signin").should("exist");
    // Navigate to invalid url
    cy.visit(`/invalidurl`);
    cy.location("pathname").should("eq", "/404");
    cy.getTestElement("NotFound-div").should("exist");
    // Navigate to Home page
    cy.getTestElement("AppLayout-link-home").click();
    cy.location("pathname").should("eq", "/");
    cy.getTestElement("Home-div").should("exist");
  });
});
