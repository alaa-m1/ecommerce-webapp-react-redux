/// <reference types="cypress" />

describe("Test payment process", () => {
  beforeEach(() => {
    cy.visit("/");
    //change language to English
    cy.getTestElement("AppLayout-link-language").click();
    cy.getTestElement("AppLayout-LanguageMenu-menuItem-en").click();
  });
  it("should navigate to checkout page and show an alart in case not signing in ", () => {
    cy.getTestElement("Home-div").should("exist");
    cy.getTestElement("AppLayout-link-shoppingCart").click();
    cy.getTestElement("ShoppingCart-CartFooter-btn-checkout").click();
    cy.location("pathname").should("eq", "/checkout");
    cy.getTestElement("CheckoutDashboard-PaymentForm-div").should("exist");
    cy.getTestElement("CheckoutDashboard-PaymentForm-alert-info").should(
      "contain",
      "You must log in before paying for your purchases"
    );
    cy.getTestElement("CheckoutDashboard-PaymentForm-btn-payment").then(
      (element) => {
        // expect(element.attr('disabled')).to.be.true
        expect(element.text()).to.contain("Process your payment");
      }
    );
    cy.getTestElement("CheckoutDashboard-PaymentForm-btn-payment").should(
      "have.attr",
      "disabled"
    );
  });
});
