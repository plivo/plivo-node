export class LOAResponse {
  constructor(params: object);

  apiId: string;
  loaId: string;
  alias: string;
  file: string;
  createdAt: string;
  linkedNumbers: Array<string>;
  resourceUri: string;
}

export class CreateLOAResponse {
  constructor(params: object);

  apiId: string;
  loaId: string;
  alias: string;
  file: string;
  createdAt: string;
  linkedNumbers: string[];
  resourceUri: string;
  message: string;
}

export class ListLOAResponse {
  constructor(params: object);

  apiId: string;
  meta: Object;
  objects: Array<Object>;
}

/**
 * Represents an LOA
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class LOA extends PlivoResource {
  constructor(client: Function, data?: {});

  id: string;

  /**
   * get LOA by given id
   * @method
   * @param {string} id - id of the LOA
   * @promise {object} return {@link LOA} object
   * @fail {Error} return Error
   */
  get(id: string): Promise<LOAResponse>;


  /**
   * list all LOA
   * @method
   * @param {object} params - params containing options to list loa by.
   */
  list(params: object): Promise<ListLOAResponse>;

  /**
   * Create an LOA
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.file] - File array of the files to be uploaded
   * @fail {Error} return Error
   */
  create(params: object): Promise<CreateLOAResponse>;

  /**
   * delete an LOA
   * @method
   * @param {string} id - id to delete
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */
  delete(): Promise<unknown>;

  [clientKey]: symbol;
}

/**
 * Represents an LOA Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class LOAInterface extends PlivoResourceInterface {
  constructor(client: Function, data?: {});

  /**
   * get LOA by given id
   * @method
   * @param {string} id - id of the LOA
   * @promise {object} return {@link LOA} object
   * @fail {Error} return Error
   */
  get(id: string): Promise<LOAResponse>;


  /**
   * list all LOA
   * @method
   * @param {object} params - params containing options to list loa by.
   */
  list(params: object): Promise<ListLOAResponse>;

  /**
   * Create an LOA
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.file] - File array of the files to be uploaded
   * @fail {Error} return Error
   */
  create(params: object): Promise<CreateLOAResponse>;

  /**
   * delete an LOA
   * @method
   * @param {string} id - id to delete
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */
  delete(id: string): any;

  [clientKey]: symbol;
}

import {PlivoResource} from "../base";

declare const clientKey: unique symbol;
import {PlivoResourceInterface} from "../base";

export {};
