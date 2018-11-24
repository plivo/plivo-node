
import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import * as _ from "lodash";

const clientKey = Symbol();
const action = 'Phlo/';
const idField = 'phloUuid';

/**
 * Represents a Phlo
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class Phlo extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Phlo, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * run phlo
     * @method
     * @promise {Boolean} return true if phlo is complete
     * @fail {Error} return Error
     */
    run() {
        return super.delete();
    }

    /**
     * update phlo
     * @method
     * @param {object} params - to update phlo
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    update(action, params) {
        return this.startRecording(params);
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
        return {
            id: 12,
            name: 'ravi'
        };
        // let errors = validate([{ field: 'id', value: id, validators: ['isRequired'] }]);

        // if (errors) {
        //     return errors;
        // }
        // return super.get(id);
    }

}
