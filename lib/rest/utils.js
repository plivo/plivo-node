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

export function validSubAccount(accountId){
  if(accountId.constructor !== String){
    throw new InvalidRequestError('Subaccount Id must be a string');
  }

  if(accountId.length !== 20){
    throw new InvalidRequestError('Subaccount Id should be of length 20');
  }

  if(accountId.substring(0,2) !== 'SA'){
    throw new InvalidRequestError("Subaccount Id should start with 'SA'");
  }

  return true;
}

export function validMultipleDestinationNos(paramName, paramValue, options = {}){
  if(paramValue.split(options.delimiter).length > 1 && options.role.toLowerCase()!=='agent'){
    throw new InvalidRequestError('Multiple ' + paramName + ' values given for role ' + options.role)
  }
  else if (paramValue.split(options.delimiter).length >= options.agentLimit){
    throw new InvalidRequestError('No of ' + paramName + ' values provided should be lesser than ' + options.agentLimit)
  }
  else {
    return true
  }
}

export function validParam(paramName, paramValue, expectedTypes = null, mandatory = false, expectedValues = null){
  if(mandatory && !paramValue){
    throw new InvalidRequestError(paramName + " is a required parameter");
  }

  if (!paramValue){
    return true;
  }

  if(!expectedValues){
    return expectedType(paramName, expectedTypes, paramValue);
  }

  if(expectedValue(paramName, expectedValues, paramValue)){
    return true;
  }
}

export function expectedType(paramName, expectedTypes, paramValue){
  if(!expectedTypes){
    return true;
  }

  if(expectedTypes.indexOf(paramValue.constructor)===-1){
    throw new InvalidRequestError(paramName + ": Expected one of " + expectedTypes + " but received " + paramValue.constructor + " instead")
  }
  return true;
}

export function expectedValue(paramName, expectedValues, paramValue){
  if(!expectedValues){
    return true;
  }

  if(expectedValues.constructor === Array){
    if(expectedValues.indexOf(paramValue) === -1){
      throw new InvalidRequestError(paramName + ': Expected one of ' + expectedValues + ' but received ' + paramValue + ' instead');
    }
    return true;
  }
  else{
    if(expectedValues !== paramValue){
      throw new InvalidRequestError(paramName + ': Expected ' + expectedValues + ' but received ' + paramValue + ' instead')
    }
    return true;
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

  let response = paramValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
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

  if(!(expectedValues.indexOf(paramValue.toLowerCase()) === -1) || !(expectedValues.indexOf(paramValue.toUpperCase()) === -1)){
    return true;
  }
  else if (validUrl(paramName, paramValue)){
    return true;
  }
  else {
    throw new InvalidRequestError(paramName + ' neither a valid URL nor in the expected values')
  }
}

export function validDateFormat(paramName, paramValue, mandatory = false){
  if(mandatory && !paramValue){
    throw new InvalidRequestError(paramName + " is a required parameter")
  }

  if(!paramValue){
    return true;
  }

  let response = paramValue.match(/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}(:\d{2}(\.\d{1,6})?)?$/);
  if(response == null){
    throw new InvalidRequestError("Invalid Date : Doesn't satisfy the date format")
  }
  else {
    return true;
  }
}

export function validRange(paramName, paramValue, mandatory = false, lowerBound = null, upperBound = null){
  if(mandatory && !paramValue){
    throw new InvalidRequestError(paramName + " is a required parameter")
  }

  if(!paramValue && paramValue !== 0){
    return true;
  }

  if(!expectedType(paramName, [Number], paramValue)){
    throw new InvalidRequestError(paramName + ": Expected an Integer but received " + paramValue.constructor + " instead")
  }

  if(lowerBound && upperBound){
    if(paramValue < lowerBound || paramValue > upperBound) {
      throw new InvalidRequestError(paramName + " ranges between " + lowerBound + " and " + upperBound)
    }

    if(paramValue >= lowerBound && paramValue <= upperBound){
      return true;
    }
  }
  else if(lowerBound){
    if(paramValue < lowerBound){
      throw new InvalidRequestError(paramName + " should be greater than " + lowerBound)
    }

    if(paramValue >= lowerBound){
      return true;
    }
  }
  else if(upperBound){
    if(paramValue > upperBound){
      throw new InvalidRequestError(paramName + " should be lesser than " + upperBound)
    }

    if(paramValue <= upperBound){
      return true;
    }
  }
  else{
    throw new InvalidRequestError("Any one or both of lower and upper bound should be provided")
  }
}
