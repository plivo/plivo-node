export function AccessToken(authid: string, authToken: string, username: string, validityOptions?: {}, uid?: any): void;
export class AccessToken {
    constructor(authId: string, authToken: string, username: string, validityOptions?: {}, uid?: any);
    authId: string;
    key: string;
    username: string;
    validFrom: string;
    lifetime: string;
    uid: string;
}
export function addVoiceGrants(incoming?: boolean, outgoing?: boolean): void;
export class addVoiceGrants {
    constructor(incoming?: boolean, outgoing?: boolean);
    grants: {
        voice: {
            incoming_allow: boolean;
            outgoing_allow: boolean;
        };
    };
}
export function toJwt(): any;
