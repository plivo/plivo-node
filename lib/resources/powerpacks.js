import * as _ from 'lodash';

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'Powerpack/';
const idField = 'uuid';
const numberpoolIdField = 'numberPool';
const clientKey = Symbol();


export class ListAllNumbersResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
    }
}

export class CreatePowerpackResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.applicationId = params.applicationId;
        this.applicationType = params.applicationType;
        this.createdOn = params.createdOn;
        this.localConnect = params.localConnect;
        this.name = params.name;
        this.numberPool = params.numberPool;
        this.numberPriority = params.numberPriority;
        this.stickySender = params.stickySender;
        this.uuid = params.uuid;
    }
}

export class UpdatePowerpackResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.applicationId = params.applicationId;
        this.applicationType = params.applicationType;
        this.createdOn = params.createdOn;
        this.localConnect = params.localConnect;
        this.name = params.name;
        this.numberPool = params.numberPool;
        this.stickySender = params.stickySender;
        this.numberPriority = params.numberPriority;
        this.uuid = params.uuid;
    }
}

export class ListShortCodeResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
    }
}
export class ListTollFreeResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
    }
}

export class AddNumberResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.accountPhoneNumberResource = params.accountPhoneNumberResource;
        this.addedOn = params.addedOn;
        this.countryIso2 = params.countryIso2;
        this.number = params.number;
        this.numberPoolUuid = params.numberPoolUuid;
        this.type = params.type;
        this.service = params.service;
    }
}

export class RemoveNumberResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.response = params.response;
    }
}

export class RemoveTollFreeNumberResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.response = params.response;
    }
}

export class RemoveShortCodeResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.response = params.response;
    }
}
export class AddTollFreeNumberresponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.accountPhoneNumberResource = params.accountPhoneNumberResource;
        this.addedOn = params.addedOn;
        this.countryIso2 = params.countryIso2;
        this.number = params.number;
        this.numberPoolUuid = params.numberPoolUuid;
        this.type = params.type;
        this.service = params.service;
    }
}

export class RetrieveNumberResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.accountPhoneNumberResource = params.accountPhoneNumberResource;
        this.addedOn = params.addedOn;
        this.countryIso2 = params.countryIso2;
        this.number = params.number;
        this.numberPoolUuid = params.numberPoolUuid;
        this.type = params.type;
    }
}


export class RetrieveTollFreeResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.accountPhoneNumberResource = params.accountPhoneNumberResource;
        this.addedOn = params.addedOn;
        this.countryIso2 = params.countryIso2;
        this.number = params.number;
        this.numberPoolUuid = params.numberPoolUuid;
        this.type = params.type;
    }
}
export class RetrieveShortCodeResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.addedOn = params.addedOn;
        this.countryIso2 = params.countryIso2;
        this.shortCode = params.shortCode;
        this.numberPoolUuid = params.numberPoolUuid;
    }
}

