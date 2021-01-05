export function computeOldSignature(authid: string, uri: string, params: object): boolean;
export function verifyOldSignature(authid: string, uri: string, params: object, signature: string): boolean;
export function validateSignature(uri: string, nonce: string, signature: string, auth_token: string): boolean;
