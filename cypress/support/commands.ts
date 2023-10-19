/// <reference types="cypress" />

import { baseUrl } from "../constants";

// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("signOut", () => {
  cy.intercept(
    "POST",
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup*"
  ).as("initLookup");
  cy.visit("/");
  cy.get('[data-testid="Home-div"]').should("exist");
  // signout
  cy.getAllLocalStorage().then((result) => {
    if (result[baseUrl]) {
      const res = JSON.parse(result[baseUrl]["persist:root"]);
      const currentUser = JSON.parse(res.user).currentUser;
      if (currentUser !== null) {
        cy.wait("@initLookup", 50000).then(() =>
          cy.getTestElement("AppLayout-div").then(($a) => {
            if ($a.text().includes("Sign Out")) {
              cy.get('[data-testid="AppLayout-link-signout"]').click();
              cy.wait(500);
            }
          })
        );
      }
    }
  });
});

Cypress.Commands.addQuery("getTestElement", (dataTestId) => {
  const getFn = cy.now("get", `[data-testid=${dataTestId}]`);
  return () => {
    return getFn();
  };
});
