import * as Exceptions from '../utils/exceptions';
import * as _ from "lodash";

// Use require() for axios CommonJS build to ensure compatibility with Node.js v11+
// axios v1.x's main entry (index.js) uses ES modules which Node.js v11 doesn't support
// We need to use the CommonJS build directly: axios/dist/node/axios.cjs
// This file is pre-compiled CommonJS and works on all Node.js versions
const axios = require('axios/dist/node/axios.cjs');
import queryString from 'querystring';
import http from 'http';
import https from 'https';

var HttpsProxyAgent = require('https-proxy-agent');

const httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100,         // Maximum sockets per host - requests queue when limit reached
  maxFreeSockets: 20,      // Maximum free sockets per host (increased proportionally)
  timeout: 60000,          // Socket timeout - requests fail if this timeout is reached
  freeSocketTimeout: 30000 // Free socket timeout
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 100,         // Requests queue when limit reached, don't fail immediately
  maxFreeSockets: 20,      // Increased proportionally with maxSockets
  timeout: 60000,          // Only fail if timeout reached while waiting for socket
  freeSocketTimeout: 30000
});

// Set default agents for axios
axios.defaults.httpAgent = httpAgent;
axios.defaults.httpsAgent = httpsAgent;

export function Axios(config) {
  let auth = 'Basic ' + new Buffer(config.authId + ':' + config.authToken)
    .toString('base64');

  let headers = {
    Authorization: auth,
    'User-Agent': config.userAgent,
    'Content-Type': 'application/json'
  };

  const isGeoPermissionError = (response) => {
    let code = response.status;
    let url = response.config.url;
    let method = response.config.method;
    const GeoPermissionEndpoints = ['/Message/', '/Call/', '/Session/']
    return code == 403 && method.toLowerCase() == "post" && GeoPermissionEndpoints.some(endpoint => url.endsWith(endpoint))
  }

  const retryWrapper = (axiosInstance, options) => {
    const max_time = options.retryTime;
    let counter = 0;

    // Create a dedicated axios instance for this request to avoid global interceptor pollution
    const requestAxios = axios.create({
      httpAgent: axiosInstance.defaults.httpAgent,
      httpsAgent: axiosInstance.defaults.httpsAgent,
      timeout: axiosInstance.defaults.timeout
    });

    // Add interceptor with proper cleanup
    const interceptorId = requestAxios.interceptors.response.use(null, (error) => {
      const config = error.config;
      if (counter < max_time && error.response && error.response.status >= 500) {
        counter++;
        config.url = options.urls[counter] + options.authId + '/' + options.action;
        return new Promise((resolve) => {
          resolve(requestAxios(config));
        });
      }
      return Promise.reject(error);
    });

    return {
      axios: requestAxios,
      cleanup: () => {
        // Clean up the interceptor when done
        requestAxios.interceptors.response.eject(interceptorId);
      }
    };
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
            // In case files are in array
            if (Array.isArray(params.file)) {
              for (let index = 0; index < params.file.length; index++) {
                multipartParams.append(key, require('fs').createReadStream(params.file[index]));
              }
            }else{
              multipartParams.append(key, require('fs').createReadStream(params[key]));
            }
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
          var exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            406: Exceptions.NotAcceptableError,
            500: Exceptions.ServerError,
          } [response.status] || Error;

          if (isGeoPermissionError(response)) {
            exceptionClass = Exceptions.GeoPermissionError
          }

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
          //client side exception like file not found case
          if (error.response == undefined){
           return reject(error.stack );
          }
          var exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            406: Exceptions.NotAcceptableError,
            500: Exceptions.ServerError,
          } [error.response.status] || Error;

          if (isGeoPermissionError(error.response)) {
            exceptionClass = Exceptions.GeoPermissionError
          }

          if (!_.inRange(error.response.status, 200, 300)) {
            let body = error.response.data;
            if (typeof body === 'object') {
              reject(new exceptionClass(error));
            }  else {
              if (error.response.status >= 500) {
                reject(new Exceptions.ServerError(error));
              }
              reject(new exceptionClass(error));
            }
          }
          reject(error.stack + '\n' + JSON.stringify(error.response.data));
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
    let apiVoiceUris = ['https://api.plivo.com/v1/Account/','https://api.plivo.com/v1/Account/','https://api.plivo.com/v1/Account/'];
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

    if (method === 'GET' && options.data !== '' && (!isVoiceReq)) {
      let query = '?' + queryString.stringify(params);
      options.url += query;
      delete options.data
    }

    if (typeof config.proxy !== 'undefined') {
      // Create proxy agent with connection pooling settings
      options.httpsAgent = new HttpsProxyAgent(config.proxy, {
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 100,         // Match the main configuration
        maxFreeSockets: 20,      // Match the main configuration
        timeout: 60000,
        freeSocketTimeout: 30000
      });
    }

    if (typeof config.timeout !== 'undefined') {
      options.timeout = config.timeout;
    }
    else if(typeof config.timeout === 'undefined' && isVoiceReq ){
      options.timeout = 5000;
    }

    return new Promise((resolve, reject) => {
      if (isVoiceReq) {
        // Set up retry wrapper with proper cleanup
        const retrySetup = retryWrapper(axios, {retryTime: 2, urls: apiVoiceUris, authId: config.authId, action: action});
        const retryAxios = retrySetup.axios;

        options.url = apiVoiceUris[0] + config.authId + '/' + action;
        if (method === 'GET' && options.data !== '') {
          let query = '?' + queryString.stringify(params);
          options.url += query;
          delete options.data
        }

        retryAxios(options).then(response => {
          var exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            406: Exceptions.NotAcceptableError,
            500: Exceptions.ServerError,
            409: Exceptions.InvalidRequestError,
            422: Exceptions.InvalidRequestError,
            207: Exceptions.InvalidRequestError,
          } [response.status] || Error;

          if (isGeoPermissionError(response)) {
            exceptionClass = Exceptions.GeoPermissionError
          }

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
          if (error.response == undefined){
            return reject(error.stack );
          }
          var exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            406: Exceptions.NotAcceptableError,
            500: Exceptions.ServerError,
            409: Exceptions.InvalidRequestError,
            422: Exceptions.InvalidRequestError,
            207: Exceptions.InvalidRequestError,
          } [error.response.status] || Error;

          if (isGeoPermissionError(error.response)) {
            exceptionClass = Exceptions.GeoPermissionError
          }

          if (!_.inRange(error.response.status, 200, 300)) {
            let body = error.response.data;
            if (typeof body === 'object') {
              reject(new exceptionClass(error));
            }  else {
              if (error.response.status >= 500) {
                reject(new Exceptions.ServerError(error));
              }
              reject(new exceptionClass(error));
            }
          }
          reject(error.stack + '\n' + JSON.stringify(error.response.data));
        })
        .finally(() => {
          // Clean up interceptors in all cases - success, error, or unexpected exception
          retrySetup.cleanup();
        })
      }
      else {
        axios(options).then(response => {
          var exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            406: Exceptions.NotAcceptableError,
            500: Exceptions.ServerError,
            409: Exceptions.InvalidRequestError,
            422: Exceptions.InvalidRequestError,
            207: Exceptions.InvalidRequestError,
          } [response.status] || Error;

          if (isGeoPermissionError(response)) {
            exceptionClass = Exceptions.GeoPermissionError
          }

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
          if (error.response == undefined){
           return reject(error.stack );
          }
          var exceptionClass = {
            400: Exceptions.InvalidRequestError,
            401: Exceptions.AuthenticationError,
            404: Exceptions.ResourceNotFoundError,
            405: Exceptions.InvalidRequestError,
            406: Exceptions.NotAcceptableError,
            500: Exceptions.ServerError,
            409: Exceptions.InvalidRequestError,
            422: Exceptions.InvalidRequestError,
            207: Exceptions.InvalidRequestError,
          } [error.response.status] || Error;

          if (isGeoPermissionError(error.response)) {
            exceptionClass = Exceptions.GeoPermissionError
          }

          if (!_.inRange(error.response.status, 200, 300)) {
            let body = error.response.data;
            if (typeof body === 'object') {
              reject(new exceptionClass(error));
            }  else {
              if (error.response.status >= 500) {
                reject(new Exceptions.ServerError(error));
              }
              reject(new exceptionClass(error));
            }
          }
          reject(error.stack + '\n' + JSON.stringify(error.response.data));
        })
      }
    });
  };
}
