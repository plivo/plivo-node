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

export function validateVoiceForSsml(content, voice, language) {

  return new Promise(function (resolve, reject) {

    var voiceParts = voice.split('.');
    if (['MAN', 'WOMAN'].indexOf(voice) != -1) {
      resolve({ success: true });
      return;
    } else if (voiceParts.length != 2 || voiceParts[0] != 'Polly') {
      resolve({
        success: false, msg: "Invalid voice " + voice + '.'
      });
      return;
    }

    // If voice is polly, validate accent based on language specified

    // List of valid Polly voices
    var languageWiseVoices = {
      'Australian English': ['Nicole', 'Russell'],
      'Brazilian Portuguese': ['Vitória', 'Ricardo'],
      'Canadian French': ['Chantal'],
      'Canadian French': ['Chantal'],
      'Danish': ['Naja', 'Mads'],
      'Dutch': ['Lotte', 'Ruben'],
      'French': ['Léa', 'Céline', 'Mathieu'],
      'German': ['Vicki', 'Hans'],
      'Hindi': ['Aditi'],
      'Icelandic': ['Dóra', 'Karl'],
      'Indian English': ['Raveena ', 'Aditi'],
      'Italian': ['Carla', 'Giorgio'],
      'Japanese': ['Mizuki', 'Takumi'],
      'Korean': ['Seoyeon'],
      'Mandarin Chinese': ['Zhiyu'],
      'Norwegian': ['Liv'],
      'Polish': ['Ewa', 'Maja', 'Jacek', 'Jan'],
      'Portuguese-Iberic': ['Inês', 'Cristiano'],
      'Romanian': ['Carmen'],
      'Russian': ['Tatyana', 'Maxim'],
      'Spanish-Castilian': ['Conchita', 'Enrique'],
      'Swedish': ['Astrid'],
      'Turkish': ['Filiz'],
      'UK English': ['Amy', 'Emma', 'Brian'],
      'US English': ['Joanna', 'Salli', 'Kendra', 'Kimberly', 'Ivy', 'Matthew', 'Justin', 'Joey'],
      'US Spanish': ['Penélope', 'Miguel'],
      'Welsh': ['Gwyneth'],
      'Welsh English': ['Geraint'],
    };

    // Validate supported languages.
    if (!languageWiseVoices[language]) {
      resolve({
        success: false, msg: "Invalid language."
      });
      return;
    }

    // Validate voice for given language.
    if (languageWiseVoices[language].indexOf(voiceParts[1]) == -1) {
      console.log('==><? thrown here');
      resolve({
        success: false,
        msg: "XML Validation Error: <Speak> voice ‘" + voice + "’ is not valid. Refer <link> for list of supported voices."
      });
      return;
    }

    // Validate xml now
    var contenxtXml = "<root>" + content + "</root>";
    parseString(contenxtXml, function (err, xmlJson) {
      if (err || !xmlJson) {
        // console.log('XMl parsing error validation result', err);
        resolve({
          success: false,
          msg: "Invalid SSML xml structure. Content must be a valid xml. Parsing Error: " + err
        })
      }
      xmlJson = xmlJson.root;

      // Validate supported ssml tags
      var validXmlTags = ['break', 'emphasis', 'lang', 'p', 'phoneme', 'prosody', 's', 'say-as', 'sub', 'w'];

      var invalidXmlTag = null;
      for (var key in xmlJson) {
        // console.log('xml json key', key);
        if (key !== '_' && key !== '$') {
          if (validXmlTags.indexOf(key) == -1) {
            invalidXmlTag = key;
            break;
          }
        }
      }

      if (invalidXmlTag) {
        resolve({
          success: false,
          msg: "SSML tag `" + invalidXmlTag + "` is not supported."
        })
        return;
      }

      resolve({
        success: true
      });

    });

  });

}

