import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = '10dlc/Campaign/';
const idField = 'brandID';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');



/**
 * Represents a Campaign
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
 export class Campaign extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Campaign, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;
        if (idField in data) {
            this.id = data[idField];
        };

        extend(this, data);
    }
}

export class CampaignCreateResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.campaignId = params.campaignId;
        this.message = params.message;
        this.error = params.error;
    }
}

export class LinkUnlinkNumberResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        if (params.message)
            this.message = params.message;
        if (params.error)
            this.error = params.error;
        if (params.remark)
            this.remark = params.remark;
    }
}

/**
 * Represents a Campaign Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
 export class CampaignInterface extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Campaign, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = Campaign;
        this[idKey] = idField;
    }

    /**
     * get Campaign by given id
     * @method
     * @param {string} campaignID - id of Campaign
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
     get(campaignID) {
        let params = {};
        return super.customexecuteAction(action+campaignID+'/', 'GET', params);
    }

    /**
     * Get All Campaign Detail
     * @method
     * @param {object} params - params brand and usecase to get all campaign details.
     * @promise {object[]} returns list of campaign Object
     * @fail {Error} returns Error
     */
     list(params) {
        return super.customexecuteAction(action,'GET', params);
    }

    /**
     * create Campaign
     * @method
     * @param {string} brand_id 
     * @param {string} campaign_alias 
     * @param {string} vertical 
     * @param {string} usecase 
     * @param {list} sub_usecases 
     * @param {string} description  
     * @param {boolean} embedded_link 
     * @param {boolean} embedded_phone 
     * @param {boolean} age_gated 
     * @param {boolean} direct_lending 
     * @param {boolean} subscriber_optin 
     * @param {boolean} subscriber_optout 
     * @param {boolean} subscriber_help 
     * @param {string} sample1 
     * @param {string} sample2 
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
     create(brand_id,campaign_alias,vertical,usecase,sub_usecases,description,embedded_link,embedded_phone,age_gated,direct_lending,subscriber_optin,subscriber_optout,subscriber_help,sample1,sample2, params = {}) {
        params.brand_id=brand_id;
        params.campaign_alias=campaign_alias;
        params.vertical=vertical;
        params.usecase=usecase;
        params.sub_usecases=sub_usecases;
        params.description=description;
        params.embedded_link=embedded_link;
        params.embedded_phone=embedded_phone;
        params.age_gated=age_gated;
        params.direct_lending=direct_lending;
        params.subscriber_optin=subscriber_optin;
        params.subscriber_optout=subscriber_optout;
        params.subscriber_help=subscriber_help;
        params.sample1=sample1;
        params.sample2=sample2;
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CampaignCreateResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * getNumber CampaignNumbers by given campaignId, number
     * @method
     * @param {string} campaignID - id of Campaign
     * @param {string} number - number
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
     getNumber(campaignID, number) {
        return super.customexecuteAction(action+campaignID+'/Number/'+number+'/', 'GET');
    }

    /**
     * listNumber CampaignNumbers by given campaignId
     * @method
     * @param {string} campaignID - id of Campaign
     * @param {number} limit
     * @param {number} offset
     * @promise {object} returns {@link Campaign} object
     * @fail {Error} return Error
     */
     listNumber(campaignID, params) {
        return super.customexecuteAction(action+campaignID+'/Number/', 'GET', params);
    }

    /**
     * linkNumber link number to Campaign
     * @method
     * @param {string} campaignID 
     * @param {list} numbers
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
     linkNumber(campaignID, numbers, params = {}) {
        params.numbers=numbers;
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action+campaignID+'/Number/', params)
                .then(response => {
                    resolve(new LinkUnlinkNumberResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * unlinkNumber unlink number from Campaign
     * @method
     * @param {string} campaignID 
     * @param {string} number
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
     unlinkNumber(campaignID, number, params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('DELETE', action+campaignID+'/Number/'+number+'/', params)
                .then(response => {
                    resolve(new LinkUnlinkNumberResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}