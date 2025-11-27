/**
 * Represents a Brand
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Brand extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    [clientKey]: symbol;
}

export class BrandCreationResponse {
    constructor(params: object);
    apiId: string;
    brand_id: string;
    message: string;
}

/**
 * Represents a Brand Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class BrandInterface extends PlivoResource {
    constructor(client: Function, data?: {});
    /**
     * get Brand by given id
     * @method
     * @param {string} brandId - id of brand
     * @promise {object} return {@link Brand} object
     * @fail {Error} return Error
     */
    get(brandId: string): Promise<any>;

    /**
     * Get All Brand Detail
     * @method
     * @param {object} params - params type and status to get all brand details.
     * @promise {object[]} returns list of Brand Object
     * @fail {Error} returns Error
     */
    list(params?: {}): Promise<any>;

    /**
     * Brand Registration
     * @method
     * @param {string} brand_alias
     * @param {string} profile_uuid
     * @param {string} brand_type
     * @param {boolean} secondary_vetting
     * @param {object} params - additional params
     * @promise {object} return {@link BrandCreationResponse} object
     * @fail {Error} return Error
     */
    create(
        brand_alias: string,
        profile_uuid: string,
        brand_type: string,
        secondary_vetting: boolean,
        params?: {}
    ): Promise<BrandCreationResponse>;

    /**
     * Trigger OTP for Starter brand
     * @method
     * @param {string} brandId
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    trigger_otp(brandId: string): Promise<any>;

    /**
     * get BrandUsecases by given id
     * @method
     * @param {string} brandId - id of brand
     * @promise {object} return {@link Brand} object
     * @fail {Error} return Error
     */
    get_usecases(brandId: string): Promise<any>;

    /**
     * delete Brand by given id
     * @method
     * @param {string} brandId - id of brand
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    deleteBrand(brandId: string): Promise<any>;
    [clientKey]: symbol;
}

import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
export {};

