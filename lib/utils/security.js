//@flow
const utf8 = require('utf8');
const buildUrl = require('build-url');
const base64 = require('base-64');
import * as parser from 'uri-parser';
import crypto from 'crypto';
import _ from 'lodash';

export function computeOldSignature(authId: string, uri: string, params: {[string]: string}): string {
  const joinedParams = uri + _.join(_.map(_.sortBy(_.toPairs(params)), item => item[0] + item[1]), '');
  console.log(joinedParams);
  return crypto.createHmac('sha1', authId).update(joinedParams).digest('base64');
}

export function verifyOldSignature(authId: string, uri: string, params: {[string]: string}, signature: string): boolean {
  return computeOldSignature(authId, uri, params) === signature;
}

export function validateSignature(uri: string, nonce: string, signature: string, auth_token: string) {
  nonce = utf8.encode(nonce);
  signature = utf8.encode(signature);
  auth_token = utf8.encode(auth_token);
  uri = utf8.encode(uri);
  let parsed_uri = parser.parse(uri);
  let url_protocol = parsed_uri.protocol == '' ? 'http://' : parsed_uri.protocol+'://';
  let base_url = buildUrl(url_protocol+parsed_uri.host, { path: parsed_uri.path });
  let hmac = crypto.createHmac('sha256', auth_token);
  let hmacBytes = base64.decode(hmac.update(base_url+nonce).digest('base64'));
  let authentication_string = base64.encode(hmacBytes);
  return authentication_string == signature;
}
