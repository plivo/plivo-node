import assert from 'assert';
import sinon from 'sinon';

import {computeOldSignature, verifyOldSignature, validateSignature} from '../lib/utils/security';

describe('Security', function () {
  it('should compute signature correctly', function () {
    assert.equal(computeOldSignature('MAXXXXXXXXXXXXXXXXXX', 'http://foo.com/answer/', {
      CallUUID: '97ceeb52-58b6-11e1-86da-77300b68f8bb',
      Duration: '300'
    }), 'EJEt0ELanhr8hjMPIJnLNLex0dE=');
  });

  it('should encode special characters correctly', function () {
    assert.equal(computeOldSignature('MAXXXXXXXXXXXXXXXXXX', 'http://foo.com/answer/', {
      a: "1 2"
    }), 'n3Xfo4u+vRFyl3gsH8B0qDUIK5g=');
  });

  it('should fail for wrong signature', function () {
    assert.equal(verifyOldSignature('MAXXXXXXXXXXXXXXXXXX', 'http://foo.com/answer/', {
      CallUUID: '97ceeb52-58b6-11e1-86da-77300b68f8bb',
      Duration: '300'
    }, 'EJEt0ELanhr8hjMPIJnLNLef0dE='), false);
  });

  it('should pass for correct url,auth_token,nonce and signature', function () {
    assert.equal(
      validateSignature('https://answer.url','12345','ehV3IKhLysWBxC1sy8INm0qGoQYdYsHwuoKjsX7FsXc=','my_auth_token'),
      true
    );
  });

  it('should fail for wrong url,auth_token,nonce and signature', function () {
    assert.equal(
      validateSignature('https://answer.url','123456','ehV3IKhLysWBxC1sy8INm0qGoQYdYsHwuoKjsX7FsXc=','my_auth_tokens'),
      false
    );
  });
});
