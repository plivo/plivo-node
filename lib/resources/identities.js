import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';

const clientKey = Symbol();
const action = 'Verification/Identity/';
const idField = 'id';

/**
 * Represents a Identity
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Identity extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Identity, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
  }

/**
 * update Identity
 * @method
 * @param {object} params - to update Identity
 * @param {string} [params.country_iso] Country ISO 2 code.
 * @param {string} [params.alias] Alias name of the Identity.
 * @param {string} [params.salutation] This can have values: Mr, Ms.
 * @param {string} [params.first_name] First name of the user for whom the identity is created.
 * @param {string} [params.last_name] Second name of the user for whom the identity is created.
 * @param {string} [params.birth_place] Birthplace of the user for whom the identity is created.
 * @param {string} [params.birth_date] Birth date in yyyy-mm-dd format of the user for whom the identity is created.
 * @param {string} [params.nationality] Nationality of the user for whom the identity is created.
 * @param {string} [params.id_nationality] Nationality mentioned in the identity proof.
 * @param {string} [params.id_issue_date] Issue date in yyyy-mm-dd mentioned in the identity proof.
 * @param {string} [params.business_name] Business name of the user for whom the identity is created.
 * @param {string} [params.id_type] Building name/number.
 * @param {string} [params.id_number] The unique number on the identifier.
 * @param {string} [params.address_line1] Building name/number.
 * @param {string} [params.address_line2] The street name/number of the address.
 * @param {string} [params.city] The city of the address for which the address proof is created.
 * @param {string} [params.region] The region of the address for which the address proof is created.
 * @param {string} [params.postal_code] The postal code of the address that is being created.
 * @param {object} [params.file] A File to upload, which needs to be considered the proof of address. Max. file Size = 5 MB. File should be in jpg, pdf, or png format.
 * @param {string} [params.subaccount] The link to the subaccount resource associated with the application. If the application belongs to the main account, this field will be null.
 * @param {string} [params.fiscal_identification_code] The code is available for businesses alone and will be available for spain mobile numbers. If not present, return null.
 * @param {string} [params.street_code] Street code of the address. Return null if not present.
 * @param {string} [params.municipal_code] Municipal code of the address.
 * @promise {object} return {@link Address} object
 * @fail {Error} return Error
 */

  update(params) {
    return super.update(params);
  }

/**
 * delete Identity
 * @method
 * @promise {object} return true on success
 * @fail {Error} return Error
 */
  delete() {
    return super.delete();
  }

}
/**
 * Represents a Identity interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class IdentityInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Identity, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

/**
 * get Identity by given id
 * @method
 * @param {string} id - id of Identity
 * @promise {object} return {@link Identity} object
 * @fail {Error} return Error
 */
  get(id) {
    return super.get(id);
  }

