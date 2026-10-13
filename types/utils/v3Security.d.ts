export function validateV3Signature(method:string, uri: string, nonce: string, auth_token: string, v3_signature: string, params?: {}): boolean;
export function validateV3SignatureScoped(method:string, uri: string, nonce: string, scoped_token: string, v3_signature: string, params?: {}): boolean;
export function deriveSigningKey(token: string): Buffer;
