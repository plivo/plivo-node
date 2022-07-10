import * as _ from "lodash";

const clientKey = Symbol();
const action = 'Token/';

/**
 * Represents a Token
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of Token
 */

 export class CreateToken {
    constructor(params) {
        params = params || {};
        this.iss = params.iss;
        this.sub = params.sub;
        this.nbf = params.nbf;
        this.exp = params.exp;
        this.incoming_allowed = params.incoming_allowed;
        this.outgoing_allowed = params.outgoing_allowed;
        this.app = params.app;
    }
}
    /**
     * Create a call
     * @method
     * @param {string} iss 
     * @param {string} sub 
     * @param {string} nbf 
     * @param {string} exp
     * @param {Boolean} incoming_allowed 
     * @param {Boolean} outgoing_allowed 
     * @param {string} app  
     */

    create(iss, sub, nbf, exp,incoming_allowed,outgoing_allowed,app,params = {}) {
        if( iss != '')
        {
            if (incoming_allowed && sub !== '') {
                params.iss = iss;
                params.sub = sub;
                params.nbf = nbf;
                params.exp = exp;
                params.incoming_allowed = incoming_allowed;
                params.outgoing_allowed = outgoing_allowed;
                params.app = app;

                let client = this[clientKey];
                return new Promise((resolve, reject) => {
                client('POST', action, params)
                    .then(response => {
                        resolve(new CreateCallResponse(response.body, idField));
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
            }
            else {
            return new Promise((resolve, reject) => {
                    reject('Invalid Sub');
                }
                ); 
            }
        }
        else {
            return new Promise((resolve, reject) => {
                    reject('Invalid Iss');
                }
                ); 
        }

    }