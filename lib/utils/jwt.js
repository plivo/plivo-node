var jwt = require('jsonwebtoken');

export function AccessToken(authId, authToken, username, validityOptions = {}, uid = null) {
  this.authId = authId || process.env.PLIVO_AUTH_ID;
  this.key = authToken || process.env.PLIVO_AUTH_TOKEN;
  this.username = username;

  if (this.authId == null) {
    throw new Error("Please provide authId");
  }
  if (this.key == null) {
    throw new Error("Please provide authToken");
  }

  if (this.username == null) {
    throw new Error("Please provide username");
  }


  if (validityOptions.validFrom != null) {
    if (validityOptions.lifetime != null && validityOptions.validTill != null) {
      throw new Error("Please define at maximum any two of validFrom, lifetime and validTill");
    }
    this.validFrom = validityOptions.validFrom;
    if (validityOptions.validTill != null) {
      this.lifetime = validityOptions.validTill - this.validFrom;
    } else {
      this.lifetime = validityOptions.lifetime || 86400;
    }
  } else {
    this.lifetime = validityOptions.lifetime || 86400;
    if (validityOptions.validTill != null) {
      this.validFrom = validityOptions.validTill - this.lifetime;
    } else {
      this.validFrom = (new Date()).getTime() / 1000;
    }
  }
  this.uid = uid || this.username + "-" + (new Date()).getTime();
}

AccessToken.prototype = {
  addVoiceGrants: function(incoming = false, outgoing = false) {
    this.grants = {
      voice: {
        incoming_allow: incoming,
        outgoing_allow: outgoing
      }
    };
  },
  toJwt: function() {
    let payload = {
      jti: this.uid,
      iss: this.authId,
      sub: this.username,
      nbf: Math.floor(this.validFrom),
      exp: Math.floor(this.validFrom + this.lifetime),
      grants: this.grants
    };
    let options = {
      header: {
        typ: "JWT",
        cty: "plivo;v=1"
      },
      noTimestamp: true,
      allowInvalidAsymmetricKeyTypes: true,
    };
    return jwt.sign(payload, this.key, options);
  }
}
