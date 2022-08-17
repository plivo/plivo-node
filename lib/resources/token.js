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
 * @param {function} client - make api Token
 * @param {object} [data] - data of Token
 */
 export class TokenInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, TokenInterface, client);
        extend(this, data);

        this[clientKey] = client;
    }
    /**
     * Create a token
     * @method
     * @param {string} iss - Auth id of the user
     * @param {object} optionalParams - Optional Params to send message
     * @param {string} [optionalParams.sub] - subject of the token
     * @param {string} [optionalParams.exp] - expiration time of the token
     * @param {string} [optionalParams.nbf] - not before time of the token
     * @param {boolean} [optionalParams.incoming_allow] - incoming allow of the token
     * @param {boolean} [optionalParams.outgoing_allow] - outgoing allow of the token
     * @param {string} [optionalParams.app] - app id of the token
     * @param {json} [optionalParams.per] - permissions of the token
     * @promise {object} return {@link PlivoGenericMessage} object if success
     * @fail {Error} returns Error
     */
    create(iss, optionalParams = {}) {

      let errors = validate([{
                field: 'iss',
                value: iss,
                validators: ['isRequired']
            },
        ]);
        if (errors) {
          return errors;
        }

      let params = {};
        params.per = {};
        params.per.voice = {};
        if(optionalParams.sub) {
            params.sub = optionalParams.sub;
        }
        if(optionalParams.exp) {
            params.exp = optionalParams.exp;
        }
        if(optionalParams.nbf) {
            params.nbf = optionalParams.nbf;
        }
        if(optionalParams.incoming_allow) {
          params.per.voice.incoming_allow = optionalParams.incoming_allow;
        }
        if(optionalParams.outgoing_allow) {
          params.per.voice.outgoing_allow = optionalParams.outgoing_allow;
        }
        if(optionalParams.app) {
            params.app = optionalParams.app;
        }
        params.iss = iss;

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateTokenResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
 }



