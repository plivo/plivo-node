import { validateTemplate } from '../utils/template.js';
import { validateInteractive } from '../utils/interactive.js';

export let extend = (instance, data) => {
  data = data || {};
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      instance[key] = data[key];
    }
  }
};

export let validate = (() => {
  let Validators = {};
  Validators.isDataType = (() => {
    let regExs = {
      String: /String/,
      Number: /Number/,
      Object: /Object/,
      Boolean: /Boolean/,
      Array: /Array/
    };
    return (object, type) => {
      return regExs[type].test(Object.prototype.toString.call(object));
    };
  })();

  // Validators.isEmpty = field => {
  //   if (Validators.isDataType(field, 'String')) {
  //     return !field.length;
  //   }
  //   return true;
  // };

  Validators.isRequired = field => {
    return !field;
  };

  Validators.isTemplate = field => {
    const { error, value } = validateTemplate(field);
    return {error, value}
  };

  Validators.isInteractive = field => {
    const { error, value } = validateInteractive(field);
    return {error, value}
  };
  

  return (data = []) => {
    let errorText = [];

    data.forEach(item => {
      item.validators.forEach(validator => {
        switch (validator) {
          case 'isRequired':
            if (Validators.isRequired(item.value)) {
              errorText.push('Missing mandatory field: ' + item.field);
            }
            break;
          // case 'isObject':
          //   if (!Validators.isDataType(item.value, 'Object')) {
          //     errorText.push(item.field + ' should be object.');
          //   }
          //   break;
          case 'isString':
            if (!Validators.isDataType(item.value, 'String')) {
              errorText.push(item.field + ' should be string.');
            }
            break;
          case 'isTemplate':
            const { error, value } = Validators.isTemplate(item.value);
            if(error){
              error.details.forEach((validationError, _) => {
                errorText.push(`${validationError.message}`);
              })
              break;
            }
          case 'isInteractive':
            const { err, val } = Validators.isInteractive(item.value);
            if(err){
              err.details.forEach((validationError, _) => {
                errorText.push(`${validationError.message}`);
              })
              break;
            }
          default:
        }
      });
    });

    if (errorText.length) {
      return new Promise(function (resolve, reject) {
        reject(new Error(errorText.join(', ')));
      });
    }
    return false;
  };
})();
