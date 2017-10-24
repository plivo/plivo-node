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

  return (method, action, params) => {
    var options = {
      url: config.url + '/' + action,
      method: method,
      formData: params || '',
      headers: headers,
      json: true
    };

    if (method === 'GET' && options.formData !== '') {
      let query = '?' + queryString.stringify(params);
      options.url += query;
    }

    if (typeof config.proxy !== 'undefined') {
      options.proxy = config.proxy;
    }

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }

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
          resolve({response: response, body: body});
        }
      });
    });
  };
}
