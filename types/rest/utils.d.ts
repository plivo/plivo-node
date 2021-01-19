export function camelCaseRequestWrapper(requestFunc: any): (method: string, action: string, params: object) => any;
export function validateSpeakAttributes(content: any, voice: any): {
    success: boolean;
    msg?: undefined;
} | {
    success: boolean;
    msg: string;
};
