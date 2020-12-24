import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

export class CallFeedbackResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        this.status = params.status;

    }
}

const clientKey = Symbol();
const action = 'Call/';
const idField = 'callUuid';
const CALLINSIGHTS_BASE_URL = 'https://stats.plivo.com/'

export class CallFeedback extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Call, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
        this[clientKey] = client;
    }
}

/**
 * Represents a CallFeedback Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CallFeedbackInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, CallFeedback, idField, client);
        extend(this, data);

        this[clientKey] = client;
    }

    create(callUUID, rating, issues = [], notes = "") {
        let errors = validate([{
                field: 'callUUId',
                value: callUUID,
                validators: ['isRequired']
            },
            {
                field: 'rating',
                value: rating,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }

        var params = {};
        params.rating = rating;
        if (issues.length > 0) {
            params.issues = issues;
        }
        if (notes.length > 0) {
            params.notes = notes;
        }
        params.isCallInsightsRequest = "";
        params.CallInsightsBaseUrl = CALLINSIGHTS_BASE_URL;
        params.CallInsightsRequestPath = `v1/Call/${callUUID}/Feedback/`;

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CallFeedbackResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}