import _camelCase from 'lodash/camelCase';
import _snakeCase from 'lodash/snakeCase';
import _mapKeys from 'lodash/mapKeys';
import _mapValues from 'lodash/mapValues';
import _map from 'lodash/map';
import { parseString } from 'xml2js';

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
        .replace('_equals', '');
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

