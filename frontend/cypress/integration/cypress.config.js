module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      config.env.tsConfig = false; // Disable tsconfig if it's not needed
      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/integration/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
};
