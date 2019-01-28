import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import { PhloMultiPartyCallMemberInterface, PhloMultiPartyCallMember } from './phloMultiPartyCallMember';

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
        let item = this;
        this.member = function (memberAddress) {
            let dd = new PhloMultiPartyCallMember(client, { phloId: item.phloId, nodeId: item.nodeId, memberAddress: memberAddress });
            return dd;
        };

        this.member.get = function (memberAddress) {
            let dd = new PhloMultiPartyCallMemberInterface(client, { phloId: item.phloId, nodeId: item.nodeId, memberAddress: memberAddress });
            return dd.get(item.phloId, item.nodeId, memberAddress);
        }

    }

    call(triggerSource, to, role) {
        return this.update('call', triggerSource, to, role);
    }

    warmTransfer(triggerSource, to, role) {
        return this.update('warm_transfer', triggerSource, to, role);
    }

    coldTransfer(triggerSource, to, role) {
        return this.update('cold_transfer', triggerSource, to, role);
    }

    abortTransfer(memberAddress) {
        return this.update('abort_transfer', null, memberAddress, null);
    }

    update(action, triggerSource, to, role) {
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
    get(phloId, id) {

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


        // Url pattern for getting phlo resource by id
        // https://phlorunner.plivo.com/v1/phlo/{phlo_id}
        // console.log('get multi party call with ', id, params);
        return super.get(id, params);

    }
}
