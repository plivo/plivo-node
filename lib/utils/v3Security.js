//@flow
const utf8 = require('utf8');
const buildUrl = require('build-url');
const base64 = require('base-64');
const qs = require('querystring');
import * as parser from 'uri-parser';
import crypto from 'crypto';
import _ from 'lodash';

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
        paramsString.push(key.toString() + '=' + value.toString());
      });
    } else {
      paramsString.push(key.toString() + '=' + val.toString());
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

function get_signature_v3(auth_token, base_url, nonce) {
  base_url = base_url + '.' + nonce;
  let hmac = crypto.createHmac('sha256', auth_token);
  let hmacBytes = base64.decode(hmac.update(base_url).digest('base64'));
  return base64.encode(hmacBytes);
}

export function validateV3Signature(method: string, uri: string,
                                    nonce: string, auth_token: string,
                                    v3_signature: string, params={}) {
  auth_token = utf8.encode(auth_token);
  nonce = utf8.encode(nonce);
  v3_signature = utf8.encode(v3_signature);
  uri = utf8.encode(uri);
  let base_url = uri;
  if (method === 'GET') {
    base_url = construct_get_url(uri, params);
  } else if (method === 'POST') {
    base_url = construct_post_url(uri, params);
  } else {
    throw new Error("Please provide authToken");
  }
  let signature = get_signature_v3(auth_token, base_url, nonce);
  let matched = false;
  _.split(v3_signature, ',').forEach(function (plivo_sign) {
    if (plivo_sign === signature) {
      matched = true;
    }
  });
  return matched;
}
