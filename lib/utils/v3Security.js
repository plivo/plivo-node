//@flow
const utf8 = require('utf8');
const buildUrl = require('build-url');
const qs = require('querystring');

import * as parser from 'uri-parser';

import _ from 'lodash';
import crypto from 'crypto';

function get_map_from_query(params1, params2) {
  let params = {};
  Object.keys(params1).forEach(function (key) {
    let val = params1[key];
    if (val instanceof Array) {
      params[key] = val
    } else {
      params[key] = [val]
    }
  });
  Object.keys(params2).forEach(function (key) {
    let val = params2[key];
    if (!(val instanceof Array)) {
      val = [val];
    }
    if (key in params) {
      params[key] = params[key].concat(val)
    } else {
      params[key] = val
    }
  });
  return params;
}

function get_sorted_query_string(params) {
  let query_string = [];
  Object.keys(params).sort().forEach(function (key) {
    let val = params[key];
    val.sort().forEach(function (value) {
      query_string.push(key.toString() + '=' + value.toString());
    });
  });
  return query_string.join('&');
}

function get_sorted_params_string(params) {
  let paramsString = [];
  Object.keys(params).sort().forEach(function (key) {
    let val = params[key];
    if (val instanceof Array) {
      val.sort().forEach(function (value) {
        paramsString.push(key.toString() + value.toString());
      });
    } else {
      paramsString.push(key.toString() + val.toString());
    }
  });
  return paramsString.join('')
}

function construct_get_url(uri, params, empty_post_params=true) {
  let parsed_uri = parser.parse(uri);
  let url_protocol = parsed_uri.protocol === '' ? 'http://' : parsed_uri.protocol+'://';
  let proxy = parsed_uri.port === '' ? parsed_uri.host : parsed_uri.host + ':' + parsed_uri.port;
  let base_url = buildUrl(url_protocol + proxy , { path: parsed_uri.path });
  params = get_map_from_query(qs.parse(parsed_uri.query), params);
  let query_params = get_sorted_query_string(params);
  if (query_params.length > 0 || !empty_post_params) {
    base_url = base_url + '?' + query_params;
  }
  if (query_params.length > 0 && !empty_post_params) {
    base_url = base_url + '.';
  }
  return base_url;
}

function construct_post_url(uri, params) {
  let base_url = construct_get_url(uri, {}, _.isEmpty(params));
  return base_url + get_sorted_params_string(params);
}

function build_v3_message(method, uri, nonce, params) {
  nonce = utf8.encode(nonce);
  uri = utf8.encode(uri);
  let base_url = uri;
  if (method === 'GET') {
    base_url = construct_get_url(uri, params);
  } else if (method === 'POST') {
    base_url = construct_post_url(uri, params);
  } else {
    throw new Error("Please provide authToken");
  }
  return base_url + '.' + nonce;
}

export function validateV3Signature(method, uri,
                                    nonce, auth_token,
                                    v3_signature, params={}) {
  auth_token = utf8.encode(auth_token);
  v3_signature = utf8.encode(v3_signature);
  let message = build_v3_message(method, uri, nonce, params);
  let signature = crypto.createHmac('sha256', auth_token).update(message).digest('base64');
  let matched = false;
  _.split(v3_signature, ',').forEach(function (plivo_sign) {
    if (plivo_sign === signature) {
      matched = true;
    }
  });
  return matched;
}

export function deriveSigningKey(token) {
  let prk = crypto.createHmac('sha256', Buffer.from('plivo-scoped-token-v1', 'utf8'))
    .update(Buffer.from(token, 'utf8')).digest();
  return crypto.createHmac('sha256', prk)
    .update(Buffer.concat([Buffer.from('plivo-webhook-signing-v1', 'utf8'), Buffer.from([1])])).digest();
}

export function validateV3SignatureScoped(method, uri,
                                          nonce, scoped_token,
                                          v3_signature, params={}) {
  let message = build_v3_message(method, uri, nonce, params);
  let expected = Buffer.from(crypto.createHmac('sha256', deriveSigningKey(scoped_token)).update(message).digest('base64'));
  return String(v3_signature).split(',').some(function (plivo_sign) {
    let given = Buffer.from(plivo_sign);
    return given.length === expected.length && crypto.timingSafeEqual(given, expected);
  });
}
