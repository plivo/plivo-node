import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';

const clientKey = Symbol();
const action = 'Verification/Address/';
const idField = 'id';

/* ---------------Address method----------*/
export class Address extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Address, idField, client);
        this[clientKey] = client;
        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}

export class AddressInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, Address, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    get(id) {
        let errors = validate([
            { field: 'id', value: id, validators: ['isRequired'] }
        ]);
        if (errors) {
            return errors;
        }
        return super.get(id);
    }

    list(params) {
        return super.list(params, 'POST');
    }

    create(phone_number_country, number_type, salutation, first_name, last_name, address_line1, address_line2, city, region, postal_code, country_iso, callback_url, alias, file, proof_type, id_number, fiscal_identification_code, street_code, municipal_code) {
        return super.create({
            phone_number_country: phone_number_country,
            number_type: number_type,
            salutation: salutation,
            first_name: first_name,
            last_name: last_name,
            address_line1: address_line1,
            address_line2: address_line2,
            city: city,
            region: region,
            postal_code: postal_code,
            country_iso: country_iso,
            callback_url: callback_url,
            alias: alias,
            file: file,
            proof_type: proof_type,
            id_number: id_number,
            fiscal_identification_code: fiscal_identification_code,
            street_code: street_code,
            municipal_code: municipal_code
        }, { isMultipart: true });
    }

    update(dataToUpdate) {

        let errors = validate([
            { field: 'address_id', value: dataToUpdate.address_id, validators: ['isRequired'] }
        ]);

        if (errors) {
            return errors;
        }

        return (new Address(this[clientKey], {
            id: dataToUpdate.address_id
        })).update(dataToUpdate, this.id, { isMultipart: true });
    }

    delete(id) {
        let errors = validate([
            { field: 'id', value: id, validators: ['isRequired'] }
        ]);

        if (errors) {
            return errors;
        }

        return (new Address(this[clientKey], { id: id })).delete(id);
    }
}