/**
 * Represents a Powerpack
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Powerpack extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Powerpack, idField, client);

        if (idField in data) {
            this.uuid = data[idField];
        }
        if (numberpoolIdField in data) {
            this.number_pool_id = data[numberpoolIdField].split('/')[5];
        }
        this.number_pool = new NumberPool(client, {
            number_pool_id: this.number_pool_id
        });
        extend(this, data);
        this[clientKey] = client;
    }

    list_numbers(params) {
        let query = this.search_query(params);
        var queryparams = {};
        queryparams['search'] = 'hack';
        let path = 'NumberPool/' + this.number_pool_id + '/Number/?' + query;
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', path.toString().trim(), queryparams)
                .then(response => {
                    resolve(new ListAllNumbersResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    search_query(params) {
        if (params === undefined) {
            params = {};
        }
        var query = '';
        if (params.type != undefined) {
            query = 'type=' + params.type;
        }
        if (params.starts_with != undefined) {
            if (query == '') {
                query = 'starts_with=' + params.starts_with;
            } else {
                query += '&starts_with=' + params.starts_with;
            }
        }
        // return params;
        if (params.country_iso2 != undefined) {
            if (query == '') {
                query = 'country_iso2=' + params.country_iso2;
            } else {
                query += '&country_iso2=' + params.country_iso2;
            }
        }
        if (params.limit != undefined) {
            if (query == '') {
                query = 'limit=' + params.limit;
            } else {
                query += '&limit=' + params.limit;
            }
        }
        if (params.offset != undefined) {
            if (query == '') {
                query = 'offset=' + params.offset;
            } else {
                query += '&offset=' + params.offset;
            }
        }

        if (params.service != undefined) {
            if (query == '') {
                query = 'service=' + params.service;
            } else {
                query += '&service=' + params.service;
            }
        }

        query = query + '&';

        return query;
    }

    count_numbers(params) {
        let query = this.search_query(params);
        var queryparams = {};
        queryparams['search'] = 'hack';
        let path = 'NumberPool/' + this.number_pool_id + '/Number/?' + query;
        return super.getMetaResponse(path.toString().trim(), 'GET', queryparams);
    }

    find_number(number) {
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', path.toString().trim())
                .then(response => {
                    resolve(new RetrieveNumberResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    add_number(number, service = '') {
        var params = {};
        params['rent'] = 'false';
        if (service != '') {
            params['service'] = service
        }
        let client = this[clientKey];
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        return new Promise((resolve, reject) => {
            client('POST', path.toString().trim(), params)
                .then(response => {
                    resolve(new AddNumberResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    add_tollfree(tollfree, service = '') {
        var params = {};
        params['rent'] = 'false';
        if (service != '') {
            params['service'] = service
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', path.toString().trim(), params)
                .then(response => {
                    resolve(new AddTollFreeNumberresponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    remove_number(number, unrent = false) {
        var params = {};
        params['unrent'] = unrent.toString();
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('DELETE', path.toString().trim(), params)
                .then(response => {
                    resolve(new RemoveNumberResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    remove_tollfree(tollfree, unrent = false) {
        var params = {};
        params['unrent'] = unrent.toString();
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('DELETE', path.toString().trim(), params)
                .then(response => {
                    resolve(new RemoveTollFreeNumberResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    remove_shortcode(shortcode) {
        let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('DELETE', path.toString().trim())
                .then(response => {
                    resolve(new RemoveShortCodeResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    list_shortcodes(params) {
        if (params === undefined) {
            params = {};
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', path.toString().trim(), params)
                .then(response => {
                    resolve(new ListShortCodeResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    list_tollfree(params) {
        if (params === undefined) {
            params = {};
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', path.toString().trim(), params)
                .then(response => {
                    resolve(new ListTollFreeResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    find_shortcode(shortcode, service = '') {
        let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
        if (service != '') {
            path = path + '&service=' + service
        }
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', path.toString().trim())
                .then(response => {
                    resolve(new RetrieveShortCodeResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    find_tollfree(tollfree, service = '') {
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
        if (service != '') {
            path = path + '&service=' + service
        }
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', path.toString().trim())
                .then(response => {
                    resolve(new RetrieveTollFreeResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    buy_add_number(params) {
        var number = params.number;
        var rentparam = {};
        rentparam['rent'] = 'true';
        if (params.number == undefined) {
            try {
                if (params.country_iso2 != undefined) {
                    params['country_iso'] = params.country_iso2;
                }
                if (params.service != undefined) {
                    params['service'] = params.service;
                }
                var test = super.customexecuteGetNumberAction('PhoneNumber/', 'GET', params);
                return test.then((val) => {
                    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + val + '/';
                    return super.customexecuteAction(path.toString().trim(), 'POST', rentparam);
                });
            } catch (err) {
                return err.message;
            }
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        return super.customexecuteAction(path.toString().trim(), 'POST', rentparam);
    }

    /**
   * update powerpack
   * @method
   * @param {object} params - to update Powerpack
   * @param {string} [params.name]
   * @param {string} [params.application_type]
   * @param {string} [params.application_id]
   * @param {string} [params.sticky_sender]
   * @param {string} [params.local_connect]
   * @param {object} [params.number_priority]
   * @promise {object} return {@link Powerpack} object
   * @fail {Error} return Error
   */
    update(params) {
        let path = 'Powerpack/' + this.uuid + '/';
        //return super.customexecuteAction(path.toString().trim(), 'POST', params);
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', path.toString().trim(), params)
                .then(response => {
                    resolve(new UpdatePowerpackResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * delete Powerpack
     * @method
     * @promise {object} return true on success
     * @fail {Error} return Error
     */
    delete(unrent_numbers = false) {
        let params = {};
        if (typeof unrent_numbers === 'boolean') {
            params.unrent_numbers = unrent_numbers.toString();
        }
        let path = 'Powerpack/' + this.uuid + '/';
        return super.customexecuteAction(path.toString().trim(), 'DELETE', params);
    }
}
const numberPoolField = 'number_pool_id';
export class NumberPool extends PlivoResource {
    constructor(client, data = {}) {
        super(action, NumberPool, numberPoolField, client);
        this.numbers = new Numbers(client, {
            number_pool_id: data.number_pool_id
        });
        this.shortcodes = new Shortcode(client, {
            number_pool_id: data.number_pool_id
        });
        this.tollfree = new Tollfree(client, {
            number_pool_id: data.number_pool_id
        });

        extend(this, data);
    }
}

export class Numbers extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Numbers, numberPoolField, client);
        extend(this, data);
    }
    buy_add_number(params) {
        var number = params.number;
        var rentparam = {};
        rentparam['rent'] = 'true';
        if (params.number == undefined) {
            try {
                if (params.country_iso2 != undefined) {
                    params['country_iso'] = params.country_iso2;
                }
                if (params.service != undefined) {
                    params['service'] = params.service;
                }
                var test = super.customexecuteGetNumberAction('PhoneNumber/', 'GET', params);
                return test.then((val) => {
                    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + val + '/';
                    return super.customexecuteAction(path.toString().trim(), 'POST', rentparam);
                });
            } catch (err) {
                return err.message;
            }
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        return super.customexecuteAction(path.toString().trim(), 'POST', rentparam);
    }

    list(params) {
        let query = this.search_query(params);
        var queryparams = {};
        queryparams['search'] = 'hack';
        let path = 'NumberPool/' + this.number_pool_id + '/Number//?' + query;
        return super.customexecuteAction(path.toString().trim(), 'GET', queryparams);
    }
    count(params) {
        let query = this.search_query(params);
        var queryparams = {};
        queryparams['search'] = 'hack';
        let path = 'NumberPool/' + this.number_pool_id + '/Number//?' + query;
        return super.getMetaResponse(path.toString().trim(), 'GET', queryparams);
    }

    search_query(params) {
        if (params === undefined) {
            params = {};
        }
        var query = '';
        if (params.type != undefined) {
            query = 'type=' + params.type;
        }
        if (params.starts_with != undefined) {
            if (query == '') {
                query = 'starts_with=' + params.starts_with;
            } else {
                query += '&starts_with=' + params.starts_with;
            }
        }
        // return params;
        if (params.country_iso2 != undefined) {
            if (query == '') {
                query = 'country_iso2=' + params.country_iso2;
            } else {
                query += '&country_iso2=' + params.country_iso2;
            }
        }
        if (params.limit != undefined) {
            if (query == '') {
                query = 'limit=' + params.limit;
            } else {
                query += '&limit=' + params.limit;
            }
        }
        if (params.offset != undefined) {
            if (query == '') {
                query = 'offset=' + params.offset;
            } else {
                query += '&offset=' + params.offset;
            }
        }
        if (params.service != undefined) {
            if (query == '') {
                query = 'service=' + params.service;
            } else {
                query += '&service=' + params.service;
            }
        }

        query = query + '&';

        return query;
    }

    find(number) {
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        return super.customexecuteAction(path.toString().trim(), 'GET');
    }
    add(number, service = '') {
        var params = {};
        params['rent'] = 'false';
        if (service != '') {
            params['service'] = service
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        return super.customexecuteAction(path.toString().trim(), 'POST', params);
    }
    remove(number, unrent = false) {
        var params = {};
        params['unrent'] = unrent.toString();
        let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
        return super.customexecuteAction(path.toString().trim(), 'DELETE', params);
    }
}
export class Shortcode extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Shortcode, numberPoolField, client);
        extend(this, data);
        this.number_pool_id = data.number_pool_id;
    }
    list(params) {
        if (params === undefined) {
            params = {};
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/';
        return super.customexecuteAction(path.toString().trim(), 'GET', params);
    }
    find(shortcode) {
        let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
        return super.customexecuteAction(path.toString().trim(), 'GET');
    }
    remove(shortcode) {
        let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
        return super.customexecuteAction(path.toString().trim(), 'DELETE');
    }
}
export class Tollfree extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Tollfree, numberPoolField, client);
        extend(this, data);
        this.number_pool_id = data.number_pool_id;
    }
    add(tollfree) {
        var params = {};
        params['rent'] = 'false';
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
        return super.customexecuteAction(path.toString().trim(), 'POST', params);
    }
    remove(tollfree, unrent = false) {
        var params = {};
        params['unrent'] = unrent.toString();
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
        return super.customexecuteAction(path.toString().trim(), 'DELETE', params);
    }
    list(params) {
        if (params === undefined) {
            params = {};
        }
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/';
        return super.customexecuteAction(path.toString().trim(), 'GET', params);
    }
    find(tollfree) {
        let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
        return super.customexecuteAction(path.toString().trim(), 'GET');
    }
}
/**
 * Represents a Powerpack interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PowerpackInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, Powerpack, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get Powerpack by given id
     * @method
     * @param {string} uuid - id of Powerpack
     * @promise {object} return {@link Powerpack} object
     * @fail {Error} return Error
     */
     get(uuid) {
        return super.get(uuid);
    }
    /**
     * create Powerpack
     * @method
     * @param {string} name - name of Powerpack
     * @param {object} params - params to create Powerpack
     * @param {string} [params.sticky_sender] -
     * @param {string} [params.local_connect]
     * @param {string} [params.application_type]
     * @param {string} [params.application_id]
     * @param {object} [params.number_priority]
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    create(name, params = {}) {
        let errors = validate([{
            field: 'name',
            value: name,
            validators: ['isRequired', 'isString']
        }]);

        if (errors) {
            return errors;
        }

        params.name = name;

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreatePowerpackResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * update Powerpack
     * @method
     * @param {string} uuid - id of Powerpack
     * @param {object} params - to update Powerpack
     * @param {string} [params.name]
     * @param {string} [params.sticky_sender]
     * @param {string} [params.local_connect]
     * @param {string} [params.application_type]
     * @param {string} [params.application_id]
     * @param {object} [params.number_priority]
     * @promise {object} return {@link Powerpack} object
     * @fail {Error} return Error
     */
    update(uuid, params) {
        let errors = validate([{
            field: 'uuid',
            value: uuid,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Powerpack(this[clientKey], {
            uuid: uuid
        }).update(params);
    }

    /**
     * Get All Call Detail
     * @method
     * @param {object} params - params to get all call details.
     * @promise {object[]} returns list of Call Object
     * @fail {Error} returns Error
     */
    list(params) {
        return super.list(params);
    }
}
