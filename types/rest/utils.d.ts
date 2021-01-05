export function camelCaseRequestWrapper(requestFunc: any): (method: any, action: any, params: object) => any;
export function validateSpeakAttributes(content: any, voice: any): {
    success: boolean;
    msg?: undefined;
} | {
    success: boolean;
    msg: string;
};
