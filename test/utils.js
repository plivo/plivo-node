import assert from 'assert';
import sinon from 'sinon';

import {computeOldSignature, verifyOldSignature, validateSignature} from '../lib/utils/security';
import {validateV3Signature, validateV3SignatureScoped, deriveSigningKey} from '../lib/utils/v3Security';

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

describe('V3 signature with scoped token', function () {
  const tokenOne = ['PLV', 'obLD1OX2BxgpOktcbX6PkBEiM0RVZneImaq7zN3u_wA'].join('');
  const tokenTwo = 'PLV' + 'A'.repeat(43);
  const nonce = '01456268273535255990';
  const postUrl = 'https://acme.example.com/sms/status';
  const postParams = () => ({MessageUUID: '6f1c2a90-0d7e-4b1e-9c11-1d2e3f4a5b6c', Status: 'delivered', To: '14155550100'});
  const postSig = 'Kxo1ZuQEWE578HnfEhiJvLjXNzZXYPvkZDKNq9s4kvk=';
  const getUrl = 'https://acme.example.com/answer?From=14155550100&CallUUID=abc';
  const getSig = 'nr+QWHZTVoEP0rWEEWMeWjgKRzfOOuBhJvJqQQ8ZC2s=';

  it('derives the signing key', function () {
    assert.equal(deriveSigningKey(tokenOne).toString('hex'), 'e55b316ef14f5830de74d2cc2ae794b87c6c349f577d2fabd648884afba6c7ca');
    assert.equal(deriveSigningKey(tokenTwo).toString('hex'), 'c89d8ad56ac99e1a8def8cecce07ffb55332fe813673be81df8b1297d1206368');
  });

  it('validates POST and GET vectors', function () {
    assert.equal(validateV3SignatureScoped('POST', postUrl, nonce, tokenOne, postSig, postParams()), true);
    assert.equal(validateV3SignatureScoped('GET', getUrl, nonce, tokenOne, getSig), true);
  });

  it('accepts any of several comma-separated signatures', function () {
    assert.equal(validateV3SignatureScoped('POST', postUrl, nonce, tokenOne, 'bogus,' + postSig, postParams()), true);
  });

  it('rejects wrong token, tampered params and the auth-token validator', function () {
    assert.equal(validateV3SignatureScoped('POST', postUrl, nonce, tokenTwo, postSig, postParams()), false);
    assert.equal(validateV3SignatureScoped('POST', postUrl, nonce, tokenOne, postSig, Object.assign(postParams(), {Status: 'failed'})), false);
    assert.equal(validateV3Signature('POST', postUrl, nonce, tokenOne, postSig, postParams()), false);
  });
});
