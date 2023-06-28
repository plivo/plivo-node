/**
 * Represents a Brand
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Brand extends PlivoResource {
    constructor(client: any, data?: {});
}
export class BrandCreationResponse {
    constructor(params: any);
    apiId: any;
    brand_id: any;
    message: any;
}
/**
 * Represents a Brand Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class BrandInterface extends PlivoResource {
    constructor(client: any, data?: {});
    /**
   * get Brand by given id
   * @method
   * @param {string} brandID - id of brand
   * @promise {object} return {@link Brand} object
   * @fail {Error} return Error
   */
    get(brandId: any): Promise<any>;
    /**
     * Get All Brand Detail
     * @method
     * @param {object} params - params type and status to get all brand details.
     * @promise {object[]} returns list of Brand Object
     * @fail {Error} returns Error
     */
    list(params: object): Promise<any>;
    /**
     * Brand Registration
     * @method
     * @param {object} params
     * @param {string} brand_alias
     * @param {string} profile_uuid
     * @param {string} brand_type
     * @param {string} secondary_vetting
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    create(brand_alias: string, profile_uuid: string, brand_type: string, secondary_vetting: string, params?: object): Promise<any>;
    /**
   * get BrandUsecases by given id
   * @method
   * @param {string} brandID - id of brand
   * @promise {object} return {@link Brand} object
   * @fail {Error} return Error
   */
    get_usecases(brandId: any): Promise<any>;
    /**
   * delete Brand by given id
   * @method
   * @param {string} brandID - id of brand
   * @promise {object} return {@link PlivoGenericResponse} object
   * @fail {Error} return Error
   */
    deleteBrand(brandId: any): Promise<any>;
}
import { PlivoResource } from '../base';
