export function computeOldSignature(authId: string, uri: string, params: {
    [string]: string;
}): string;
export function verifyOldSignature(authId: string, uri: string, params: {
    [string]: string;
}, signature: string): boolean;
export function validateSignature(uri: string, nonce: string, signature: string, auth_token: string): boolean;
