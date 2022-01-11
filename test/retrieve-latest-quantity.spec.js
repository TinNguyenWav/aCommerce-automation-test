// 1.1 Create Test Script to testing this API Endpoint at least 10 test cases.
import request from "../config/common";
import { expect } from "chai";
require('dotenv').config()


let partnerId,
    channelId;

// Init list of token for testing. The token data is stored in .emv file
const X_SUBJECT_TOKEN = {
    VALID: process.env.X_SUBJECT_TOKEN,
    INVALID: process.env.X_SUBJECT_TOKEN_INVALID,
    EXPIRED: process.env.X_SUBJECT_TOKEN_EXPIRED,
    NO_PERMISSIOM: process.env.X_SUBJECT_TOKEN_NO_PERMISSION,
}

// init the endpoint for retrieve quantity API
async function retrieveQuantityEndpointGenerate(channelId, partnerId) {
    let endpoint = `channel/${channelId}/allocation/merchant/${partnerId}`;
    return endpoint;
}

describe("Retrieve the latest quantity that aCommerce allocated stock to the Marketplace", () => {
    before(function () {
        //This step should be considered as a precondiotion and set up data
        // Init list of Chennel ID. 
        channelId = {
            validId: '<<ID of a valid chanel>>',
            doesNotExist: '<< There is no channel Id match with this ID in current system>>',
            isNull: null,
            hasNoPartner: '<< This chanel ID is existed but has no partner>>'
        };

        // Init list of Partner ID. 
        partnerId = {
            validIdOver100Quantities: '<<ID of a valid partner has more than 100 quantities allocated stock to the Marketplace>>',
            validIdLessThan100Quantities: '<<ID of a valid partner has 50 quantities allocated stock to the Marketplace>>',
            doesNotExist: '<<There is no partner match with this ID in current system>>',
            isNull: null,
            hasNoProduct: '<<this partbner ID is existed has no product>>'
        }
    });


    it('should return response code 200 when calling api successfully with all valid parameters', async () => {

        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdOver100Quantities);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(200);
    })

    it('should return an array contains list of the latest quantity that aCommerce allocated stock to the Marketplace when calling API with valid method, channel_id, partner_id and token_id', async () => {

        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdOver100Quantities);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.body.data).to.not.be.empty;
    })

    it('It should return correct items when calling API without query param', async () => {
        const expectedAllocatedItems = 50;
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdLessThan100Quantities);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.body.data).to.have.lengthOf(expectedAllocatedItems)

    })

    it('should returns list of the latest quantity match with filter when calling API with query params', async () => {

        const expectedAllocatedItems = 100;
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdOver100Quantities);

        // Action - Call requrest
        const response = await request
            .get(`${endpoint}?page=1&page_size=100`)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.body.data).to.have.lengthOf(expectedAllocatedItems)
    })

    it('It should return error code <<expected error code>> when calling API with channel_id does not exist is system but valid partner_id and token_id', async () => {

        // In this case I assume the resource not found will lead to return error code 404. this should strictly follow definition on the API requirement
        const expectedErrorCode = '<<expected error code>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.doesNotExist, partnerId.validIdOver100Quantities);

        // Action - Call requrest
        const response = await request
            .get(`${endpoint}?page=1&page_size=100`)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
    })

    it('It should return error code <<expectedErrorCode>> when calling API with channel_id is null but valid partner_id and token_id', async () => {

        // In this case I assume the resource not found will lead to return error code 404. this should strictly follow definition on the API requirement
        const expectedErrorCode = '<<expected error code>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.isNull, partnerId.validIdOver100Quantities);

        // Action - Call requrest
        const response = await request
            .get(`${endpoint}?page=1&page_size=100`)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
    })

    it('should return error code <<expectedErrorCode>> when calling API with partner_id does not exist is system but valid chanel_id and token_id', async () => {

        // In this case I assume the resource not found will lead to return error code 404. this should strictly follow definition on the API requirement
        const expectedErrorCode = '<< expected error code>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.doesNotExist);

        // Action - Call requrest
        const response = await request
            .get(`${endpoint}?page=1&page_size=100`)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
    })

    it('should return error code <<expectedErrorCode>> when calling API with partner_id is null but valid chanel_id and token_id', async () => {

        // In this case I assume the resource not found will lead to return error code 404. this should strictly follow definition on the API requirement
        const expectedErrorCode = '<<expected error code>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.isNull);

        // Action - Call requrest
        const response = await request
            .get(`${endpoint}?page=1&page_size=100`)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
    })

    it('should return an empty array when calling API with valid method, channel_id and token_id but partner has no quantity', async () => {
        const expectedAllocatedItems = 0;
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.hasNoProduct);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.VALID}`)

        // Assertion - validate returned result
        expect(response.body.data).to.have.lengthOf(expectedAllocatedItems)
    })

    it('should return error code <<expectedErrorCode>> and <<expectedMessage>> when calling API with invalid token_id but valid chanel_id and partner_id', async () => {

        // In this case I assume the resource not found will lead to return error code 401: Authentication failed. this should strictly follow definition on the API requirement
        const expectedErrorCode = '<<expected error code>>';
        const expectedMessage = '<<expected error Message>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdLessThan100Quantities);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.INVALID}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
        expect(response.body.data.message).to.equal(expectedMessage);
    })

    it('should return error code <<expectedErrorCode>> and <<expectedMessage>> when calling API with expired token_id but valid chanel_id and partner_id', async () => {

        // In this case I assume the resource not found will lead to return error code 401: Authentication failed. this should strictly follow definition on the API requirement
        const expectedErrorCode = '<<expected error code>>';
        const expectedMessage = '<<expected error Message>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdLessThan100Quantities);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.EXPIRED}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
        expect(response.body.data.message).to.equal(expectedMessage);
    })

    it('should return error code <<expectedErrorCode>> and <<expectedMessage>> when calling API with token_id has no permission to access the specified API endpoint but valid chanel_id and partner_id', async () => {

        // In this case I assume the resource not found will lead to return error code "403: The authenticated user is not allowed to access the specified API endpoint". this should strictly follow definition on the API requirement
        const expectedErrorCode = '<<expected error code>>';
        const expectedMessage = '<<expected error Message>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdLessThan100Quantities);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN.NO_PERMISSIOM}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
        expect(response.body.data.message).to.equal(expectedMessage);
    })

    it('should return error code <<expectedErrorCode>> and <<expectedMessage>> when calling API with Method not allowed but valid chanel_id, partner_id and  token_id', async () => {

        // In this case I assume the resource not found will lead to return error code "403: The authenticated user is not allowed to access the specified API endpoint". this should strictly follow definition on the API requirement
        const expectedErrorCode = '<<expected error code>>';
        const expectedMessage = '<<expected error Message>>';
        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdLessThan100Quantities);

        // Action - Call requrest
        const response = await request
            .post(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN}`)

        // Assertion - validate returned result
        expect(response.statusCode).to.equal(expectedErrorCode);
        expect(response.body.data.message).to.equal(expectedMessage);
    })

    it('should return array include the existing object of current partner ', async () => {
        // And object that should include in the return array
        const existingObjectOfSelectePartner = {
            "qty": "0",
            "sku": "SKU0001",
            "updatedTime": "2021-08-05T10:20:12.053457Z"
        }

        // init endpoint
        const endpoint = await retrieveQuantityEndpointGenerate(channelId.validId, partnerId.validIdLessThan100Quantities);

        // Action - Call requrest
        const response = await request
            .get(endpoint)
            .set('Authorization', `Bearer ${X_SUBJECT_TOKEN}`)

        // Assertion - validate returned result
        expect(response.body.data.message).to.deep.include(existingObjectOfSelectePartner);
    })
});
