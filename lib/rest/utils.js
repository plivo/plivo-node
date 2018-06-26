import _camelCase from 'lodash/camelCase';
import _snakeCase from 'lodash/snakeCase';
import _mapKeys from 'lodash/mapKeys';
import _mapValues from 'lodash/mapValues';
import _map from 'lodash/map';
import _includes from 'lodash/includes';

const whiteListed = ['address_line1', 'address_line2']

function recursivelyRenameObject(object, renameFunc) {
  if (object && typeof object.on === 'function') {
    return object;
  }

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
      if (_includes(whiteListed, key)) {
        return key;
      }
      if(typeof key !== 'string') return key;

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
        if(typeof key !== 'string') return key;
        return _camelCase(key);
      });

      return res;
    });
  }
}

