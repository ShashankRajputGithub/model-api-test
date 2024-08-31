import {Then, Given} from '@badeball/cypress-cucumber-preprocessor';
import {deleteModel} from "./add_model";

const BASE_URL = 'http://qa-server:8000/models';
let modelId
Given(`that Model exists`, () => {
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
});
Then(`should create a new model version successfully`, () => {
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
                expect(response.body).to.have.property('name').and.to.be.a('string');
                expect(response.body.name).to.equal(add_model_version["name"]);
                expect(response.body.parent_model_id).to.equal(modelId);
                expect(response.body).to.have.property('hugging_face_model').and.to.be.a('string');
                expect(response.body.hugging_face_model).to.equal(add_model_version['hugging_face_model']);
                deleteModel(modelId)
            })
        })
    })
});
Then(`should return {string} when invalid model id is passed`, (returnCode) => {
    const BASE_URL_VERSION = `http://qa-server:8000/models/99999/versions`;
    let statusCodeInt = parseInt(returnCode);
    cy.fixture('add_model_version.json').then(add_model_version => {
        cy.request({
            method: 'POST',
            url: BASE_URL_VERSION,
            body: add_model_version,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(statusCodeInt);
            expect(response.body).to.have.property('detail').and.to.equal('Model not found');
        })
    })
})



