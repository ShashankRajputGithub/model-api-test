import {Then} from '@badeball/cypress-cucumber-preprocessor';
import {deleteModel} from "./add_model";

const BASE_URL = 'http://qa-server:8000/models';

Then(`should return a successful response`, () => {
    cy.request(BASE_URL)
        .should((response) => {
            expect(response.status).to.equal(200);
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.headers['server']).to.include('uvicorn');
            expect(response.body.length).to.be.greaterThan(0);
            expect(response.body).to.be.an('array');
        })
})

Then(`should have the correct model structure`, () => {
    cy.request(BASE_URL)
        .should((response) => {
            const model = response.body[0];
            expect(model).to.have.property('id').that.is.a('string');
            expect(model).to.have.property('name').that.is.a('string');
            expect(model).to.have.property('owner').that.is.a('string');
        })
});

Then(`should return 405 for a non-existent model`, () => {
    cy.request({
        url: `${BASE_URL}/9999`,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.equal(405);
        expect(response.body).to.have.property('detail').equals('Method Not Allowed');
    })
});

Then(`should return the correct model data`, () => {
    cy.get('@modelId').then((modelId) => {
        cy.fixture('get_model_data').then(get_model_data => {
            cy.request(`${BASE_URL}`)
                .should((response) => {
                    expect(response.body[0]).to.have.property('name').equals(get_model_data.name);
                    expect(response.body[0]).to.have.property('owner').equals(get_model_data.owner);
                })
            deleteModel(modelId)
        })
    });
})