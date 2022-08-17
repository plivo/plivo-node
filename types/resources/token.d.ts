export class CreateTokenResponse {
	constructor(params: object);
	apiId: string;
	token: string;
}
/**
 * Represents a Token Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of token
 */
 export class TokenInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
	/**
	 * Get Token Detail
	 * @method
	 * @promise {object} returns Call Object
	 * @fail {Error} returns Error
	 */
     create( iss: string, sub: string, nbf: number, exp: number, incoming_allow: boolean, outgoing_allow: boolean, app: string, params ? : {}): Promise < CreateTokenResponse > ;
     /**
      * Create a token
      * @method
      * @promise {object} returns PlivoGenericResponse Object
      * @fail {Error} returns Error
      */
 }
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
