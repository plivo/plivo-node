import axios from 'axios';
import queryString from 'querystring';
import * as Exceptions from '../utils/exceptions';
import * as _ from "lodash";

export function Axios(config) {
  let auth = 'Basic ' + new Buffer(config.authId + ':' + config.authToken)
    .toString('base64');

  let headers = {
    Authorization: auth,
    'User-Agent': config.userAgent,
    'Content-Type': 'application/json'
  };

  const retryWrapper = (axios, options) => {
    const max_time = options.retryTime;
    let counter = 0;
    axios.interceptors.response.use(null, (error) => {
      const config = error.config;
      if (counter < max_time && error.response.status >= 500) {
        counter++;
        config.url = options.urls[counter] + options.authId + '/' + options.action;
        return new Promise((resolve) => {
          resolve(axios(config));
        })
      }
      return Promise.reject(error)
    })
  }

  return (method, action, params) => {
    let configuration = config;
    // Add support fot multipart requests.
    if (typeof (params) != 'undefined' && params.multipart == true) {
      return new Promise((resolve, reject) => {
        delete params.multipart;

        var FormData = require('form-data');
        var multipartParams = new FormData();

        for(const key in params) {
          if (key != 'file') {
            multipartParams.append(key, params[key]);
          } else {
            multipartParams.append(key, require('fs').createReadStream(params[key]));
          }
        }

        let headers = multipartParams.getHeaders();

        var config = {
          method: method,
          url: configuration.url + '/' + action,
          headers: {
            'Authorization': 'Basic ' + new Buffer(configuration.authId + ':' + configuration.authToken).toString('base64'),
            'User-Agent': configuration.userAgent,
            'content-type': headers['content-type']
          },
          data : multipartParams
        };

        axios(config).then(response => {
          const exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            500: Exceptions.ServerError,
          } [response.status] || Error;

          if (!_.inRange(response.status, 200, 300)) {
            let body = response.data;
            if (typeof body === 'object') {
              reject(new exceptionClass(JSON.stringify(body)));
            }
            else {
              reject(new exceptionClass(body));
            }
          }
          resolve({
            response: response,
            body: response.data
          });
        })
        .catch(function (error) {
          reject(error.stack+ "\r\n" + JSON.stringify(error.response.data));
        });
      })
    }

    if (typeof (params) != 'undefined' && typeof (params.file) != 'undefined') {
      let files = [];
      if (Array.isArray(params.file)) {
        for (let index = 0; index < params.file.length; index++) {
          files[index] = require('fs').createReadStream(params.file[index]);
        }
      } else {
        files[0] = require('fs').createReadStream(params.file);
      }
      params.file = files;
    }

    let options = {
      url: config.url + '/' + action,
      method: method,
      data: params || '',
      headers: headers,
      json: true
    };
    let apiVoiceUris = ['https://voice.plivo.com/v1/Account/','https://voice-usw1.plivo.com/v1/Account/','https://voice-use1.plivo.com/v1/Account/'];
    let isVoiceReq = false;
    if (params) {
      if (params.hasOwnProperty('is_call_insights_request')) {
        options.url = params.call_insights_base_url + params.call_insights_request_path;
        delete params.is_call_insights_request;
        delete params.call_insights_base_url;
        delete params.call_insights_request_path;
        delete options.data;
        options.json = params;
      }
      else if (params.hasOwnProperty('is_voice_request')){
        options.url = apiVoiceUris[0] + config.authId + '/' + action;
        delete params.is_voice_request;
        isVoiceReq = true;
      } else if (params.hasOwnProperty('override_url')) {
        // currently used by Lookup API but is generic enough to be used
        // by any product in future.
        options.url = params.override_url;
        delete params.override_url;
      }
    }

    if (method === 'GET' && options.data !== '') {
      let query = '?' + queryString.stringify(params);
      options.url += query;
    }

    if (typeof config.proxy !== 'undefined') {
      options.proxy = config.proxy;
    }

    if (typeof config.timeout !== 'undefined') {
      options.timeout = config.timeout;
    }

    return new Promise((resolve, reject) => {
      if (isVoiceReq) {
        retryWrapper(axios, {retryTime: 2, urls: apiVoiceUris, authId: config.authId, action: action});
          options.url = apiVoiceUris[0] + config.authId + '/' + action;
          axios(options).then(response => {
            const exceptionClass = {
              400: Exceptions.InvalidRequestError,
              401: Exceptions.AuthenticationError,
              404: Exceptions.ResourceNotFoundError,
              405: Exceptions.InvalidRequestError,
              500: Exceptions.ServerError,
            } [response.status] || Error;

            if (!_.inRange(response.status, 200, 300)) {
              let body = response.data;
              if (typeof body === 'object') {
                reject(new exceptionClass(JSON.stringify(body)));
              }
              else {
                reject(new exceptionClass(body));
              }
            }
            resolve({
              response: response,
              body: response.data
            });
          })
          .catch(function (error) {
            reject(error.stack+ "\r\n" + JSON.stringify(error.response.data));
          })
      }
      else {
        axios(options).then(response => {
          const exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            500: Exceptions.ServerError,
          } [response.status] || Error;

          if (!_.inRange(response.status, 200, 300)) {
            let body = response.data;
            if (typeof body === 'object') {
              reject(new exceptionClass(JSON.stringify(body)));
            }
            else {
              reject(new exceptionClass(body));
            }
          }
          else {
            let body = response.data;
            let isObj = typeof _body === 'object' && _body !== null && !(_body instanceof Array) && !(_body instanceof Date)
            if (isObj) {
              _body['statusCode'] = response.status;
            }
            resolve({
              response: response,
              body: body
            });
          }
        })
        .catch(function (error) {
          const exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            500: Exceptions.ServerError,
          } [error.response.status] || Error;
          if (!_.inRange(error.response.status, 200, 300)) {
            let body = error.response.data;
            if (typeof body === 'object') {
              reject(new exceptionClass(error));
            }
          }
          reject(error.stack + '\n' + JSON.stringify(error.response.data));
        })
      }
    });
  };
}
