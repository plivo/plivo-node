/**
 * Represents a MultiPartyCall
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class MultiPartyCall extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    get(params?: {}): Promise<any>;
    addParticipant(params: object): Promise<any>;
    start(params?: object): Promise<any>;
    stop(): Promise<any>;
    startRecording(params?: object): Promise<any>;
    stopRecording(): Promise<any>;
    pauseRecording(): Promise<any>;
    resumeRecording(): Promise<any>;
    listParticipants(params?: object): Promise<any>;
    [clientKey]: symbol;
}

/**
 * Represents a MultiPartyCall Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class MultiPartyCallInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    /**
     * list all MultiPartyCalls
     * @method
     * @param {object} params - params to filter MultiPartyCalls
     * @promise {object[]} returns list of MultiPartyCall Object
     * @fail {Error} returns Error
     */
    list(params?: {}): Promise<any>;

    /**
     * get MultiPartyCall by given uuid or friendlyName
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link MultiPartyCall} object
     * @fail {Error} return Error
     */
    get(params?: {
        uuid?: string;
        friendlyName?: string;
    }): Promise<any>;

    /**
     * add Participant to MultiPartyCall
     * @method
     * @param {string} role - role of participant (agent, supervisor, customer)
     * @param {object} params - params with uuid or friendlyName and participant details
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    addParticipant(role: string, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * start MultiPartyCall
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @param {string} [params.status] - status (active)
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    start(params?: {
        uuid?: string;
        friendlyName?: string;
        status?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * stop MultiPartyCall
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    stop(params?: {
        uuid?: string;
        friendlyName?: string;
    }): Promise<any>;

    /**
     * start Recording for MultiPartyCall
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    startRecording(params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * stop Recording for MultiPartyCall
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    stopRecording(params?: {
        uuid?: string;
        friendlyName?: string;
    }): Promise<any>;

    /**
     * pause Recording for MultiPartyCall
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    pauseRecording(params?: {
        uuid?: string;
        friendlyName?: string;
    }): Promise<any>;

    /**
     * resume Recording for MultiPartyCall
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    resumeRecording(params?: {
        uuid?: string;
        friendlyName?: string;
    }): Promise<any>;

    /**
     * list Participants of MultiPartyCall
     * @method
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return list of participants
     * @fail {Error} return Error
     */
    listParticipants(params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * update Participant in MultiPartyCall
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    updateParticipant(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * kick Participant from MultiPartyCall
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    kickParticipant(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
    }): Promise<any>;

    /**
     * get Participant from MultiPartyCall
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return participant object
     * @fail {Error} return Error
     */
    getParticipant(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
    }): Promise<any>;

    /**
     * start Recording for Participant
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    startParticipantRecording(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * stop Recording for Participant
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    stopParticipantRecording(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * pause Recording for Participant
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    pauseParticipantRecording(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * resume Recording for Participant
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    resumeParticipantRecording(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * start Play Audio for Participant
     * @method
     * @param {string|number} participantId - id of participant
     * @param {string} url - audio URL to play
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    startPlayAudio(participantId: string | number, url: string, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;

    /**
     * stop Play Audio for Participant
     * @method
     * @param {string|number} participantId - id of participant
     * @param {object} params - params with uuid or friendlyName
     * @param {string} [params.uuid] - uuid of MultiPartyCall
     * @param {string} [params.friendlyName] - friendlyName of MultiPartyCall
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    stopPlayAudio(participantId: string | number, params?: {
        uuid?: string;
        friendlyName?: string;
        [key: string]: any;
    }): Promise<any>;
    [clientKey]: symbol;
}

import { PlivoResource } from "../base";
import { PlivoResourceInterface } from "../base";
declare const clientKey: unique symbol;
export {};

