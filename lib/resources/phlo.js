import * as _ from "lodash";

import {
    PhloMultiPartyCall,
    PhloMultiPartyCallInterface
} from "../resources/phloMultipartyCall";
import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'phlo/';
const idField = 'phloUuid';


export class RunPHLOResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.phloId = params.phloId;
        this.message = params.message;

    }
}

export class RetrievePHLOResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.phloId = params.phloId;
        this.name = params.name;
        this.createdOn = params.createdOn;

    }
}

/**
 * Represents a Phlo
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class Phlo extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Phlo, idField, client);
        extend(this, data);
        this.client = client;

        // Define multiparty call getters
        let item = this;
        this.multiPartyCall = function(nodeId) {
            let dd = new PhloMultiPartyCall(client, {
                phloId: item.phloId,
                nodeId: nodeId
            });
            return dd;
        };

        this.multiPartyCall.get = function(nodeId) {
            let dd = new PhloMultiPartyCallInterface(client, {
                phloId: item.phloId,
                nodeId: nodeId
            });
            return dd.get(item.phloId, nodeId);
        }

        this[clientKey] = client;

    }

    /**
     * run phlo
     * @method
     * @promise {Boolean} return true if phlo is complete
     * @fail {Error} return Error
     */
    run(params) {

        //Url for phlo running
        // https://phlorunner.plivo.com/v1/account/{AUTH_ID}/phlo/{PHLO_ID} 
        let action = 'account/' + this.authId + '/phlo/' + this.phloId;
        let client = this[clientKey];
        action = action == null ? this[actionKey] : action;

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new RunPHLOResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

}

/**
 * Represents a Phlo Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhloInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, Phlo, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * Get A Phlo Detail
     * @method
     * @param {string} id - phlo uuid to get information of.
     * @promise {object} returns Phlo Object
     * @fail {Error} returns Error
     */
    get(id) {

        //Validate id first
        let errors = validate([{
            field: 'id',
            value: id,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let params = {
            phlo_id: id
        };

        // Url pattern for getting phlo resource by id
        // https://phlorunner.plivo.com/v1/phlo/{phlo_id}
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }

            client('GET', action + (id ? id + '/' : ''), params)
                .then(response => {
                    resolve(new RetrievePHLOResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}