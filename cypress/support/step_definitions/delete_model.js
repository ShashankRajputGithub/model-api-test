import {Then} from "@badeball/cypress-cucumber-preprocessor";
import {deleteModel} from "./add_model";

const BASE_URL = 'http://qa-server:8000/models';
Then(`should delete a new model successfully`, () => {
    cy.get('@modelId').then((id) => {
        deleteModel(id)
    });
})
Then(`should return {string} when invalid model id is passed while deleting a model`, (returnCode) => {
    let statusCodeInt = parseInt(returnCode);
    cy.request({
        method: 'DELETE',
        url: `${BASE_URL}/9999`,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false  // Prevent Cypress from failing on 4xx/5xx status codes
    }).then((response) => {
        expect(response.status).to.equal(statusCodeInt);
        expect(response.body).to.have.property('detail').and.to.equal('Model not found');
    })
})
