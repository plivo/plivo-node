export class HostedMessagingNumberResponse {
  constructor(params: object);

  apiId: string;
  loaId: string;
  alias: string;
  file: string;
  createdAt: string;
  linkedNumbers: Array<string>;
  resourceUri:string;
}

export class CreateHostedMessagingNumberResponse {
  constructor(params: object);

  apiId: string;
  loaId: string;
  alias: string;
  file: string;
  createdAt: string;
  linkedNumbers: string[];
  resourceUri:string;
  message:string;
}

export class ListHostedMessagingNumberResponse {
  constructor(params: object);

  apiId: string;
  meta: Object;
  objects: Array<Object>;
}

/**
 * Represents a HostedMessagingNumber
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class HostedMessagingNumber extends PlivoResource {
  constructor(client: Function, data?: {});

  id: string;

  /**
   * get HostedMessagingNumber by given id
   * @method
   * @param {string} id - id of the document
   * @promise {object} return {@link HostedMessagingNumber} object
   * @fail {Error} return Error
   */
  get(id: string): Promise<HostedMessagingNumberResponse>;

  /**
   * list all HostedMessagingNumber
   * @method
   * @param {object} params - params containing options to list HostedMessagingNumber by.
   * @param {string} [params.alias] - Alias
   * @param {string} [params.hostedStatus] - Hosted Status
   * @param {string} [params.number] - Phone Number
   * @param {string} [params.loaId] - LOA ID
   */
  list(params: object): Promise<ListHostedMessagingNumberResponse>;

  /**
   * Create a HostedMessagingNumber
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.file] - File to be uploaded
   * @fail {Error} return Error
   */
  create(params: object): Promise<CreateHostedMessagingNumberResponse>;

  [clientKey]: symbol;
}

/**
 * Represents a HostedMessagingNumber Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class HostedMessagingNumberInterface extends PlivoResourceInterface {
  constructor(client: Function, data?: {});

  /**
   * get HostedMessagingNumber by given id
   * @method
   * @param {string} id - id of the document
   * @promise {object} return {@link HostedMessagingNumber} object
   * @fail {Error} return Error
   */
  get(id: string): Promise<HostedMessagingNumberResponse>;


  /**
   * list all HostedMessagingNumber
   * @method
   * @param {object} params - params containing options to list HostedMessagingNumber by.
   * @param {string} [params.alias] - Alias
   * @param {string} [params.hostedStatus] - Hosted Status
   * @param {string} [params.number] - Phone Number
   * @param {string} [params.loaId] - LOA ID
   */
  list(params: object): Promise<ListHostedMessagingNumberResponse>;

  /**
   * Create a HostedMessagingNumber
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.file] - File to be uploaded
   * @fail {Error} return Error
   */
  create(params: object): Promise<CreateHostedMessagingNumberResponse>;

  [clientKey]: symbol;
}

import {PlivoResource} from "../base";

declare const clientKey: unique symbol;
import {PlivoResourceInterface} from "../base";

export {};
