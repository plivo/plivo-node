//@flow
const utf8 = require('utf8');
const buildUrl = require('build-url');
const base64 = require('base-64');

import * as parser from 'uri-parser';

import _ from 'lodash';
import crypto from 'crypto';

export function computeOldSignature(authId, uri, params){
  const joinedParams = uri + _.join(_.map(_.sortBy(_.toPairs(params)), item => item[0] + item[1]), '');
  // console.log(joinedParams);
  return crypto.createHmac('sha1', authId).update(joinedParams).digest('base64');
}

export function verifyOldSignature(authId, uri, params, signature) {
  return computeOldSignature(authId, uri, params) === signature;
}

export function validateSignature(uri, nonce, signature, auth_token) {
  nonce = utf8.encode(nonce);
  signature = utf8.encode(signature);
  auth_token = utf8.encode(auth_token);
  uri = utf8.encode(uri);
  let parsed_uri = parser.parse(uri);
  let url_protocol = parsed_uri.protocol == '' ? 'http://' : parsed_uri.protocol+'://';
  let proxy = parsed_uri.port == '' ? parsed_uri.host : parsed_uri.host + ':' + parsed_uri.port;
  let base_url = buildUrl(url_protocol + proxy , { path: parsed_uri.path });
  let hmac = crypto.createHmac('sha256', auth_token);
  let hmacBytes = base64.decode(hmac.update(base_url+nonce).digest('base64'));
  let authentication_string = base64.encode(hmacBytes);
  return authentication_string == signature;
}
