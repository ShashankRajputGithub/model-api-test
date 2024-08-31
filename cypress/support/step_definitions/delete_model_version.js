import {Given, Then} from "@badeball/cypress-cucumber-preprocessor";
import {deleteModel} from "./add_model";

const BASE_URL = 'http://qa-server:8000/models';

let modelId
let versionId
Given(`that Model with Version exists`, () => {
    cy.fixture('add_model_data.json').then(add_model_data => {
        const {name} = add_model_data["valid_data"];
        const {owner} = add_model_data["valid_data"];
        cy.request({
            method: 'POST',
            url: BASE_URL,
            body: add_model_data["valid_data"],
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            modelId = response.body.id;
            cy.wrap(modelId).as('modelId');
        })
    })

    cy.get('@modelId').then((id) => {
        const BASE_URL_VERSION = `http://qa-server:8000/models/${modelId}/versions`;
        cy.fixture('add_model_version.json').then(add_model_version => {
            cy.request({
                method: 'POST',
                url: BASE_URL_VERSION,
                body: add_model_version,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                versionId = response.body.id;
                cy.wrap(versionId).as('versionId');
            });
        })
    })
})

Then(`should delete a model version successfully`, () => {
    cy.get('@modelId').then((modelId) => {
        cy.get('@versionId').then((versionId) => {
            const DELETE_VERSION_URL = `http://qa-server:8000/models/${modelId}/versions/${versionId}`;
            cy.request({
                method: 'DELETE',
                url: `${DELETE_VERSION_URL}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false  // Prevent Cypress from failing on 4xx/5xx status codes
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.null
                deleteModel(modelId)
            })
        })
    });
});

Then(`should return {string} when invalid model version id is passed`, (returnCode) => {
    let statusCodeInt = parseInt(returnCode);
    cy.get('@modelId').then((modelId) => {
        const DELETE_VERSION_URL = `http://qa-server:8000/models/${modelId}/versions/9999`;
        cy.request({
            method: 'DELETE',
            url: `${DELETE_VERSION_URL}`,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false  // Prevent Cypress from failing on 4xx/5xx status codes
        }).then((response) => {
            expect(response.status).to.equal(statusCodeInt);
            expect(response.body).to.have.property('detail').and.to.equal('Model version not found');
        })
    })
});


