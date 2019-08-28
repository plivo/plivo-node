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


    if (!voice || ['MAN', 'WOMAN'].indexOf(voice) != -1) {
      resolve({ success: true });
      return;
    }

    var voiceParts = voice.split('.');
    if (voiceParts.length != 2 || voiceParts[0] != 'Polly') {
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
        success: false, msg: "Invalid language. Language `" + language + "` is not supported."
      });
      return;
    }

    // If not *, Validate voice for given language.
    if (voiceParts[1] != '*' && languageWiseVoices[language].indexOf(voiceParts[1]) == -1) {
      resolve({
        success: false,
        msg: "<Speak> voice ‘" + voice + "’ is not valid. Refer <link> for list of supported voices."
      });
      return;
    }

    // Validate xml now
    var contenxtXml = "<root>" + content + "</root>";
    parseString(contenxtXml, function (err, xmlJson) {
      if (err || !xmlJson) {
        resolve({
          success: false,
          msg: "Invalid SSML xml structure. Content must be a valid xml."
        })
      }
      xmlJson = xmlJson.root;

      // Validate supported ssml tags
      var validXmlTags = ['break', 'emphasis', 'lang', 'p', 'phoneme', 'prosody', 's', 'say-as', 'sub', 'w'];

      var validateNode = function (key, xmlNode) {
        if (validXmlTags.indexOf(key) == -1) {
          return { valid: false, msg: "Ssml tag <" + key + "> is not supported." };
        }

        // console.log('childs are ', xmlNode.length);
        for (var i = 0; i < xmlNode.length; i++) {
          if (typeof xmlNode[i] !== 'string') {
            for (var childKey in xmlNode[i]) {
              if (childKey !== '_' && childKey !== '$') {
                let result = validateNode(childKey, xmlNode[i][childKey]);
                if (!result.valid) {
                  return result;
                }
              }
            }
          }
        }

        return { valid: true };
      };

      if (typeof xmlJson !== 'string') {
        for (var key in xmlJson) {
          if (key !== '_' && key !== '$') {
            var result = validateNode(key, xmlJson[key]);
            if (!result.valid) {
              resolve({
                success: false,
                msg: result.msg
              });
              return;
            }
          }
        }
      }


      resolve({
        success: true
      });

    });

  });

}

