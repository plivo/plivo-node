import * as _ from 'lodash';

import {
    PlivoGenericResponse,
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

var fs = require('fs');

const clientKey = Symbol();
const action = 'Media/';
const idField = 'media_id';

export class UploadMediaResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.objects = params.objects;
    }
}

export class RetrieveMediaResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.contentType = params.contentType;
        this.fileName = params.fileName;
        this.mediaId = params.mediaId;
        this.mediaUrl = params.mediaUrl;
        this.size = params.size;
        this.uploadTime = params.uploadTime;
    }
}

export class ListMediaResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
      
    }
}

/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Media extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Media, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}
/**
 * Represents a Media Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

export class MediaInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, Media, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * Upload Media
     * @method
     * @fail {Error} return Error
     */
    upload(files) {
        let errors = validate([{
            field: 'files',
            value: files,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        let params = {}
        params.file = files

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new UploadMediaResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * Get Media by given id
     * @method
     * @param {string} media_id - id of media
     * @promise {object} return {@link Media} object if success
     * @fail {Error} return Error
     */
    get(media_id) {
        let errors = validate([{
            field: 'media_id',
            value: media_id,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !media_id) {
                reject(new Error(this[idKey] + ' must be set'));
            }
            client('GET', action + (media_id ? media_id + '/' : ''))
                .then(response => {
                    resolve(new RetrieveMediaResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * Get All Media Detail
     * @method
     * @param {object} params - params to get all media details.
     * @promise {object[]} returns list of Media Object
     * @fail {Error} returns Error
     */
    list(params) {
        //return super.list(params);

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    let objects = [];
                    Object.defineProperty(objects, 'meta', {
                        value: response.body.meta,
                        enumerable: true
                    });
                    response.body.objects.forEach(item => {
                        objects.push(new PlivoGenericResponse(item, client));
                    });
                    resolve(objects);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}