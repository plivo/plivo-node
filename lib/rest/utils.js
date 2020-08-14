import _camelCase from 'lodash/camelCase';
import _snakeCase from 'lodash/snakeCase';
import _mapKeys from 'lodash/mapKeys';
import _mapValues from 'lodash/mapValues';
import _map from 'lodash/map';
import { parseString } from 'xml2js';

export class InvalidRequestError extends Error {}

function recursivelyRenameObject(object, renameFunc) {
  if (!(object instanceof Object)) {
    return object;
  }

  return _mapValues(_mapKeys(object, renameFunc), function (value) {
    if (Array.isArray(value)) return _map(value, function (value) {
      return recursivelyRenameObject(value, renameFunc);
    });
    if (typeof value !== 'object') return value;
    return recursivelyRenameObject(value, renameFunc);
  });
}

export function camelCaseRequestWrapper(requestFunc) {
  return (method, action, params) => {

    params = recursivelyRenameObject(params, function (value, key) {
      if (typeof key !== 'string') return key;

      // Snake Case logic has issue, it replaces double underscores with single
      // So dont run snake case logic for following params
      let skipParamsFromSnakeCasing = [
        'message_time__lt', 'message_time__lte',
        'message_time__gt', 'message_time__gte',
        'end_time__gt', 'end_time__gte',
        'end_time__lt', 'end_time__lte',
        'bill_duration__gt', 'bill_duration__gte',
        'bill_duration__lt', 'bill_duration__lte',
        'add_time__gt', 'add_time__gte',
        'add_time__lt', 'add_time__lte',
      ]
      if (skipParamsFromSnakeCasing.indexOf(key) >= 0) {
        return key;
      }

      return _snakeCase(key)
        .replace('_less_than', '__lt')
        .replace('_greater_than', '__gt')
        .replace('_greater_or_equal', '__gte')
        .replace('_less_or_equal', '__lte')
        .replace('_equal', '')
        .replace('_equals', '')
        .replace('country_iso_2', 'country_iso2');
    });

    return requestFunc(method, action, params).then(res => {
      res.body = recursivelyRenameObject(res.body, function (value, key) {
        if (typeof key !== 'string') return key;
        return _camelCase(key);
      });

      return res;
    });
  }
}

export function validateSpeakAttributes(content, voice) {

  if (!voice || ['MAN', 'WOMAN'].indexOf(voice) != -1) {
    return { success: true };
  }

  var voiceParts = voice.split('.');
  if (voiceParts.length != 2 || voiceParts[0] != 'Polly') {
    return {
      success: false, msg: "Invalid voice " + voice + '.'
    };
  };
  return {
    success: true,
  }
}

export function expectedValue(paramName, expectedValues, paramValue){
  if(!expectedValues){
    return true;
  }

  if(expectedValues.constructor === Array){
    if(expectedValues.indexOf(paramValue) === -1){
      throw new InvalidRequestError(paramName + ': Expected one of ' + expectedValues + 'but received' + paramValue + 'instead');
    }
    return true;
  }
  else{
    if(expectedValues !== paramValue){
      throw new InvalidRequestError(paramName + ': Expected ' + expectedValues + 'but received' + paramValue + 'instead')
    }
  }
}

export function multiValidParam(paramName, paramValue, expectedTypes = null, mandatory = false, expectedValues = null, makeLowerCase = false, seperator = ','){
  if(mandatory && !paramValue){
    throw new InvalidRequestError(paramName + 'is a required parameter');
  }

  if(!paramValue){
    return true;
  }

  if(makeLowerCase){
    paramValue = paramValue.toLowerCase();
  }
  else{
    paramValue = paramValue.toUpperCase();
  }
  let values = paramValue.split(seperator)
  if(expectedValues) {
    for (let i = 0; i < values.length; i++) {
      expectedValue(paramName, expectedValues, values[i].trim());
    }
  }
  return true;
}

export function validUrl(paramName, paramValue, mandatory = false){
  if(mandatory && !paramValue){
    throw new InvalidRequestError(paramName + 'is a required parameter');
  }

  if(!paramValue){
    return true;
  }

  let response = paramName.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if(response == null){
    throw new InvalidRequestError("Invalid URL : Doesn't satisfy the URL format")
  }
  else {
    return true;
  }
}

export function isOneAmongStringUrl(paramName, paramValue, mandatory = false, expectedValues = null){
  if(mandatory && !paramValue){
    throw new InvalidRequestError(paramName + 'is a required parameter');
  }

  if(!paramValue){
    return true;
  }

  if(!(expectedValues.indexOf(paramValue) === -1) || !(expectedValues.indexOf(paramValue) === -1)){
    return true;
  }
  else if (validUrl(paramName, paramValue)){
    return true;
  }
  else {
    throw new InvalidRequestError(paramName + ' neither a valid URL nor in the expected values')
  }
}
