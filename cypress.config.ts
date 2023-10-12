import { defineConfig } from "cypress";
import { baseUrl } from "./cypress/constants";

export default defineConfig({
  e2e: {
    baseUrl: baseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
