import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import * as _ from 'lodash';

const action = 'Powerpack/';
const idField = 'uuid';
const numberpoolIdField = 'numberPool';
const clientKey = Symbol();

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
	}

	list_numbers(params) {
		let query = this.search_query(params);
		var queryparams = {};
		queryparams['search'] = 'hack';
		let path = 'NumberPool/' + this.number_pool_id + '/Number/?' + query;
		return super.customexecuteAction(path.toString().trim(), 'GET', queryparams);
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
		return super.customexecuteAction(path.toString().trim(), 'GET');
	}
	add_number(number) {
		var params = {};
		params['rent'] = 'false';
		let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
		return super.customexecuteAction(path.toString().trim(), 'POST', params);
	}
	add_tollfree(tollfree) {
		var params = {};
		params['rent'] = 'false';
		let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
		return super.customexecuteAction(path.toString().trim(), 'POST', params);
	}
	remove_number(number, unrent = false) {
    var params = {};
		params['unrent'] = unrent.toString();
		let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
		return super.customexecuteAction(path.toString().trim(), 'DELETE', params);
	}
	remove_tollfree(tollfree, unrent = false) {
	var params = {};
		params['unrent'] = unrent.toString();
		let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
		return super.customexecuteAction(path.toString().trim(), 'DELETE', params);
	}
	remove_shortcode(shortcode) {
		let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
		return super.customexecuteAction(path.toString().trim(), 'DELETE');
	}
	list_shortcodes(params) {
		if (params === undefined) {
			params = {};
		}
		let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/';
		return super.customexecuteAction(path.toString().trim(), 'GET', params);
	}
	list_tollfree(params) {
		if (params === undefined) {
			params = {};
		}
		let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/';
		return super.customexecuteAction(path.toString().trim(), 'GET', params);
	}
	find_shortcode(shortcode) {
		let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
		return super.customexecuteAction(path.toString().trim(), 'GET');
	}
	find_tollfree(tollfree) {
		let path = 'NumberPool/' + this.number_pool_id + '/Tollfree/' + tollfree + '/';
		return super.customexecuteAction(path.toString().trim(), 'GET');
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
   * @param {list} [params.number_priority]

   * @promise {object} return {@link Powerpack} object
   * @fail {Error} return Error
   */
	update(params) {
		let path = 'Powerpack/' + this.uuid + '/';
		return super.customexecuteAction(path.toString().trim(), 'POST', params);
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

		query = query + '&';

		return query;
	}

	find(number) {
		let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
		return super.customexecuteAction(path.toString().trim(), 'GET');
	}
	add(number) {
		var params = {};
		params['rent'] = 'false';
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
   * @param {list} [params.number_priority]
   * @promise {object} return {@link PlivoGenericResponse} object
   * @fail {Error} return Error
   */
	create(name, params = {}) {
		let errors = validate([
			{
				field: 'name',
				value: name,
				validators: [ 'isRequired', 'isString' ]
			}
		]);

		if (errors) {
			return errors;
		}

		params.name = name;

		return super.create(params);
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
   * @param {list} [params.number_priority]
   * @promise {object} return {@link Powerpack} object
   * @fail {Error} return Error
   */
	update(uuid, params) {
		let errors = validate([
			{
				field: 'uuid',
				value: uuid,
				validators: [ 'isRequired' ]
			}
		]);

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