/**
 * create Identity
 * @method
 * @param {string} country_iso Country ISO 2 code.
 * @param {string} salutation This can have values: Mr, Ms.
 * @param {string} first_name First name of the user for whom the identity is created.
 * @param {string} last_name Second name of the user for whom the identity is created.
 * @param {string} birth_place Birthplace of the user for whom the identity is created.
 * @param {string} birth_date Birth date in yyyy-mm-dd format of the user for whom the identity is created.
 * @param {string} nationality Nationality of the user for whom the identity is created.
 * @param {string} id_nationality Nationality mentioned in the identity proof.
 * @param {string} id_issue_date Issue date in yyyy-mm-dd mentioned in the identity proof.
 * @param {string} id_type Building name/number.
 * @param {string} id_number The unique number on the identifier.
 * @param {string} address_line1 Building name/number.
 * @param {string} address_line2 The street name/number of the address.
 * @param {string} city The city of the address for which the address proof is created.
 * @param {string} region The region of the address for which the address proof is created.
 * @param {string} postal_code The postal code of the address that is being created.
 * @param {object} params - to create Identity
 * @param {string} [params.alias] Alias name of the Identity.
 * @param {string} [params.business_name] Business name of the user for whom the identity is created.
 * @param {string} [params.fiscal_identification_code] The code is valid for businesses alone.
 * @param {string} [params.street_code] Street code of the address.
 * @param {string} [params.municipal_code] Municipal code of the address.
 * @param {string} [params.subaccount] The link to the subaccount resource associated with the application. If the application belongs to the main account, this field will be null.
 * @param {object} [params.file] A File to upload, which needs to be considered the proof of address. Max. file Size = 5 MB. File should be in jpg, pdf, or png format.
 * @promise {object} return {@link PlivoGenericResponse} object
 * @fail {Error} return Error
 */
  create(
    country_iso,
    salutation,
    first_name,
    last_name,
    birth_place,
    birth_date,
    nationality,
    id_nationality,
    id_issue_date,
    id_type,
    id_number,
    address_line1,
    address_line2,
    city,
    region,
    postal_code,
    params = {}) {

    let errors = validate([
      {field: 'country_iso', value: country_iso, validators: ['isRequired', 'isString']},
      {field: 'salutation', value: salutation, validators: ['isRequired', 'isString']},
      {field: 'first_name', value: first_name, validators: ['isRequired', 'isString']},
      {field: 'last_name', value: last_name, validators: ['isRequired', 'isString']},
      {field: 'birth_place', value: birth_place, validators: ['isRequired', 'isString']},
      {field: 'birth_date', value: birth_date, validators: ['isRequired', 'isString']},
      {field: 'nationality', value: nationality, validators: ['isRequired', 'isString']},
      {field: 'id_nationality', value: id_nationality, validators: ['isRequired', 'isString']},
      {field: 'id_issue_date', value: id_issue_date, validators: ['isRequired', 'isString']},
      {field: 'id_type', value: id_type, validators: ['isRequired', 'isString']},
      {field: 'id_number', value: id_number, validators: ['isRequired', 'isString']},
      {field: 'address_line1', value: address_line1, validators: ['isRequired', 'isString']},
      {field: 'address_line2', value: address_line2, validators: ['isRequired', 'isString']},
      {field: 'city', value: city, validators: ['isRequired', 'isString']},
      {field: 'region', value: region, validators: ['isRequired', 'isString']},
      {field: 'postal_code', value: postal_code, validators: ['isRequired', 'isString']}
    ]);

    if (errors) {
      return errors;
    }

    params.country_iso = country_iso;
    params.salutation = salutation;
    params.first_name = first_name;
    params.last_name = last_name;
    params.birth_place = birth_place;
    params.birth_date = birth_date;
    params.nationality = nationality;
    params.id_nationality = id_nationality;
    params.id_issue_date = id_issue_date;
    params.id_type = id_type;
    params.id_number = id_number;
    params.address_line1 = address_line1;
    params.address_line2 = address_line2;
    params.city = city;
    params.region = region;
    params.postal_code = postal_code;

    return super.create(params);
  }

/**
 * update Identity
 * @method
 * @param {string} id - id of Identity
 * @param {object} params - to update Identity
 * @param {string} [params.country_iso] Country ISO 2 code.
 * @param {string} [params.alias] Alias name of the Identity.
 * @param {string} [params.salutation] This can have values: Mr, Ms.
 * @param {string} [params.first_name] First name of the user for whom the identity is created.
 * @param {string} [params.last_name] Second name of the user for whom the identity is created.
 * @param {string} [params.birth_place] Birthplace of the user for whom the identity is created.
 * @param {string} [params.birth_date] Birth date in yyyy-mm-dd format of the user for whom the identity is created.
 * @param {string} [params.nationality] Nationality of the user for whom the identity is created.
 * @param {string} [params.id_nationality] Nationality mentioned in the identity proof.
 * @param {string} [params.id_issue_date] Issue date in yyyy-mm-dd mentioned in the identity proof.
 * @param {string} [params.business_name] Business name of the user for whom the identity is created.
 * @param {string} [params.id_type] Building name/number.
 * @param {string} [params.id_number] The unique number on the identifier.
 * @param {string} [params.address_line1] Building name/number.
 * @param {string} [params.address_line2] The street name/number of the address.
 * @param {string} [params.city] The city of the address for which the address proof is created.
 * @param {string} [params.region] The region of the address for which the address proof is created.
 * @param {string} [params.postal_code] The postal code of the address that is being created.
 * @param {object} [params.file] A File to upload, which needs to be considered the proof of address. Max. file Size = 5 MB. File should be in jpg, pdf, or png format.
 * @param {string} [params.subaccount] The link to the subaccount resource associated with the application. If the application belongs to the main account, this field will be null.
 * @param {string} [params.fiscal_identification_code] The code is available for businesses alone and will be available for spain mobile numbers. If not present, return null.
 * @param {string} [params.street_code] Street code of the address. Return null if not present.
 * @param {string} [params.municipal_code] Municipal code of the address.
 * @promise {object} return {@link Identity} object
 * @fail {Error} return Error
 */
  update(id, params) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Identity(this[clientKey], {
      id: id
    }).update(params);
  }

/**
 * delete Identity
 * @method
 * @param {string} id - id of Identity
 * @promise {object} return true on success
 * @fail {Error} return Error
 */
  delete(id) {
    return new Identity(this[clientKey], {
      id: id
    }).delete();
  }
}
