/**
 * Represents a Powerpack
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Powerpack extends PlivoResource {
    constructor(client: any, data?: {});
    uuid: any;
    number_pool_id: any;
    number_pool: NumberPool;
    list_numbers(params: any): Promise<any>;
    search_query(params: any): string;
    count_numbers(params: any): Promise<any>;
    find_number(number: any): Promise<any>;
    add_number(number: any): Promise<any>;
    add_tollfree(tollfree: any): Promise<any>;
    remove_number(number: any, unrent?: boolean): Promise<any>;
    remove_tollfree(tollfree: any, unrent?: boolean): Promise<any>;
    remove_shortcode(shortcode: any): Promise<any>;
    list_shortcodes(params: any): Promise<any>;
    list_tollfree(params: any): Promise<any>;
    find_shortcode(shortcode: any): Promise<any>;
    find_tollfree(tollfree: any): Promise<any>;
    buy_add_number(params: any): any;
}
export class NumberPool extends PlivoResource {
    constructor(client: any, data?: {});
    numbers: Numbers;
    shortcodes: Shortcode;
    tollfree: Tollfree;
}
export class Numbers extends PlivoResource {
    constructor(client: any, data?: {});
    buy_add_number(params: any): any;
    list(params: any): Promise<any>;
    count(params: any): Promise<any>;
    search_query(params: any): string;
    find(number: any): Promise<any>;
    add(number: any): Promise<any>;
    remove(number: any, unrent?: boolean): Promise<any>;
}
export class Shortcode extends PlivoResource {
    constructor(client: any, data?: {});
    number_pool_id: any;
    list(params: any): Promise<any>;
    find(shortcode: any): Promise<any>;
    remove(shortcode: any): Promise<any>;
}
export class Tollfree extends PlivoResource {
    constructor(client: any, data?: {});
    number_pool_id: any;
    add(tollfree: any): Promise<any>;
    remove(tollfree: any, unrent?: boolean): Promise<any>;
    list(params: any): Promise<any>;
    find(tollfree: any): Promise<any>;
}
/**
 * Represents a Powerpack interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PowerpackInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
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
   * @promise {object} return {@link Powerpack} object
   * @fail {Error} return Error
   */
    update(uuid: string, params: {
        name: string;
        sticky_sender: string;
        local_connect: string;
        application_type: string;
        application_id: string;
    }): Promise<any>;
}
import { PlivoResource } from "../base.js";
import { PlivoResourceInterface } from "../base.js";
