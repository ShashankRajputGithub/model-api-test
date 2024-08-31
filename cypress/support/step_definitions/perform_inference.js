import {Then} from "@badeball/cypress-cucumber-preprocessor";
import {cleanup, deleteModel} from "./add_model";

Then(`should return a valid response while performing inference`, () => {
    cy.get('@modelId').then((modelId) => {
        cy.get('@versionId').then((versionId) => {
            cy.fixture('perform_inference.json').then(perform_inference => {
                const BASE_URL = `http://qa-server:8000/models/${modelId}/versions/${versionId}/infer`;
                cy.request({
                    method: 'POST',
                    url: BASE_URL,
                    body: perform_inference,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    //TO-DO
                    // should be 200 but changing this to make test pass
                    //https://github.com/cypress-io/cypress/issues/518
                    expect(response.status).to.equal(200);
                    //print failure logs
                })
            })
        })
    });
});


Then(`should return {string} on passing invalid version`, (returnCode) => {
    let statusCodeInt = parseInt(returnCode);
    cy.get('@modelId').then((modelId) => {
        cy.fixture('perform_inference.json').then(perform_inference => {
            const BASE_URL = `http://qa-server:8000/models/${modelId}/versions/9999/infer`;
            cy.request({
                method: 'POST',
                url: BASE_URL,
                body: perform_inference,
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(statusCodeInt);
                expect(response.body).to.have.property('detail').and.to.equal('Model version not found');
            })
        })
    });
});

Then(`should return {string} on passing invalid model`, (returnCode) => {
    let statusCodeInt = parseInt(returnCode);
    cy.get('@modelId').then((modelId) => {
        cy.get('@versionId').then((versionId) => {
            cy.fixture('perform_inference.json').then(perform_inference => {
                const BASE_URL = `http://qa-server:8000/models/9999/versions/${versionId}/infer`;
                cy.request({
                    method: 'POST',
                    url: BASE_URL,
                    body: perform_inference,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.equal(statusCodeInt);
                    expect(response.body.detail).to.contain('If this is a private repository, make sure to pass a token');
                })
            })
        });
    });
});

after(() => {
    cy.get('@modelId').then((modelId) => {
        cleanup(modelId)// Clean up after each test
    });
});