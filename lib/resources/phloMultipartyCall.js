import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import { PhloMemberInterface } from './phloMember';
import * as _ from "lodash";

const clientKey = Symbol();
const action = 'phlo/';
const idField = 'nodeId';

export class PhloMultiPartyCall extends PlivoResource {
    constructor(client, id, phloId) {
        super(action, PhloMultiPartyCall, idField, client);
        this.id = id;
        this.phloId = phloId;
        // this.client = client;
        this[clientKey] = client;

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

    call(triggerSource, to, role) {
        return this.update('call', triggerSource, to, role);
    }

    warmTransfer(triggerSource, to, role) {
        return this.update('warm_transfer', triggerSource, to, role);
    }

    coldTransfer(triggerSource, to, role) {
        return this.update('cold_transfer', triggerSource, to, role);
    }

    abortTransfer(triggerSource, to) {
        return this.update('abort_transfer', triggerSource, to, null);
    }

    update(action, triggerSource, to, role) {
        //IF role not specified, keep ‘agent’
        if (role === undefined || role == null) {
            role = 'agent';
        }

        // Url pattern for mp call update
        // https://phlorunnner.plivo.com/v1/phlo/{phlo_id}/multi_party_call/{node_id}
        let task = this.phloId + '/multi_party_call/' + this.id;
        let params = {
            action: action, to: to, role: role, trigger_source: triggerSource
        };

        return super.executeAction(task, 'POST', params);

    }

}

export class PhloMultiPartyCallInterface {

    constructor(client, data = {}) {
        this.client = client;
        this.phloId = phloId;
    }

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

        let mpCall = new PhloMultiPartyCall(this.client, id, this.phloId);
        return mpCall;
    }

}
