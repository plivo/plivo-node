import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';

const clientKey = Symbol();
const action = 'Verification/Address/';
const idField = 'id';

/**
 * Represents a Address
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Address extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Address, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
  }

/**
 * update Address
 * @method
 * @param {object} params - to update Address
 * @param {string} [params.country_iso] Country ISO 2 code.
 * @param {string} [params.alias] Alias name of the addressT.
 * @param {string} [params.salutation] This can have values: Mr, Ms.
 * @param {string} [params.first_name] First name of the user for whom the identity is created.
 * @param {string} [params.last_name] Second name of the user for whom the identity is created.
 * @param {string} [params.address_line1] Building name/number.
 * @param {string} [params.address_line2] The street name/number of the address.
 * @param {string} [params.city] The city of the address for which the address proof is created.
 * @param {string} [params.region] The region of the address for which the address proof is created.
 * @param {string} [params.postal_code] The postal code of the address that is being created.
 * @param {object} [params.file] A File to upload, which needs to be considered the proof of address. Max. file Size = 5 MB. File should be in jpg, pdf, or png format.
 * @param {string} [params.address_proof_type] The type of document that is provided as address proof. Possible values: national_id - National ID document,  passport - Passport, business_id - Business registration document, NIF - National identity card for Spain, NIE - Tax identification number for Spain, DNI - Fiscal identification number for Spain, any - Any type of document apart from the ones specified.
 * @param {string} [params.fiscal_identification_code] The code is valid for businesses alone.
 * @param {string} [params.street_code] Street code of the address.
 * @param {string} [params.municipal_code] Municipal code of the address.
 * @promise {object} return {@link Address} object
 * @fail {Error} return Error
 */

  update(params) {
    return super.update(params);
  }

/**
 * delete Address
 * @method
 * @promise {object} return true on success
 * @fail {Error} return Error
 */
  delete() {
    return super.delete();
  }

}
/**
 * Represents a Address interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class AddressInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Address, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

/**
 * get Address by given id
 * @method
 * @param {string} id - id of Address
 * @promise {object} return {@link Address} object
 * @fail {Error} return Error
 */
  get(id) {
    return super.get(id);
  }

/**
 * create Address
 * @method
 * @param {string} country_iso Country ISO 2 code.
 * @param {string} salutation This can have values: Mr, Ms.
 * @param {string} first_name First name of the user for whom the identity is created.
 * @param {string} last_name Second name of the user for whom the identity is created.
 * @param {string} address_line1 Building name/number.
 * @param {string} address_line2 The street name/number of the address.
 * @param {string} city The city of the address for which the address proof is created.
 * @param {string} region The region of the address for which the address proof is created.
 * @param {string} postal_code The postal code of the address that is being created.
 * @param {string} address_proof_type The type of document that is provided as address proof. Possible values: national_id - National ID document,  passport - Passport, business_id - Business registration document, NIF - National identity card for Spain, NIE - Tax identification number for Spain, DNI - Fiscal identification number for Spain, any - Any type of document apart from the ones specified.
 * @param {object} params - to create Address
 * @param {string} [params.alias] Alias name of the addressT.
 * @param {object} [params.file] A File to upload, which needs to be considered the proof of address. Max. file Size = 5 MB. File should be in jpg, pdf, or png format.
 * @param {string} [params.fiscal_identification_code] The code is valid for businesses alone.
 * @param {string} [params.street_code] Street code of the address.
 * @param {string} [params.municipal_code] Municipal code of the address.
 * @promise {object} return {@link PlivoGenericResponse} object
 * @fail {Error} return Error
 */
  create(country_iso, salutation, first_name, last_name, address_line1, address_line2, city, region, postal_code, address_proof_type, params = {}) {

    let errors = validate([
      {field: 'country_iso', value: country_iso, validators: ['isRequired', 'isString']},
      {field: 'salutation', value: salutation, validators: ['isRequired', 'isString']},
      {field: 'first_name', value: first_name, validators: ['isRequired', 'isString']},
      {field: 'last_name', value: last_name, validators: ['isRequired', 'isString']},
      {field: 'address_line1', value: address_line1, validators: ['isRequired', 'isString']},
      {field: 'address_line2', value: address_line2, validators: ['isRequired', 'isString']},
      {field: 'city', value: city, validators: ['isRequired', 'isString']},
      {field: 'region', value: region, validators: ['isRequired', 'isString']},
      {field: 'postal_code', value: postal_code, validators: ['isRequired', 'isString']},
      {field: 'address_proof_type', value: address_proof_type, validators: ['isRequired', 'isString']}
    ]);

    if (errors) {
      return errors;
    }

    params.country_iso = country_iso;
    params.salutation = salutation;
    params.first_name = first_name;
    params.last_name = last_name;
    params.address_line1 = address_line1;
    params.address_line2 = address_line2;
    params.city = city;
    params.region = region;
    params.postal_code = postal_code;
    params.address_proof_type = address_proof_type;

    return super.create(params);
  }

/**
 * update Address
 * @method
 * @param {string} id - id of Address
 * @param {object} params - to update Address
 * @param {string} [params.country_iso] Country ISO 2 code.
 * @param {string} [params.alias] Alias name of the addressT.
 * @param {string} [params.salutation] This can have values: Mr, Ms.
 * @param {string} [params.first_name] First name of the user for whom the identity is created.
 * @param {string} [params.last_name] Second name of the user for whom the identity is created.
 * @param {string} [params.address_line1] Building name/number.
 * @param {string} [params.address_line2] The street name/number of the address.
 * @param {string} [params.city] The city of the address for which the address proof is created.
 * @param {string} [params.region] The region of the address for which the address proof is created.
 * @param {string} [params.postal_code] The postal code of the address that is being created.
 * @param {object} [params.file] A File to upload, which needs to be considered the proof of address. Max. file Size = 5 MB. File should be in jpg, pdf, or png format.
 * @param {string} [params.address_proof_type] The type of document that is provided as address proof. Possible values: national_id - National ID document,  passport - Passport, business_id - Business registration document, NIF - National identity card for Spain, NIE - Tax identification number for Spain, DNI - Fiscal identification number for Spain, any - Any type of document apart from the ones specified.
 * @param {string} [params.fiscal_identification_code] The code is valid for businesses alone.
 * @param {string} [params.street_code] Street code of the address.
 * @param {string} [params.municipal_code] Municipal code of the address.
 * @promise {object} return {@link Address} object
 * @fail {Error} return Error
 */
  update(id, params) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Address(this[clientKey], {
      id: id
    }).update(params);
  }

/**
 * delete Address
 * @method
 * @param {string} id - id of Address
 * @promise {object} return true on success
 * @fail {Error} return Error
 */
  delete(id) {
    return new Address(this[clientKey], {
      id: id
    }).delete();
  }
}
