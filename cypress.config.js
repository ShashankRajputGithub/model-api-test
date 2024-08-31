const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');


async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
      'file:preprocessor',
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }),
  );
  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  chromeWebSecurity: true,
  abortStrategy: 'spec',
  retries: {
    runMode: 0,
    openMode: 0,
  },

  e2e: {
    setupNodeEvents,
    specPattern: ['cypress/e2e/model_api_tests/**/*.feature'],
    baseUrl: 'http://qa-server:8000',
    chromeWebSecurity: false,

  },
});
