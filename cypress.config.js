const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = {
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    },
    baseUrl: "http://localhost:8080",
  },
};
