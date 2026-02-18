/**
 * Represents a Campaign
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Campaign extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    [clientKey]: symbol;
}

export class CampaignCreateResponse {
    constructor(params: object);
    apiId: string;
    campaignId: string;
    message: string;
    error?: string;
}

export class LinkUnlinkNumberResponse {
    constructor(params: object);
    apiId: string;
    message?: string;
    error?: string;
    remark?: string;
}

/**
 * Represents a Campaign Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CampaignInterface extends PlivoResource {
    constructor(client: Function, data?: {});
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
     * @param {object} params - params brand_id, usecase, campaign_source to get all campaign details.
     * @promise {object[]} returns list of campaign Object
     * @fail {Error} returns Error
     */
    list(params?: {}): Promise<any>;

    /**
     * create Campaign
     * @method
     * @param {string} brand_id
     * @param {string} campaign_alias
     * @param {string} vertical
     * @param {string} usecase
     * @param {array} sub_usecases
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
     * @param {string} sample3
     * @param {string} sample4
     * @param {string} sample5
     * @param {string} message_flow
     * @param {string} help_message
     * @param {string} optout_message
     * @param {string} terms_and_conditions_link
     * @param {string} privacy_policy_link
     * @param {object} params - additional params
     * @promise {object} return {@link CampaignCreateResponse} object
     * @fail {Error} return Error
     */
    create(
        brand_id: string,
        campaign_alias: string,
        vertical: string,
        usecase: string,
        sub_usecases: any[],
        description: string,
        embedded_link: boolean,
        embedded_phone: boolean,
        age_gated: boolean,
        direct_lending: boolean,
        subscriber_optin: boolean,
        subscriber_optout: boolean,
        subscriber_help: boolean,
        affiliate_marketing: boolean,
        sample1: string,
        sample2: string,
        sample3: string,
        sample4: string,
        sample5: string,
        message_flow: string,
        help_message: string,
        optout_message: string,
        terms_and_conditions_link: string,
        privacy_policy_link: string,
        params?: {}
    ): Promise<CampaignCreateResponse>;

    /**
     * import Campaign
     * @method
     * @param {string} campaign_id
     * @param {string} campaign_alias
     * @param {object} params - additional params
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    import_campaign(
        campaign_id: string,
        campaign_alias: string,
        params?: {}
    ): Promise<any>;

    /**
     * update Campaign
     * @method
     * @param {string} campaign_id
     * @param {string} reseller_id
     * @param {string} description
     * @param {string} sample1
     * @param {string} sample2
     * @param {string} sample3
     * @param {string} sample4
     * @param {string} sample5
     * @param {string} message_flow
     * @param {string} help_message
     * @param {string} optin_keywords
     * @param {string} optin_message
     * @param {string} optout_keywords
     * @param {string} optout_message
     * @param {string} help_keywords
     * @param {string} terms_and_conditions_link
     * @param {string} privacy_policy_link
     * @param {object} params - additional params
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    update(
        campaign_id: string,
        reseller_id: string,
        description: string,
        sample1: string,
        sample2: string,
        sample3: string,
        sample4: string,
        sample5: string,
        message_flow: string,
        help_message: string,
        optin_keywords: string,
        optin_message: string,
        optout_keywords: string,
        optout_message: string,
        help_keywords: string,
        terms_and_conditions_link: string,
        privacy_policy_link: string,
        params?: {}
    ): Promise<any>;

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
     * @param {object} params - limit and offset
     * @promise {object} returns {@link Campaign} object
     * @fail {Error} return Error
     */
    listNumber(campaignID: string, params?: {}): Promise<any>;

    /**
     * linkNumber link number to Campaign
     * @method
     * @param {string} campaignID
     * @param {array} numbers
     * @param {object} params - additional params
     * @promise {object} return {@link LinkUnlinkNumberResponse} object
     * @fail {Error} return Error
     */
    linkNumber(
        campaignID: string,
        numbers: any[],
        params?: {}
    ): Promise<LinkUnlinkNumberResponse>;

    /**
     * unlinkNumber unlink number from Campaign
     * @method
     * @param {string} campaignID
     * @param {string} number
     * @param {object} params - additional params
     * @promise {object} return {@link LinkUnlinkNumberResponse} object
     * @fail {Error} return Error
     */
    unlinkNumber(
        campaignID: string,
        number: string,
        params?: {}
    ): Promise<LinkUnlinkNumberResponse>;

    /**
     * Delete Campaign
     * @method
     * @param {string} campaignID
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    deleteCampaign(campaignID: string): Promise<any>;
    [clientKey]: symbol;
}

import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
export {};

