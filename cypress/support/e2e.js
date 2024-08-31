// Import commands.js using ES2015 syntax:
// import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')


Cypress.on('uncaught:exception', (err, runnable) => false);
import 'cypress-mochawesome-reporter/register';