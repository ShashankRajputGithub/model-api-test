import {Then} from '@badeball/cypress-cucumber-preprocessor';

const BASE_URL = 'http://qa-server:8000/models';

let modelId

export function deleteModel(modelId) {
    cy.request({
        method: 'DELETE',
        url: `${BASE_URL}/${modelId}`,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false  // Prevent Cypress from failing on 4xx/5xx status codes
    }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.null
    })
}

Then(`should create a new model successfully`, () => {
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
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq(name);
            expect(response.body.owner).to.eq(owner);
            modelId = response.body.id;
            cy.wrap(modelId).as('modelId');
            deleteModel(modelId)
        })
    })
});

function validateNameMissing(response, statusCodeInt, owner) {
    expect(response.status).to.equal(statusCodeInt);
    expect(response.body).to.have.property('detail')
    expect(response.body.detail[0].type).to.eq('missing');
    expect(response.body.detail[0].loc).to.deep.equal(['body', 'name']);
    expect(response.body.detail[0].msg).to.eq('Field required');
    expect(response.body.detail[0].input).to.have.property('owner').that.equals(owner);

}

Then(`should return {string} when name is {string}`, (returnCode, dataSet) => {
    cy.fixture('add_model_data.json').then(add_model_data => {
        const {owner} = add_model_data[dataSet];
        let statusCodeInt = parseInt(returnCode);
        cy.request({
            method: 'POST',
            url: BASE_URL,
            body: add_model_data[dataSet],
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            validateNameMissing(response, statusCodeInt, owner);
        })
    })
});

Then(`should return {string} when name passed as {string}`, (returnCode, dataSet) => {
    cy.fixture('add_model_data.json').then(add_model_data => {
        const {owner} = add_model_data[dataSet];
        let statusCodeInt = parseInt(returnCode);
        cy.request({
            method: 'POST',
            url: BASE_URL,
            body: add_model_data[dataSet],
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(statusCodeInt);
            expect(response.body.detail[0].type).to.eq('string_type');
            expect(response.body.detail[0].loc).to.deep.equal(['body', 'name']);
            expect(response.body.detail[0].msg).to.eq('Input should be a valid string');
            //deleteModel(modelId)
        })
    })
});

export function cleanup(modelId) {
    cy.request({
        method: 'DELETE',
        url: `${BASE_URL}/${modelId}`,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false  // Prevent Cypress from failing on 4xx/5xx status codes
    }).then((response) => {
        //expect(response.status).to.equal(200);
        //expect(response.body).to.be.null
    })
}
