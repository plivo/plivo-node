import * as _ from "lodash";

import {
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';


const clientKey = Symbol();
const action = 'JWT/Token/';


export class CreateTokenResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.token = params.token;
    }
}


/**
 * Represents a Token Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of Token
 */
 export class TokenInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, TokenInterface, idField, client);
        extend(this, data);

        this[clientKey] = client;
    }
    /**
     * Create a token
     * @method
     * @param {string} iss - Auth id of the user
     * @param {string} sub - Subject
     * @param {number} nbf - Start time of the token
     * @param {number} exp - Expiration time of the token
     * @param {boolean} incoming_allowed - Incoming allowed
     * @param {boolean} outgoing_allowed - Outgoing allowed
     * @param {string} app - App id
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    create(iss,sub,nbf,exp,incoming_allowed,outgoing_allowed,app, params = {}) {
        let errors = validate([{
                field: 'iss',
                value: iss,
                validators: ['isRequired']
            }
        ]);
        if(incoming_allowed == true && sub == null){
            errors.push({
                field: 'sub',
                value: sub,
                validators: ['isRequired']
            });
        }


        if (errors) {
            return errors;
        }

        params.iss = iss;
        params.sub = sub;
        params.nbf = nbf;
        params.exp = exp;
        params.incoming_allowed = incoming_allowed;
        params.outgoing_allowed = outgoing_allowed;
        params.app = app;
        params.isVoiceRequest = 'true';

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateTokenResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
 }



