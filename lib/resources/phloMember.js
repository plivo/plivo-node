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
export class PhloMember {

    constructor(client, id) {
        this.id = id;
        this.client = client;
    }

    resumeCall() {
        console.log('call member resume call api');
    }

    voicemailDrop() {
        console.log('call member voicemail drop api');
    }

    hangup() {
        console.log('call member hangup api');
    }

    hold() {
        console.log('call member hold api');
    }

    unhold() {
        console.log('call member unhold api');
    }

    update(action, params) {
        // return this.startRecording(params);
    }

}

export class PhloMemberInterface {

    constructor(client, data = {}) {
        this.client = client;
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

        let phloMemberObj = new PhloMember(this.client, id);
        return phloMemberObj;
    }

}
