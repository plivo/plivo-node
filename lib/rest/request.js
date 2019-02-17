import request from 'request';
import queryString from 'querystring';
import * as Exceptions from '../utils/exceptions';
import * as _ from "lodash";

export function Request(config) {
  let auth = 'Basic ' + new Buffer(config.authId + ':' + config.authToken)
    .toString('base64');

  let headers = {
    Authorization: auth,
    'User-Agent': config.userAgent,
    'Content-Type': 'application/json'
  };

  //Here config is an optional parameter can have following keys
  // isMultipart, saying if request to be made is multipart
  return (method, action, params, requestConfig) => {

    // Build copy of original headers
    var currentHeaders = JSON.parse(JSON.stringify(headers));

    console.log('at requset =>', method, action, params, requestConfig);
    if (requestConfig && requestConfig.isMultipart == true) {
      currentHeaders['Content-Type'] = 'multipart/form-data';
      // If file provided, read the file
      if (params.file) {
        params.file = require('fs').createReadStream(params.file);
        for (var key in params) {
          if (params[key] === undefined || params[key] == null) {
            params[key] = '';
          }
        }
      }
    }

    var options = {
      url: config.url + '/' + action,
      method: method,
      formData: params || '',
      headers: currentHeaders,
      json: true
    };

    if (method === 'GET' && options.formData !== '') {
      let query = '?' + queryString.stringify(params);
      options.url += query;
    }

    if (typeof config.proxy !== 'undefined') {
      options.proxy = config.proxy;
    }

    if (typeof config.timeout !== 'undefined') {
      options.timeout = config.timeout;
    }
    console.log('==> dummy data', action, method);
    return new Promise((resolve, reject) => {
      console.log('request options', options);
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        console.log('Response =>', response.statusCode, body);
        const exceptionClass = {
          400: Exceptions.InvalidRequestError,
          401: Exceptions.AuthenticationError,
          404: Exceptions.ResourceNotFoundError,
          405: Exceptions.InvalidRequestError,
          500: Exceptions.ServerError,
        }[response.statusCode] || Error;

        if (!_.inRange(response.statusCode, 200, 300)) {
          body = body || response.body;
          if (typeof body === 'object') {
            reject(new exceptionClass(JSON.stringify(body)));
          } else {
            reject(new exceptionClass(body));
          }
        } else {
          let body = response.body;
          resolve({ response: response, body: body });
        }
      });
    });
  };
}
