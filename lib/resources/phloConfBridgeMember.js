import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';

const clientKey = Symbol();
const action = 'Phlo/';
const idField = 'phloUuid';

/**
 * Represents a Phlo Conference Bridge Call Member
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class PhloConfBridgeMember extends PlivoResource {

    constructor(client, data = {}) {
        let action = 'phlo/' + data.phloId + '/conference_bridge/' + data.nodeId + '/members/';
        super(action, PhloConfBridgeMember, idField, client);
        extend(this, data);
        this.action = action;
        this.client = client;
    }

     mute() {
        return this.update('mute');
    }

     unmute() {
        return this.update('unmute');
    }

     leave() {
        return this.update('leave');
    }

     update(action) {

        let params = {
            action: action
        };

        // Build Url
        // https://phlorunner.plivo.com/v1/phlo/{PHLO_ID}/multi_party_call/{NODE_ID}/members/{MemberAddress}
        let task = this.action + this.memberAddress;

        return super.executeAction(task, 'POST', params, '');
    }
}

export class PhloConfBridgeMemberInterface extends PlivoResourceInterface {


    constructor(client, data = {}) {
        let action = 'phlo/' + data.phloId + '/conference_bridge/' + data.nodeId + '/members/';
        super(action, PhloConfBridgeMember, idField, client);
        extend(this, data);
        this.action = action;
        this.client = client;
    }

    get(phloId, nodeId, memberAddress) {

        //Validate id first
        let errors = validate([{
            field: 'id',
            value: memberAddress,
            validators: ['isRequired']
        }]);
        if (errors) {
            return errors;
        }

        return new PhloConfBridgeMember(this.client, { phloId: phloId, nodeId, memberAddress });

    }

}
