/// <reference types="cypress" />

describe("Test filter functionality", () => {
  beforeEach(() => {
   

    // Navigate to classic collection page
    cy.visit(`/classic-collection`);

    //change language to English
    cy.getTestElement("AppLayout-link-language").click();
    cy.getTestElement("AppLayout-LanguageMenu-menuItem-en").click();
  });
  it("should search for not existing product", () => {
    cy.getTestElement("FilterPanel-div").should("exist");
    cy.getTestElement("FilterPanel-ProductsSearch-text-search").type(
      "sss{enter}"
    );
    cy.getTestElement("NoItemsFound-div").should("exist");
  });
  it("should search for an existing product by typing in search textField and then clicking {enter}", () => {
    const existingProductName = "pink dress";

    cy.getTestElement("FilterPanel-div").should("exist");
    cy.getTestElement("FilterPanel-ProductsSearch-text-search").type(
      `${existingProductName}{enter}`
    );

    ///assert the search query should contain search parameter with the correct value
    cy.location("search").should((search) => {
      const parsed = new URLSearchParams(search);
      const pairs = Array.from(parsed.entries());
      const plain = Cypress._.fromPairs(pairs);
      expect(plain, "search params").to.deep.equal({
        search: existingProductName,
      });
    });

    //assert the product is existing in the results
    cy.getTestElement("ShopByAllCategories-div")
      .should("exist")
      .find('[data-testid="ShopCategoryCard-div"]')
      .contains("pink dress");
  });

  it("should search for an existing product by typing in search textField and then waiting for result", () => {
    const existingProductName = "pink dress";

    cy.getTestElement("FilterPanel-div").should("exist");
    cy.getTestElement("FilterPanel-ProductsSearch-text-search").type(
      `${existingProductName}`
    );
    cy.clock();
    cy.tick(2000);

    ///assert the search query should contain search parameter with the correct value
    cy.location("search").should((search) => {
      const parsed = new URLSearchParams(search);
      const pairs = Array.from(parsed.entries());
      const plain = Cypress._.fromPairs(pairs);
      expect(plain, "search params").to.deep.equal({
        search: existingProductName,
      });
    });

    //assert the product is existing in the results
    cy.getTestElement("ShopByAllCategories-div")
      .should("exist")
      .find('[data-testid="ShopCategoryCard-div"]')
      .contains("pink dress");
  });
});
