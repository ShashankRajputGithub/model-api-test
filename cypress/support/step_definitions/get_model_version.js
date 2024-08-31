import {Then} from "@badeball/cypress-cucumber-preprocessor";
import {deleteModel} from "./add_model";

Then(`should return a version with parent details successfully`, () => {
    cy.get('@modelId').then((modelId) => {
        cy.fixture('add_model_version.json').then(add_model_version => {
            const GET_VERSION_URL = `http://qa-server:8000/models/${modelId}/versions/`;
            cy.request(GET_VERSION_URL).then((response) => {
                const firstItem = response.body[0];
                expect(response.body).to.be.an('array');
                expect(response.status).to.equal(200);
                expect(firstItem).to.have.property('id').and.to.be.a('string');
                expect(firstItem).to.have.property('name').and.to.be.a('string');
                expect(firstItem.name).to.equal(add_model_version["name"]);
                expect(firstItem).to.have.property('parent_model_id').and.to.be.a('string');
                expect(firstItem).to.have.property('hugging_face_model').and.to.be.a('string');
                expect(firstItem.hugging_face_model).to.equal(add_model_version['hugging_face_model']);
                deleteModel(modelId);
            })
        })
    });
});

Then(`should return {string} when invalid model id is passed get call`, (returnCode) => {
    let statusCodeInt = parseInt(returnCode);
    cy.fixture('add_model_version.json').then(add_model_version => {
        const GET_VERSION_URL = `http://qa-server:8000/models/9999/versions/`;
        cy.request({
            url: GET_VERSION_URL,
            failOnStatusCode: false
        }).then((response) => {
            const firstItem = response.body[0];
            expect(response.status).to.equal(statusCodeInt);
            expect(response.body).to.have.property('detail').and.to.equal('Model not found');
        })
    })
});
