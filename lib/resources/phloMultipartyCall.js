import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import { PhloMemberInterface } from './phloMember';
import * as _ from "lodash";

const clientKey = Symbol();
const idField = 'nodeId';

export class PhloMultiPartyCall extends PlivoResource {
    constructor(client, data = {}) {
        let action = 'phlo/' + data.phloId + '/multi_party_call/';
        super(action, PhloMultiPartyCall, idField, client);
        extend(this, data);
        this.action = action;

        this.client = client;

        // Define member getters
        let memberGetter = function (memberAddress) {
            let dd = new PhloMemberInterface(client);
            return dd.get(memberAddress);
        };
        this.multiPartyCall = memberGetter;
        this.multiPartyCall.get = function (memberAddress) {
            return memberGetter(memberAddress);
        }

    }

    async call(triggerSource, to, role) {
        return this.update('call', triggerSource, to, role);
    }

    async warmTransfer(triggerSource, to, role) {
        return this.update('warm_transfer', triggerSource, to, role);
    }

    async coldTransfer(triggerSource, to, role) {
        return this.update('cold_transfer', triggerSource, to, role);
    }

    async abortTransfer(triggerSource, to) {
        return this.update('abort_transfer', triggerSource, to, null);
    }

    async update(action, triggerSource, to, role) {
        // If role not specified, keep ‘agent’
        if (role === undefined || role == null) {
            role = 'agent';
        }

        // Url pattern for mp call update
        // https://phlorunnner.plivo.com/v1/phlo/{phlo_id}/{node_type}/{node_id} 
        let task = this.action + this.nodeId;
        if (action == 'abort_transfer') {
            task += '/members/' + to;
        }
        let params = {
            action: action, to: to, role: role, trigger_source: triggerSource
        };

        return await super.executeAction(task, 'POST', params, '');

    }

}

export class PhloMultiPartyCallInterface extends PlivoResourceInterface {


    constructor(client, data = {}) {
        let action = 'phlo/' + data.phloId + '/multi_party_call/';
        super(action, PhloMultiPartyCall, idField, client);
        extend(this, data);
    }

    /**
   * Get A Phlo Detail
   * @method
   * @param {string} id - phlo uuid to get information of.
   * @promise {object} returns Phlo Object
   * @fail {Error} returns Error
   */
    async get(phloId, id) {

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
            phlo_id: phloId,
            node_type: 'multi_party_call',
            node_id: id
        };

        return new Promise(async (resolve, reject) => {

            try {
                // Url pattern for getting phlo resource by id
                // https://phlorunner.plivo.com/v1/phlo/{phlo_id}
                console.log('get multi party call with ', id, params);
                let multiPartyCall = await super.get(id, params);
                resolve(multiPartyCall);
            } catch (err) {
                reject(err);
            }
        });

    }
}
