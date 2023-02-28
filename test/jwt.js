import assert from 'assert';
import sinon from 'sinon';

import {AccessToken} from '../lib/utils/jwt';

describe('Jwt', function () {
  it('should be created with validFrom and lifetime', function () {
    let acctkn = new AccessToken('MADADADADADADADADADA', 'qwerty', 'username', {validFrom: 12121212, lifetime: 300}, 'username-12345');
    acctkn.addVoiceGrants(true, true);
    assert.equal(acctkn.toJwt(), 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InBsaXZvO3Y9MSJ9.eyJqdGkiOiJ1c2VybmFtZS0xMjM0NSIsImlzcyI6Ik1BREFEQURBREFEQURBREFEQURBIiwic3ViIjoidXNlcm5hbWUiLCJuYmYiOjEyMTIxMjEyLCJleHAiOjEyMTIxNTEyLCJncmFudHMiOnsidm9pY2UiOnsiaW5jb21pbmdfYWxsb3ciOnRydWUsIm91dGdvaW5nX2FsbG93Ijp0cnVlfX19.ilC13HrMls4w3UHWZsZNudAALgWaSBkkXmZZ-VnT6GU');
  });
  it('should be created with validFrom and validTill', function () {
    let acctkn = new AccessToken('MADADADADADADADADADA', 'qwerty', 'username', {validFrom: 12121212, validTill: 12121512}, 'username-12345');
    acctkn.addVoiceGrants(true, true);
    assert.equal(acctkn.toJwt(), 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InBsaXZvO3Y9MSJ9.eyJqdGkiOiJ1c2VybmFtZS0xMjM0NSIsImlzcyI6Ik1BREFEQURBREFEQURBREFEQURBIiwic3ViIjoidXNlcm5hbWUiLCJuYmYiOjEyMTIxMjEyLCJleHAiOjEyMTIxNTEyLCJncmFudHMiOnsidm9pY2UiOnsiaW5jb21pbmdfYWxsb3ciOnRydWUsIm91dGdvaW5nX2FsbG93Ijp0cnVlfX19.ilC13HrMls4w3UHWZsZNudAALgWaSBkkXmZZ-VnT6GU');
  });
  it('should be created with lifetime and validTill', function () {
    let acctkn = new AccessToken('MADADADADADADADADADA', 'qwerty', 'username', {lifetime: 300, validTill: 12121512}, 'username-12345');
    acctkn.addVoiceGrants(true, true);
    assert.equal(acctkn.toJwt(), 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InBsaXZvO3Y9MSJ9.eyJqdGkiOiJ1c2VybmFtZS0xMjM0NSIsImlzcyI6Ik1BREFEQURBREFEQURBREFEQURBIiwic3ViIjoidXNlcm5hbWUiLCJuYmYiOjEyMTIxMjEyLCJleHAiOjEyMTIxNTEyLCJncmFudHMiOnsidm9pY2UiOnsiaW5jb21pbmdfYWxsb3ciOnRydWUsIm91dGdvaW5nX2FsbG93Ijp0cnVlfX19.ilC13HrMls4w3UHWZsZNudAALgWaSBkkXmZZ-VnT6GU');
  });
});
