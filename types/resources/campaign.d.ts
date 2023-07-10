/**
 * Represents a Campaign
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Campaign extends PlivoResource {
    constructor(client: any, data?: {});
    id: unknown;
}
export class CampaignCreateResponse {
    constructor(params: any);
    apiId: any;
    campaignId: any;
    message: any;
    error: any;
}
export class LinkUnlinkNumberResponse {
    constructor(params: any);
    apiId: any;
    message: any;
    error: any;
    remark: any;
}
/**
 * Represents a Campaign Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CampaignInterface extends PlivoResource {
    constructor(client: any, data?: {});
    /**
     * get Campaign by given id
     * @method
     * @param {string} campaignID - id of Campaign
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
    get(campaignID: string): Promise<any>;
    /**
     * Get All Campaign Detail
     * @method
     * @param {object} params - params brand and usecase to get all campaign details.
     * @promise {object[]} returns list of campaign Object
     * @fail {Error} returns Error
     */
    list(params: object): Promise<any>;
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
     * @param {boolean} affiliate_marketing
     * @param {string} sample1
     * @param {string} sample2
     * @param {message_flow} message_flow
     * @param {help_message} help_message
     * @param {optout_message} optout_message
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    create(brand_id: string, campaign_alias: string, vertical: string, usecase: string, sub_usecases: list, description: string, embedded_link: boolean, embedded_phone: boolean, age_gated: boolean, direct_lending: boolean, subscriber_optin: boolean, subscriber_optout: boolean, subscriber_help: boolean, affiliate_marketing: boolean, sample1: string, sample2: string, message_flow: any, help_message: any, optout_message: any, params?: {}): Promise<any>;
    /**
    * update Campaign
    * @method
    * @param {string} campaign_id
    * @param {string} reseller_id
    * @param {string} description
    * @param {string} sample1
    * @param {string} sample2
    * @param {string} message_flow
    * @param {string} help_message
    * @param {string} optin_keywords
    * @param {string} optin_message
    * @param {string} optout_keywords
    * @param {string} optout_message
    * @param {string} help_keywords
    * @promise {object} return {@link PlivoGenericResponse} object
    * @fail {Error} return Error
    */
    update(campaign_id: string, reseller_id: string, description: string, sample1: string, sample2: string, message_flow: string, help_message: string, optin_keywords: string, optin_message: string, optout_keywords: string, optout_message: string, help_keywords: string, params?: {}): Promise<any>;
    /**
     * getNumber CampaignNumbers by given campaignId, number
     * @method
     * @param {string} campaignID - id of Campaign
     * @param {string} number - number
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
    getNumber(campaignID: string, number: string): Promise<any>;
    /**
     * listNumber CampaignNumbers by given campaignId
     * @method
     * @param {string} campaignID - id of Campaign
     * @param {number} limit
     * @param {number} offset
     * @promise {object} returns {@link Campaign} object
     * @fail {Error} return Error
     */
    listNumber(campaignID: string, params: any): Promise<any>;
    /**
     * linkNumber link number to Campaign
     * @method
     * @param {string} campaignID
     * @param {list} numbers
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
    linkNumber(campaignID: string, numbers: list, params?: {}): Promise<any>;
    /**
     * unlinkNumber unlink number from Campaign
     * @method
     * @param {string} campaignID
     * @param {string} number
     * @promise {object} return {@link Campaign} object
     * @fail {Error} return Error
     */
    unlinkNumber(campaignID: string, number: string, params?: {}): Promise<any>;
    /**
     * Delete Campaign
     * @method
     * @param {string} campaignID
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    deleteCampaign(campaignID: string): Promise<any>;
}
import { PlivoResource } from '../base';
