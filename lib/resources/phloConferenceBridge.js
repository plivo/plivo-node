import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import { PhloMember } from './phloMember';

const clientKey = Symbol();
const idField = 'nodeId';

export class PhloConferenceBridge extends PlivoResource {
    constructor(client, data = {}) {
        let action = 'phlo/' + data.phloId + '/conference_bridge/';
        super(action, PhloConferenceBridge, idField, client);
        extend(this, data);
        this.action = action;
        this.client = client;

        // Define member getters
        let item = this;
        this.member = function (memberAddress) {
            let dd = new PhloMember(client, { phloId: item.phloId, nodeId: item.nodeId, memberAddress: memberAddress });
            return dd;
        };

        this.member.get = async function (memberAddress) {
            let dd = new PhloConferenceBridgeInterface(client, { phloId: item.phloId, nodeId: item.nodeId, memberAddress: memberAddress });
            return dd.get(item.phloId, item.nodeId, memberAddress);
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

    async abortTransfer(memberAddress) {
        return this.update('abort_transfer', null, memberAddress, null);
    }

    async update(action, triggerSource, to, role) {
        // If role not specified, keep ‘agent’
        if (role === undefined || role == null) {
            role = 'agent';
        }

        let params = {
            action: action
        };


        // Url pattern for mp call update
        // https://phlorunnner.plivo.com/v1/phlo/{phlo_id}/{node_type}/{node_id} 
        let task = this.action + this.nodeId;
        if (action == 'abort_transfer') {
            task += '/members/' + to;
        } else {
            params.to = to;
            params.role = role;
            params.trigger_source = triggerSource;
        }

        return super.executeAction(task, 'POST', params, '');

    }

}

export class PhloConferenceBridgeInterface extends PlivoResourceInterface {


    constructor(client, data = {}) {
        let action = 'phlo/' + data.phloId + '/conference_bridge/';
        super(action, PhloConferenceBridge, idField, client);
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
            node_type: 'conference_bridge',
            node_id: id
        };

        return new Promise(async (resolve, reject) => {

            try {
                // Url pattern for getting phlo resource by id
                // https://phlorunner.plivo.com/v1/phlo/{phlo_id}
                console.log('get conference brige with ', id, params);
                let conferenceBridge = await super.get(id, params);
                resolve(conferenceBridge);
            } catch (err) {
                reject(err);
            }
        });

    }
}
