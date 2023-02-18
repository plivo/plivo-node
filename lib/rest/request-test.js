import queryString from 'querystring';
import request from 'request';

export function Request(config) {
  let auth = 'Basic ' + new Buffer(config.authId + ':' + config.authToken)
    .toString('base64');

  let headers = {
    Authorization: auth,
    'User-Agent': config.userAgent,
    'Content-Type': 'application/json'
  };

  return (method, action, params) => {
    params = params || {};
    var options = {
      url: config.url + '/' + action,
      method: method,
      formData: params || '',
      headers: headers,
      json: true
    };

    if (method == 'GET' && options.formData !== '') {
      let query = '?' + queryString.stringify(params);
      options.url += query;
    }

    if (typeof config.proxy !== 'undefined') {
      options.proxy = config.proxy;
    }

    if (typeof config.timeout !== 'undefined') {
      options.timeout = config.timeout;
    }

    return new Promise((resolve, reject) => {
      // LiveCall - needs to be at top
      if (method === 'GET' && action === 'Call/6653422-91b6-4716-9fad-9463daaeeec2' && params['status'] === 'live') {
        resolve({
          response: {},
          body: {
            "direction": "inbound",
            "from": "15856338537",
            "call_status": "in-progress",
            "api_id": "45223222-74f8-11e1-8ea7-12313806be9a",
            "to": "14154290945",
            "caller_name": "+15856338537",
            "call_uuid": "6653422-91b6-4716-9fad-9463daaeeec2",
            "session_start": "2014-03-23 14:49:39.722551",
            "request_uuid": "d0a87a1a-b0e9-4ab2-ac07-c22ee87cd04a",
            "stir_verification": "Verified",
            "stir_attestation": "A"

          }
        });
      }

      else if (method === 'GET' && action === 'Call/' && params['status'] === 'live') {
        resolve({
          response: {},
          body: {
            "api_id": "c9527676-5839-11e1-86da-6ff39efcb949",
            "calls": [
              "eac94337-b1cd-499b-82d1-b39bca50dc31",
              "0a70a7fb-168e-4944-a846-4f3f4d2f96f1"
            ]
          }
        });
      }

      else if (method === 'DELETE' && action === 'Request/aaa-deeiei3-dfddd/') {
        resolve({
          response: {},
          body: {}
        });
      }

      // get all calls
      else if (action == 'Call/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            "api_id": "8299d094-dc72-11e5-b56c-22000ae90795",
            "meta": {
              "limit": 20,
              "next": null,
              "offset": 0,
              "previous": null,
              "total_count": 4
            },
            objects: [
              {
                "answer_time": "2015-07-26 15:45:02+05:30",
                "api_id": "06ae0f8f-dc72-11e5-b56c-22000ae90795",
                "bill_duration": 924,
                "billed_duration": 960,
                "call_direction": "outbound",
                "call_duration": 924,
                "call_uuid": "eba53b9e-8fbd-45c1-9444-696d2172fbc8",
                "end_time": "2015-07-26 15:45:14+05:30",
                "from_number": "+14158572518",
                "initiation_time": "2015-07-26 15:44:49+05:30",
                "parent_call_uuid": null,
                "resource_uri": "/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Call/eba53b9e-8fbd-45c1-9444-696d2172fbc8/",
                "to_number": "14153268174",
                "total_amount": "0.13600",
                "total_rate": "0.00850",
                "stir_verification": "Not Verified",
                "voice_network_group": "USA All Networks",
                "stir_attestation": ""
              },
              {
                "answer_time": "2015-07-26 16:45:02+05:30",
                "api_id": "06ae0f8f-dc72-11e5-b56c-22000ae90795",
                "bill_duration": 924,
                "billed_duration": 960,
                "call_direction": "outbound",
                "call_duration": 924,
                "call_uuid": "eba53b9e-8fbd-45c1-9444-696d2172fbc8",
                "end_time": "2015-07-26 16:45:14+05:30",
                "from_number": "+14158572518",
                "initiation_time": "2015-07-26 16:44:49+05:30",
                "parent_call_uuid": null,
                "resource_uri": "/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Call/eba53b9e-8fbd-45c1-9444-696d2172fbc8/",
                "to_number": "14153268174",
                "total_amount": "0.13600",
                "total_rate": "0.00850",
                "stir_verification": "Verified",
                "voice_network_group": "USA All Networks",
                "stir_attestation": "A"
              }
            ]
          }
        });
      }
      else if (action == 'Call/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'call fired',
            request_uuid: '9834029e-58b6-11e1-b8b7-a5bd0e4e126f',
            api_id: '97ceeb52-58b6-11e1-86da-77300b68f8bb'
          }
        });
      }
      //Get CDR (Retrieve a call)
      else if (action == 'Call/aaa-deeiei3-dfddd/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            "id": '1',
            "call_uuid": 'aaa-deeiei3-dfddd',
            "answer_time": null,
            "api_id": "95727cf4-3eeb-11e7-8edf-02ed609bd62b",
            "bill_duration": 0,
            "billed_duration": 0,
            "call_direction": "outbound",
            "call_duration": 0,
            "end_time": "2017-05-22 17:49:40+05:30",
            "from_number": "+919879879876",
            "initiation_time": "2017-05-22 17:49:30+05:30",
            "parent_call_uuid": null,
            "resource_uri": "/v1/Account/MAJHUDTEYWLSIUYTDBCZ/Call/4d04c52e-cea3-4458-bbdb-0bfc314ee7cd/",
            "to_number": "919999999999",
            "total_amount": "0.00000",
            "total_rate": "0.03570",
            "stir_verification": "Not Applicable",
            "voice_network_group": "India All Networks",
            "stir_attestation": ""
          }
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            "message": "call transferred",
            "api_id": "08c94608-58bd-11e1-86da-adf28403fe48"
          }
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {}
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/Record/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            url: 'http://s3.amazonaws.com/recordings_2013/48dfaf60-3b2a-11e3.mp3',
            message: 'call recording started',
            recording_id: '48dfaf60-3b2a-11e3',
            api_id: 'c7b69074-58be-11e1-86da-adf28403fe48'
          }
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/Record/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
          }
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/Play/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'play started',
            api_id: '07abfd94-58c0-11e1-86da-adf28403fe48'
          }
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/Play/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {}
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/Speak/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            message: 'speak stopped',
            api_id: 'cf2359c8-f4d6-11e6-b886-067c5485c240'
          }
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/Speak/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'speak started',
            api_id: '07abfd94-58c0-11e1-86da-adf28403fe48'
          }
        });
      }
      else if (action == 'Call/aaa-deeiei3-dfddd/DTMF/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'digits sent',
            api_id: '07abfd94-58c0-11e1-86da-adf28403fe48'
          }
        });
      }
      // if(action == 'Call/1/' && method == 'DELETE') {
      //   resolve({
      //     response: {},
      //     body: {}
      //   })
      // }
      //
      //
      // Accounts
      else if (action == '/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            account_type: 'standard',
            address: '340 Pine St, San Francisco, CA - 94104',
            api_id: 'c31b36be-0da2-11e4-bd8a-12313f016a39',
            auth_id: 'MANWVLYTK4ZWU1YTY4ZT',
            auto_recharge: true,
            billing_mode: 'prepaid',
            cash_credits: '23.79822',
            city: 'San Francisco',
            name: 'Han Solo',
            resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/',
            state: 'California',
            timezone: 'America/Los_Angeles'
          }
        });
      }

      else if (action == '/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            api_id: 'ea43d134-0db0-11e4-a2d1-22000ac5040c',
            message: 'changed'
          }
        });
      }

      else if (action === 'Subaccount/' && method === 'POST') {
        resolve({
          response: {},
          body: {
            "api_id": "97c8d1de-3f08-11e7-b6f4-061564b78b75",
            "auth_id": "SANDLHYZBIZMU4ZDEXNM",
            "auth_token": "MTMzZTZjNzdiNDVmY2VhZDQyNTUwYWVjNzI2OThk",
            "message": "created"
          }
        });
      }

      else if (action == 'Subaccount/1/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            account: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/',
            api_id: '323972b2-0db3-11e4-a2d1-22000ac5040c',
            auth_id: '1',
            auth_token: 'MTZjYWM0YzVjNjMwZmVmODFiNWJjNWJmOGJjZjgw',
            created: '2014-07-17',
            enabled: false,
            modified: null,
            name: 'Chewbacca',
            resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Subaccount/SAMTVIYJDIYWYYMZHLYZ/'
          }
        });
      }

      else if (action == 'Subaccount/1/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'changed',
            api_id: '5a9fcb68-523d-11e1-86da-6ff39efcb949'
          }
        });
      }

      else if (action == 'Subaccount/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            api_id: 'b38bf42e-0db4-11e4-8a4a-123140008edf',
            meta: {
              limit: 20,
              next: null,
              offset: 0,
              previous: null,
              total_count: 2
            },
            objects: [
              {
                account: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/',
                auth_id: '1',
                auth_token: 'MTZjYWM0YzVjNjMwZmVmODFiNWJjNWJmOGJjZjgw',
                created: '2014-07-17',
                enabled: false,
                modified: null,
                name: 'Chewbacca',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Subaccount/SAMTVIYJDIYWYYMZHLYZ/'
              },
              {
                account: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/',
                auth_id: '1',
                auth_token: 'OTdhMjYwMWYxOGMyNpFjNzUwYWM3YWI3NjY4Y2Ey',
                created: '2012-09-23',
                enabled: true,
                modified: '2012-09-23',
                name: 'new',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Subaccount/SANJQ5NWEYNWZJNZE2MZ/'
              }
            ]
          }
        });
      }

      else if (action == 'Subaccount/1/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {}
        });
      }

      // =============  Application ===================

      else if (action == 'Application/1/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            answer_method: 'GET',
            answer_url: 'http://webapp.com/dial.xml',
            app_id: '1',
            app_name: 'Dial Office',
            default_app: false,
            enabled: true,
            fallback_answer_url: '',
            fallback_method: 'POST',
            hangup_method: 'POST',
            hangup_url: 'http://webapp.com/dial.xml',
            message_method: 'POST',
            message_url: '',
            public_uri: false,
            resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/20372631212782780/',
            sip_uri: 'sip:20372631212782780@app.plivo.com',
            sub_account: null
          }
        });
      }
      else if (action == 'Application/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            api_id: 'e5b05b26-10c4-11e4-a2d1-22000ac5040c',
            meta: {
              limit: 20,
              next: null,
              offset: 0,
              previous: null,
              total_count: 19
            },
            objects: [
              {
                answer_url: 'http://webapp.com/dial.xml',
                answer_method: 'GET',
                app_id: '20372631212782780',
                app_name: 'Dial Office',
                default_app: false,
                enabled: true,
                fallback_answer_url: '',
                fallback_method: 'POST',
                hangup_method: 'POST',
                hangup_url: 'http://webapp.com/dial.xml',
                message_method: 'POST',
                message_url: '',
                public_uri: false,
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/20372631212782780/',
                sip_uri: 'sip:20372631212782780@app.plivo.com',
                sub_account: null
              },
              {
                answer_url: 'https://webapp.com/conference_court.xml',
                answer_method: 'GET',
                app_id: '14260623927192078',
                app_name: 'Conference_Court',
                default_app: false,
                enabled: true,
                fallback_answer_url: '',
                fallback_method: 'POST',
                hangup_method: 'POST',
                hangup_url: 'https://webapp.com/conference_court.xml',
                message_method: 'POST',
                message_url: '',
                public_uri: false,
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/14260623927192078/',
                sip_uri: 'sip:142606239271920703@app.plivo.com',
                sub_account: null
              }
            ]
          }
        });
      }
      else if (action == 'Application/1/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'changed',
            api_id: '5a9fcb68-582d-11e1-86da-6ff39efcb949'
          }
        });
      }
      else if (action == 'Application/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'created',
            app_id: '15784735442685051',
            api_id: '5a9fcb68-582d-11e1-86da-6ff39efcb949'
          }
        });
      }

      else if (action == 'Application/1/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
          }
        });
      }
      // =============  conferences ===================

      else if (action == 'Conference/MyConf/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            conference_name: 'MyConf',
            conference_run_time: '590',
            conference_member_count: '1',
            members: [
              {
                muted: false,
                member_id: '17',
                deaf: false,
                from: '1456789903',
                to: '1677889900',
                caller_name: 'John',
                direction: 'inbound',
                call_uuid: 'acfbf0b5-12e0-4d74-85f7-fce15f8f07ec',
                join_time: '590'
              }
            ],
            api_id: '816e903e-58c4-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (action == 'Conference/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48',
            conferences: [
              'My Conf Room'
            ]
          }
        });
      }

      else if (action == 'Conference/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            message: 'all conferences hung up',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (action == 'Conference/MyConf/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            message: 'conference hung up',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (action == 'Conference/MyConf/Member/1/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            message: 'hangup',
            member_id: '10',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (method == 'POST' && action == 'Conference/MyConf/Member/1/Kick/') {
        resolve({
          response: {},
          body: {
            message: 'kicked',
            member_id: '10',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (method == 'POST' && action == 'Conference/MyConf/Member/1/Mute/') {
        resolve({
          response: {},
          body: {
            message: 'muted',
            member_id: '10',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (method == 'DELETE' && action == 'Conference/MyConf/Member/1/Mute/') {
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method == 'POST' && action == 'Conference/MyConf/Member/1/Deaf/') {
        resolve({
          response: {},
          body: {
            message: 'deaf',
            member_id: '10',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (method == 'DELETE' && action == 'Conference/MyConf/Member/1/Deaf/') {
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method == 'POST' && action == 'Conference/MyConf/Member/1/Play/') {
        resolve({
          response: {},
          body: {
            message: 'play queued into conference',
            api_id: '4e44bd4e-f830-11e6-b886-067c5485c240',
            member_id: '[u\'160005\', u\'160004\', u\'160003\', u\'160002\']'
          }
        });
      }

      else if (method == 'DELETE' && action == 'Conference/MyConf/Member/1/Play/') {
        resolve({
          response: {},
          body: {
            message: 'playing in conference stopped',
            member_id: '10',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (method == 'POST' && action == 'Conference/MyConf/Member/1/Speak/') {
        resolve({
          response: {},
          body: {
            message: 'speak queued into conference',
            api_id: '8dd6820e-fe83-11e6-b6f4-061564b78b75',
            member_id: '[u\'all\']'
          }
        });
      }

      else if (method == 'DELETE' && action == 'Conference/MyConf/Member/1/Speak/') {
        resolve({
          response: {},
          body: {
            message: 'speak stopped',
            member_id: '10',
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48'
          }
        });
      }

      else if (method == 'DELETE' && action == 'Conference/MyConf/Record/') {
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method == 'POST' && action == 'Conference/MyConf/Record/') {
        resolve({
          response: {},
          body: {
            api_id: '2867b6e2-58c3-11e1-86da-adf28403fe48',
            message: 'conference recording started',
            recording_id: '93bc7c6a-3b2b-11e3',
            url: 'http://s3.amazonaws.com/recordings_2013/93bc7c6a-3b2b-11e3.mp3'
          }
        });
      }

      // ============= MultiPartyCalls ===============
      else if (method === 'GET' && action === 'MultiPartyCall/'){
        resolve({
          response: {},
          body: {
            "api_id": "d53ab14c-eddb-11ea-b02e-0242ac110003",
            "meta": {
              "count": 6,
              "limit": 20,
              "next": null,
              "offset": 0,
              "previous": null
            },
            "objects": [
              {
                "billed_amount": "0.00500",
                "billed_duration": 60,
                "creation_time": "2020-08-31 15:12:03+00:00",
                "duration": 3,
                "end_time": "2020-08-31 15:12:06+00:00",
                "friendly_name": "TestMPC",
                "mpc_uuid": "ca8e8a44-48e1-445d-afd5-1fcccdbccd9d",
                "participants": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_ca8e8a44-48e1-445d-afd5-1fcccdbccd9d/Participant/",
                "recording": null,
                "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_ca8e8a44-48e1-445d-afd5-1fcccdbccd9d/",
                "start_time": null,
                "status": "Ended",
                "stay_alone": false,
                "sub_account": null,
                "termination_cause": "No Active Participants",
                "termination_cause_code": 1000
              },
              {
                "billed_amount": "0.00500",
                "billed_duration": 60,
                "creation_time": "2020-08-31 14:32:40+00:00",
                "duration": 5,
                "end_time": "2020-08-31 14:32:45+00:00",
                "friendly_name": "TestMPC",
                "mpc_uuid": "9b531a1f-1692-4802-a7d6-3ef25bcfe3fc",
                "participants": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_9b531a1f-1692-4802-a7d6-3ef25bcfe3fc/Participant/",
                "recording": null,
                "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_9b531a1f-1692-4802-a7d6-3ef25bcfe3fc/",
                "start_time": null,
                "status": "Ended",
                "stay_alone": false,
                "sub_account": null,
                "termination_cause": "No Active Participants",
                "termination_cause_code": 1000
              },
              {
                "billed_amount": "0.01000",
                "billed_duration": 120,
                "creation_time": "2020-08-31 14:32:11+00:00",
                "duration": 11,
                "end_time": "2020-08-31 14:32:22+00:00",
                "friendly_name": "TestMPC",
                "mpc_uuid": "6f84d47c-ee82-4172-a155-c6e22f87d874",
                "participants": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_6f84d47c-ee82-4172-a155-c6e22f87d874/Participant/",
                "recording": null,
                "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_6f84d47c-ee82-4172-a155-c6e22f87d874/",
                "start_time": null,
                "status": "Ended",
                "stay_alone": false,
                "sub_account": null,
                "termination_cause": "Stay Alone Not Permitted",
                "termination_cause_code": 1010
              },
              {
                "billed_amount": "0.00500",
                "billed_duration": 60,
                "creation_time": "2020-08-31 14:31:20+00:00",
                "duration": 3,
                "end_time": "2020-08-31 14:31:23+00:00",
                "friendly_name": "TestMPC",
                "mpc_uuid": "0746f6c6-7447-4e0a-9013-186e4220aaf4",
                "participants": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_0746f6c6-7447-4e0a-9013-186e4220aaf4/Participant/",
                "recording": null,
                "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_0746f6c6-7447-4e0a-9013-186e4220aaf4/",
                "start_time": "2020-08-31 14:31:20+00:00",
                "status": "Ended",
                "stay_alone": false,
                "sub_account": null,
                "termination_cause": "No Active Participants",
                "termination_cause_code": 1000
              },
              {
                "billed_amount": "0.00500",
                "billed_duration": 60,
                "creation_time": "2020-08-31 06:42:50+00:00",
                "duration": 36,
                "end_time": "2020-08-31 06:43:26+00:00",
                "friendly_name": "TestMPC",
                "mpc_uuid": "b89150fd-0387-4bf8-bde7-a4fed39601ce",
                "participants": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_b89150fd-0387-4bf8-bde7-a4fed39601ce/Participant/",
                "recording": null,
                "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_b89150fd-0387-4bf8-bde7-a4fed39601ce/",
                "start_time": "2020-08-31 06:42:50+00:00",
                "status": "Ended",
                "stay_alone": false,
                "sub_account": null,
                "termination_cause": "No Active Participants",
                "termination_cause_code": 1000
              },
              {
                "billed_amount": "0.00500",
                "billed_duration": 60,
                "creation_time": "2020-08-28 17:30:10+00:00",
                "duration": 2,
                "end_time": "2020-08-28 17:30:12+00:00",
                "friendly_name": "tank",
                "mpc_uuid": "2999c70d-b635-420f-b6f2-2fd4421f0381",
                "participants": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_2999c70d-b635-420f-b6f2-2fd4421f0381/Participant/",
                "recording": null,
                "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_2999c70d-b635-420f-b6f2-2fd4421f0381/",
                "start_time": "2020-08-28 17:30:10+00:00",
                "status": "Ended",
                "stay_alone": true,
                "sub_account": null,
                "termination_cause": "No Active Participants",
                "termination_cause_code": 1000
              }
            ]
          }
        });
      }

      else if (method === 'GET' && action === 'MultiPartyCall/uuid_ca8e8a44-48e1-445d-afd5-1fcccdbccd9d'){
        resolve({
          response: {},
          body: {
            "api_id": "8970c2b3-edfb-11ea-b02e-0242ac110003",
            "billed_amount": "0.00500",
            "billed_duration": 60,
            "creation_time": "2020-08-31 15:12:03+00:00",
            "duration": 3,
            "end_time": "2020-08-31 15:12:06+00:00",
            "friendly_name": "TestMPC",
            "mpc_uuid": "ca8e8a44-48e1-445d-afd5-1fcccdbccd9d",
            "participants": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_ca8e8a44-48e1-445d-afd5-1fcccdbccd9d/Participant/",
            "recording": null,
            "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_ca8e8a44-48e1-445d-afd5-1fcccdbccd9d/",
            "start_time": null,
            "status": "Ended",
            "stay_alone": false,
            "sub_account": null,
            "termination_cause": "No Active Participants",
            "termination_cause_code": 1000
          }
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_Voice/Participant/' && params.role === 'Agent' && params.from === '+919090909090' && params.to === '+918309866821'){
        resolve({
          response: {},
          body: {
            "api_id": "1cebd713-ee00-11ea-b02e-0242ac110003",
            "calls": [
              {
                "to": "sip:koushikqa119062465586783372208@phone-qa.voice.plivodev.com",
                "from": "918888888888",
                "call_uuid": "c0267574-5c12-4861-8990-da9404c8cdf6"
              }
            ],
            "message": "add participant action initiated",
            "request_uuid": "c0267574-5c12-4861-8990-da9404c8cdf6"
          }
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_Voice/' && params.status === 'active'){
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method === 'DELETE' && action === 'MultiPartyCall/name_Voice/'){
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_TestMPC/Record/'){
        resolve({
          response: {},
          body: {
            "api_id" : "e9b9b0cf-ee0a-11ea-b02e-0242ac110003",
            "message" : "MPC: TestMPC record started",
            "recording_id" : "e9bd7634-ee0a-11ea-9ddf-06feebbe3347",
            "recording_url" : "https://media-qa.voice.plivodev.com/v1/Account/MAMDJMMTEZOWY0ZMQWM2/Recording/e9bd7634-ee0a-11ea-9ddf-06feebbe3347.mp3"
          }
        });
      }

      else if (method === 'DELETE' && action === 'MultiPartyCall/name_TestMPC/Record/'){
        resolve({
          response: {},
          body: {
          }
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_TestMPC/Record/Pause/'){
        resolve({
          response: {},
          body: {
          }
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_TestMPC/Record/Resume/'){
        resolve({
          response: {},
          body: {
          }
        });
      }

      else if (method === 'GET' && action === 'MultiPartyCall/uuid_12345678-90123456/Participant/'){
        resolve({
          response: {},
          body: {
            "api_id": "d53e6c49-ee0e-11ea-b02e-0242ac110003",
            "meta": {
              "count": 1,
              "limit": 20,
              "next": null,
              "offset": 0,
              "previous": null
            },
            "objects": [
              {
                "billed_amount": null,
                "billed_duration": null,
                "call_uuid": "426c1fb3-8f47-46e5-a916-51faa85ca90e",
                "coach_mode": false,
                "duration": null,
                "end_mpc_on_exit": false,
                "exit_cause": null,
                "exit_time": null,
                "hold": false,
                "join_time": "2020-09-03 17:24:12+00:00",
                "member_id": "2132",
                "mpc_uuid": "7503f05f-2d6e-4ab3-b9e6-3b0d81ae9087",
                "mute": false,
                "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_7503f05f-2d6e-4ab3-b9e6-3b0d81ae9087/Participant/2132/",
                "role": "agent",
                "start_mpc_on_enter": true
              }
            ]
          }
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/uuid_12345678-90123456/Participant/10/'){
        resolve({
          response: {},
          body: {
            "api_id" : "be5a333a-ee0f-11ea-b02e-0242ac110003",
            "hold" : "MPC: TestMPC hold/unhold member(s) succeded",
            "mute" : "MPC: TestMPC mute/unmute member(s) succeded"
          }
        });
      }

      else if (method === 'DELETE' && action === 'MultiPartyCall/uuid_12345678-90123456/Participant/10/'){
        resolve({
          response: {},
          body: {
          }
        });
      }

      else if (method === 'GET' && action === 'MultiPartyCall/uuid_7503f05f-2d6e-4ab3-b9e6-3b0d81ae9087/Participant/2132/'){
        resolve({
          response: {},
          body: {
            "api_id": "7ca274bb-ee11-11ea-b02e-0242ac110003",
            "billed_amount": null,
            "billed_duration": null,
            "call_uuid": "426c1fb3-8f47-46e5-a916-51faa85ca90e",
            "coach_mode": false,
            "duration": null,
            "end_mpc_on_exit": false,
            "exit_cause": null,
            "exit_time": null,
            "hold": false,
            "join_time": "2020-09-03 17:24:12+00:00",
            "member_id": "2132",
            "mpc_uuid": "7503f05f-2d6e-4ab3-b9e6-3b0d81ae9087",
            "mute": false,
            "resource_uri": "/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_7503f05f-2d6e-4ab3-b9e6-3b0d81ae9087/Participant/2132/",
            "role": "agent",
            "start_mpc_on_enter": true
          }
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_TestMPC/Participant/10/Record/'){
        resolve({
          response: {},
          body: {
            "api_id": "036c80f3-3721-11ec-a678-0242ac110002",
            "message": "MPC: TestMPC participant record started",
            "recording_id": "24670db8-c723-4ba2-8521-f10ec41ddf8b",
            "recording_url": "https://media-qa.voice.plivodev.com/v1/Account/MAXXXXXXXXXXXX/Recording/XXXXX-XXXX-XXXX-XXXXX.mp3"
          }
        });
      }

      else if (method === 'DELETE' && action === 'MultiPartyCall/name_TestMPC/Participant/10/Record/'){
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_TestMPC/Participant/10/Record/Pause/'){
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_TestMPC/Participant/10/Record/Resume/'){
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method === 'POST' && action === 'MultiPartyCall/name_TestMPC/Member/10/Play/'){
        resolve({
          response: {},
          body: {
            "api_id": "c07db813-3721-11ec-8bcd-0242ac110008",
            "message": "play queued into MPC",
            "mpcMemberId": [
              "1003"
            ],
            "mpcName": "TestMPC"
          }
        });
      }

      else if (method === 'DELETE' && action === 'MultiPartyCall/name_TestMPC/Member/10/Play/'){
        resolve({
          response: {},
          body: {}
        });
      }

      // =============  Numbers ===================
      else if (method == 'GET' && action == 'Number/+919999999990/') {
        resolve({
          response: {},
          body: {
            added_on: '2014-02-14',
            alias: null,
            api_id: '88625e5e-1c92-11e4-80aa-12313f048015',
            application: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/29986316244302815/',
            carrier: 'Plivo',
            monthly_rental_rate: '0.80000',
            number: '+919999999990',
            number_type: 'local',
            region: 'California, UNITED STATES',
            resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Number/17609915566/',
            sms_enabled: true,
            sms_rate: '0.00000',
            sub_account: null,
            voice_enabled: true,
            voice_rate: '0.00850'
          }
        });
      }

      else if (method == 'GET' && action == 'Number/') {
        resolve({
          response: {},
          body: {
            api_id: '114de006-1c95-11e4-8a4a-123140008edf',
            meta: {
              limit: 3,
              next: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Number/?limit=3&offset=3',
              offset: 0,
              previous: null,
              total_count: 20
            },
            objects: [{
              added_on: '2014-08-05',
              alias: null,
              application: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/29986316244302815/',
              carrier: 'Plivo',
              monthly_rental_rate: '0.80000',
              number: '18135401302',
              number_type: 'local',
              region: 'Florida, UNITED STATES',
              resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Number/18135401302/',
              sms_enabled: true,
              sms_rate: '0.00000',
              sub_account: null,
              voice_enabled: true,
              voice_rate: '0.00850'
            }]
          }
        });
      }

      else if (method == 'POST' && action == 'Number/') {
        resolve({
          response: {},
          body: {
            message: 'changed',
            api_id: '5a9fcb68-582d-11e1-86da-6ff39efcb949'
          }
        });
      }

      else if (method == 'POST' && action == 'Number/+919999999990/') {
        resolve({
          response: {},
          body: {
            message: 'changed',
            api_id: '5a9fcb68-582d-11e1-86da-6ff39efcb949'
          }
        });
      }

      else if (method == 'DELETE' && action == 'Number/+919999999990/') {
        resolve({
          response: {},
          body: {}
        });
      }

      else if (method == 'GET' && action == 'PhoneNumber/') {
        resolve({
          response: {},
          body: {
            api_id: '859428b0-1c88-11e4-a2d1-22000ac5040c',
            meta: {
              limit: 20,
              next: null,
              offset: 0,
              previous: null,
              total_count: 9
            },
            objects: [
              {
                country: 'UNITED STATES',
                lata: 722,
                monthly_rental_rate: '0.80000',
                number: '14154009186',
                type: 'fixed',
                prefix: '415',
                rate_center: 'SNFC CNTRL',
                region: 'United States',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/PhoneNumber/14154009186/',
                restriction: null,
                restriction_text: null,
                setup_rate: '0.00000',
                sms_enabled: true,
                sms_rate: '0.00800',
                voice_enabled: true,
                voice_rate: '0.00500'
              },
              {
                country: 'UNITED STATES',
                lata: 722,
                monthly_rental_rate: '0.80000',
                number: '14154009187',
                type: 'fixed',
                prefix: '415',
                rate_center: 'SNFC CNTRL',
                region: 'United States',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/PhoneNumber/14154009187/',
                restriction: null,
                restriction_text: null,
                setup_rate: '0.00000',
                sms_enabled: true,
                sms_rate: '0.00800',
                voice_enabled: true,
                voice_rate: '0.00500'
              }
            ]
          }
        });
      }

      else if (method == 'POST' && action == 'PhoneNumber/+919999999990/') {
        resolve({
          response: {},
          body: {
            api_id: 'aa52882c-1c88-11e4-bd8a-12313f016a39',
            message: 'created',
            numbers: [
              {
                number: '14154009186',
                status: 'Success'
              }
            ],
            status: 'fulfilled'
          }
        });
      }
      // =============  Endpoint ===================

      else if (action == 'Endpoint/1/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            alias: 'zumba',
            api_id: '39015de8-4fb3-11e4-a2d1-22000ac5040c',
            application: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/379619814477342321/',
            endpoint_id: '1',
            password: '8bc0002a467b8276aaaf47e92bc46b9f',
            resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Endpoint/39452475478853/',
            sip_registered: 'false',
            sip_uri: 'sip:zumba141009125224@phone.plivo.com',
            sub_account: null,
            username: 'zumba141009125224'
          }
        });
      }
      else if (action == 'Endpoint/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            api_id: '30a0c8c2-110c-11e4-bd8a-12313f016a39',
            meta: {
              limit: 20,
              next: null,
              offset: 0,
              previous: null,
              total_count: 11
            },
            objects: [
              {
                alias: 'callme',
                application: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/33406267401237901/',
                endpoint_id: '32866729519064',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Endpoint/32866729519064/',
                sip_contact: 'sip:callme140703093224@122.172.71.207:57563;ob',
                sip_expires: '2014-07-21 19:26:08',
                sip_registered: 'true',
                sip_uri: 'sip:callme140703093944@phone.plivo.com',
                sip_user_agent: 'Telephone 1.1.4',
                sub_account: null,
                username: 'callme140703093944'
              },
              {
                alias: 'polycom',
                application: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Application/37961981447734951/',
                endpoint_id: '17551316589618',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Endpoint/17551316589618/',
                sip_registered: 'false',
                sip_uri: 'sip:polycom140506175228@phone.plivo.com',
                sub_account: null,
                username: 'polycom140506175448'
              }
            ]
          }
        });
      }
      else if (action == 'Endpoint/1/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'changed',
            api_id: 'd8f9ea6c-58cc-11e1-86da-adf28403fe48'
          }
        });
      }
      else if (action == 'Endpoint/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            username: 'zumba131031145958',
            alias: 'zumba',
            message: 'created',
            endpoint_id: '37371860103666',
            api_id: '1c13de4c-423d-11e3-9899-22000abfa5d5'
          }
        });
      }

      else if (action == 'Endpoint/1/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            message: 'changed',
            api_id: 'd8f9ea6c-58cc-11e1-86da-adf28403fe48'
          }
        });
      }

      // =============  Message ===================
      else if (action == 'Media/0178eb8a-461a-4fd1-bc37-13eebfdc0676/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            content_type: 'application/pdf',
            media_id: '0178eb8a-461a-4fd1-bc37-13eebfdc0676',
            media_url: 'https://xxxxxxx/Account/{auth_id}/Message/24d742b9-9b12-4397-93a7-da496bc874d9/Media/0178eb8a-461a-4fd1-bc37-13eebfdc0676',
            message_uuid: '24d742b9-9b12-4397-93a7-da496bc874d9',
            size: '433994'
          }
        });
      }
      else if (action =='Media/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            api_id: '035eeada-6df1-11e6-b608-06a72a185e87',
            message_uuid: 'message_uuid',
            objects: [
                {
                    content_type: 'application/pdf',
                    media_id: '0178eb8a-461a-4fd1-bc37-13eebfdc0676',
                    media_url: 'https://xxxxxxx/Account/{auth_id}/Message/24d742b9-9b12-4397-93a7-da496bc874d9/Media/0178eb8a-461a-4fd1-bc37-13eebfdc0676',
                    message_uuid: '24d742b9-9b12-4397-93a7-da496bc874d9',
                    size: '433994'
                }
            ]
        }
        });
      }
      else if (action == '10dlc/Brand/BRPXS6E/' && method == 'GET'){
        resolve({
          response: {},
          body: {
              api_id: "4bac497c-b963-11ec-b7ca-0242ac110002",
              brand: {
                  address: {
                      city: "New York",
                      country: "IN",
                      postal_code: "10001",
                      state: "NY",
                      street: "123"
                  },
                  authorized_contact: {
                      email: "vishnu@plivo.com",
                      first_nam: "vishnu",
                      last_name: "Doe",
                      phone: "919742763781",
                      seniority: "admin",
                      title: "Doe"
                  },
                  brand_id: "B1QSGGS",
                  ein_issuing_country: "IN",
                  entity_type: "SOLE_PROPRIETOR",
                  profile_uuid: "3cf3e991-2f94-4910-9712-61442987a2d0",
                  registration_status: "COMPLETED",
                  vertical: "ENTERTAINMENT"
              }
          }
        });
      }
      else if (action == '10dlc/Brand/BRPXS6E/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            api_id: "4bac497c-b963-11ec-b7ca-0242ac110002",
            brand_id: "BRPXS6E"
          }
        });
      }
      else if (action == '10dlc/Brand/BRPXS6E/usecases/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            "api_id": "dbc70630-3296-11ed-9b52-0242ac110004",
            "use_cases": [
              {
                "name": "Starter",
                "code": "STARTER",
                "details": "Low cost campaign type designed for individuals and small businesses"
              }
            ],
            "brand_id": "BRPXS6E"
          }
        });
      }
      else if(action == 'Profile/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: "97a1c5ee-b019-11ec-88b1-0242ac110002",
            count: 10,
            limit: 2,
            offset: 0,
            profiles: [
                  {
                      alt_business_id_type: "NONE",
                      authorized_contact: {
                          email: "johndoe.com",
                          name: "John Doe",
                          seniority: "admin",
                          title: "Doe"
                      },
                      company_name: "ABC Inc.",
                      customer_type: "RESELLER",
                      ein_issuing_country: "US",
                      entity_type: "PUBLIC_PROFIT",
                      profile_alias: "vishnu1",
                      profile_type: "SECONDARY",
                      profile_uuid: "1c41faed-a38e-42a3-a966-fe7df34b51b9",
                      stock_symbol: "ABC",
                      vertical: "ENERGY"
                  },
                  {
                      alt_business_id_type: "NONE",
                      authorized_contact: {
                          email: "johndoe.com",
                          name: "John Doe",
                          seniority: "admin",
                          title: "Doe"
                      },
                      company_name: "ABC Inc.",
                      customer_type: "RESELLER",
                      ein_issuing_country: "US",
                      entity_type: "SOLE_PROPRIETOR",
                      profile_alias: "vishnu1",
                      profile_type: "SECONDARY",
                      profile_uuid: "1d77a5fe-bca4-4a6d-a7c4-58b70e8cd7a2",
                      stock_symbol: "ABC",
                      vertical: "ENERGY"
                  }
              ]
          }
        });
      }
      else if(action == 'Profile/06ecae31-4bf8-40b9-ac62-e902418e9935/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: "63287a98-b018-11ec-bc21-0242ac110002",
            profile: {
                alt_business_id_type: "NONE",
                authorized_contact: {
                    name: " "
                },
                company_name: "ABC Inc.",
                customer_type: "RESELLER",
                ein: "111111111",
                ein_issuing_country: "US",
                entity_type: "PUBLIC_PROFIT",
                profile_alias: "vishnu1",
                profile_type: "SECONDARY",
                profile_uuid: "06ecae31-4bf8-40b9-ac62-e902418e9935",
                stock_symbol: "ABC",
                vertical: "ENERGY"
            }
          }
        });
      }
      else if(action == 'Profile/06ecae31-4bf8-40b9-ac62-e902418e9935/' && method == 'DELETE'){
        resolve({
          response: {},
          body: {
            api_id: "eb1e71ae-b01e-11ec-88b1-0242ac110002"
          }
        });
      }
      else if(action == 'Profile/06ecae31-4bf8-40b9-ac62-e902418e9935/' && method == 'POST'){
        resolve({
          response: {},
          body: {
            api_id: "15783daa-b01e-11ec-88b1-0242ac110002",
            profile: {
                address: "123 New York NY 10001 IN",
                alt_business_id_type: "NONE",
                authorized_contact: {
                    email: "Doe",
                    name: "Joh11n Doe",
                    seniority: "admin",
                    title: "Doe"
                },
                company_name: "ABC Inc.",
                customer_type: "RESELLER",
                ein_issuing_country: "US",
                entity_type: "PRIVATE_PROFIT",
                primary_profile: "303edff6-8525-43e5-87e6-48c571ddca25",
                profile_alias: "vishnu1",
                profile_type: "SECONDARY",
                profile_uuid: "1c41faed-a38e-42a3-a966-fe7df34b51b9",
                stock_symbol: "ABC",
                vertical: "PROFESSIONAL",
                website: "google.com"
            }
          }
        });
      }
      else if(action == 'Profile/' && method == 'POST'){
        resolve({
          response: {},
          body: {
            api_id: "99ab47ae-b01c-11ec-bc21-0242ac110002",
            profile_uuid: "43d0616e-d50a-445a-a84e-310a089f0618"
          }
        });
      }
      else if (action == '10dlc/Campaign/CMPT4EP/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: "12ae5a32-3751-11ec-8e4c-0242ac110002",
            campaign: {
                brand_id: "BHYYNCK",
                campaign_id: "CMPT4EP",
                mno_metadata: {
                    AT_T: {
                        tpm: 4500
                    },
                    T_Mobile: {
                        brand_tier: "TOP"
                    },
                    Verizon_Wireless: {}
                },
                reseller_id: "RPDPPUM",
                usecase: "ACCOUNT_NOTIFICATION",
                sub_usecase: "2FA,ACCOUNT_NOTIFICATION"
            }
          }
        });
      }
      else if (action == '10dlc/Campaign/CMPT4EP/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            api_id: "12ae5a32-3751-11ec-8e4c-0242ac110002",
            campaign_id: "CMPT4EP",
            message: "Campaign Deactivated"
          }
        });
      }
      else if (action == '10dlc/Campaign/CMPT4EP/' && method == 'POST'){
        resolve({
          response: {},
          body: {
            api_id: "12ae5a32-3751-11ec-8e4c-0242ac110002",
            campaign: {
                brand_id: "BHYYNCK",
                campaign_id: "CMPT4EP",
                mno_metadata: {
                    AT_T: {
                        tpm: 4500
                    },
                    T_Mobile: {
                        brand_tier: "TOP"
                    },
                    Verizon_Wireless: {}
                },
                reseller_id: "RPDPPUM",
                usecase: "ACCOUNT_NOTIFICATION",
                sub_usecase: "2FA,ACCOUNT_NOTIFICATION"
            }
          }
        });
      }
      else if (action == '10dlc/Brand/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: "b9df43c0-374c-11ec-97b3-0242ac110002",
            brands: [
              {
                address: {
                    city: "",
                    country: "",
                    postal_code: "",
                    state: "",
                    street: ""
                },
                authorized_contact: {},
                brand_alias: "Ren_With_Vetting",
                brand_id: "BXZRASW",
                company_name: "Ren_With_Vetting",
                ein: "2342334534231",
                ein_issuing_country: "IN",
                entity_type: "NON_PROFIT",
                registration_status: "COMPLETED",
                vertical: "COMMUNICATION",
                vetting_score: 80,
                vetting_status: "ACTIVE",
                website: "www.renold.com"
            },
            {
                address: {
                    city: "",
                    country: "",
                    postal_code: "",
                    state: "",
                    street: ""
                },
                authorized_contact: {},
                brand_alias: "CSP Testing 003",
                brand_id: "BMIORKY",
                company_name: "CSP Testing 003",
                ein: "234234234",
                ein_issuing_country: "IN",
                entity_type: "PUBLIC_PROFIT",
                registration_status: "COMPLETED",
                vertical: "COMMUNICATION",
                vetting_score: 80,
                vetting_status: "ACTIVE",
                website: "www.standard1.com"
            }
            ]
          }
        });
      }
      else if (action == '10dlc/Campaign/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: "5e639fd0-374e-11ec-8e4c-0242ac110002",
            campaigns: [
                {
                    brand_id: "BHYYNCK",
                    campaign_id: "CMPT4EP",
                    mno_metadata: {
                        AT_T: {
                            tpm: 4500
                        },
                        T_Mobile: {
                            brand_tier: "TOP"
                        },
                        Verizon_Wireless: {}
                    },
                    reseller_id: "RPDPPUM",
                    usecase: "ACCOUNT_NOTIFICATION",
                    sub_usecase: "2FA,ACCOUNT_NOTIFICATION"
                },
                {
                    brand_id: "B8OD95Z",
                    campaign_id: "CAIKXXT",
                    mno_metadata: {
                        AT_T: {
                            tpm: 4500
                        },
                        T_Mobile: {
                            brand_tier: "TOP"
                        },
                        US_Cellular: {},
                        Verizon_Wireless: {}
                    },
                    reseller_id: "",
                    usecase: "MIXED",
                    sub_usecase: "2FA,ACCOUNT_NOTIFICATION"
                }
            ]
          }
        });
      }
      else if (action == '10dlc/Brand/' && method == 'POST'){
        resolve({
          response: {},
          body: {
              api_id: "ab2e4754-b951-11ec-b7ca-0242ac110002",
              brand_id: "B1QSGGS",
              message: "Request to create brand was received and is being processed."
          }
        });
      }
      else if (action == '10dlc/Campaign/' && method == 'POST'){
        resolve({
          response: {},
          body: {
            apiId: '5b058374-bba8-11ec-ab4d-0242ac110002',
            campaignId: 'CFSOBZQ',
            message: 'Request to create campaign was received and is being processed.'
          }
        });
      }
      else if (action == 'Powerpack/5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            applicationId: '33660394121755210',
            applicationType: 'XML',
            createdOn: '2019-09-03T08:50:09.510692Z',
            localConnect: false,
            name: 'vishnu_sep_01',
            numberPool: '/v1/Account/xxxx/NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/',
            stickySender: true,
            uuid: '5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46'
          }
        });
      }
      else if (action == 'Powerpack/' && method == 'POST'){
        resolve({
          response: {},
          body: {
            applicationId: '33660394121755210',
            applicationType: 'XML',
            createdOn: '2019-09-03T08:50:09.510692Z',
            localConnect: false,
            name: 'node sdk test',
            numberPool: '/v1/Account/xxxx/NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/',
            stickySender: true,
            uuid: '5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46'
          }
        });
      }
      else if (action =='Message/xyz/Media/' && method == 'Get'){
        resolve({
          response: {},
          body: {
            api_id: '035eeada-6df1-11e6-b608-06a72a185e87',
            message_uuid: 'message_uuid',
            objects: [
                {
                    content_type: 'application/pdf',
                    media_id: '0178eb8a-461a-4fd1-bc37-13eebfdc0676',
                    media_url: 'https://xxxxxxx/Account/{auth_id}/Message/24d742b9-9b12-4397-93a7-da496bc874d9/Media/0178eb8a-461a-4fd1-bc37-13eebfdc0676',
                    message_uuid: '24d742b9-9b12-4397-93a7-da496bc874d9',
                    size: '433994'
                }
            ]
        }
        });
      }
      else if(action =='Message/xyz/' && method =='GET'){
        resolve({
          response: {},
          body: {
            api_id: '035eeada-6df1-11e6-b608-06a72a185e87',
            error_code: '200',
            from_number: '18552828641',
            message_direction: 'outbound',
            message_state: 'failed',
            message_time: '2016-08-17 21:22:36+05:30',
            message_type: 'sms',
            message_uuid: '1',
            resource_uri: '/v1/Account/{auth_id}/Message/2a340179-e8a9-4b1d-ae2c-9f346e7b6d7d/',
            to_number: '19352326448',
            total_amount: '0.00000',
            total_rate: '0.00350',
            units: 1,
            requester_ip: "192.168.1.1"
          }
        });
      }
      else if (action =='NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Number/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: '0dacbefa-0a87-11ea-b072-0242ac110007',
            uuid: 'd35f2e82-d387-427f-8594-6fa07613c43a',
            number_pool: '/v1/Account/{auth_id}/NumberPool/d35f2e82-d387-427f-8594-6fa07613c43a/',
            meta: {
                limit: 20,
                next: '',
                offset: 0,
                previous: '',
                total_count: 3
            },
            objects: [
                {
                    account_phone_number_resource: '/v1/Account/{auth_id}/Number/{your_number}/',
                    added_on: '2019-10-09T11:24:35.085797Z',
                    country_iso2: 'US',
                    number: '{your_number}',
                    number_pool_uuid: 'd35f2e82-d387-427f-8594-6fa07613c43a',
                    type: 'fixed'
                },
                {
                    account_phone_number_resource: '/v1/Account/{auth_id}/Number/{your_number}/',
                    added_on: '2019-10-09T11:24:35.085797Z',
                    country_iso2: 'US',
                    number: '{your_number}',
                    number_pool_uuid: 'd35f2e82-d387-427f-8594-6fa07613c43a',
                    type: 'fixed'
                },
                {
                    account_phone_number_resource: '/v1/Account/{auth_id}/Number/{your_number}/',
                    added_on: '2019-10-09T11:24:35.085797Z',
                    country_iso2: 'CA',
                    number: '{your_number}',
                    number_pool_uuid: 'd35f2e82-d387-427f-8594-6fa07613c43a',
                    type: 'fixed'
                }
            ]
          }
        });
      }
      else if (action=='Powerpack/5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46/' && method == 'DELETE'){
        resolve({
          response: {},
          body: {
            api_id: '964edb6e-3f08-11e7-920b-0600a1193e9b',
            response: 'success'
          }
        });
      }
      else if (action=='NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Number/14845733595/' && method =='POST'){
        resolve({
          response: {},
          body: {
            account_phone_number_resource: '/v1/Account/<auth_id>/Number/<your_number>/',
            added_on: '2019-10-09T11:24:35.085797Z',
            api_id: '612982e8-0a87-11ea-b072-0242ac110007',
            country_iso2: 'CA',
            number: '14845733595',
            uuid: 'ca5fd1f2-26c0-43e9-a7e4-0dc426e9dd2f',
            number_pool_uuid: '659c7f88-c819-46e2-8af4-2d8a84249099',
            number_pool: '/v1/Account/xxxxx/NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/',
            type: 'fixed'
          }
        });
      }
      else if(action=='NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Number/14845733595/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            account_phone_number_resource: '/v1/Account/<auth_id>/Number/<your_number>/',
            added_on: '2019-10-09T11:24:35.085797Z',
            api_id: '612982e8-0a87-11ea-b072-0242ac110007',
            country_iso2: 'CA',
            number: '14845733595',
            uuid: 'ca5fd1f2-26c0-43e9-a7e4-0dc426e9dd2f',
            number_pool_uuid: '659c7f88-c819-46e2-8af4-2d8a84249099',
            number_pool: '/v1/Account/xxxxx/NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/',
            type: 'fixed'
          }
        });
      }
      else if (action=='NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Shortcode/444444/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            added_on: '2019-09-03T08:50:09.578928Z',
            country_iso2: 'CA',
            number_pool_uuid: '659c7f88-c819-46e2-8af4-2d8a84249099',
            shortCode: '444444'
          }
        });
      }
      else if (action =='NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Shortcode/' && method =='GET'){
        resolve({
          response: {},
          body: {
            api_id: '614b2776-0a88-11ea-b072-0242ac110007',
            uuid: 'ca5fd1f2-26c0-43e9-a7e4-0dc426e9dd2f',
            number_pool: '/v1/Account/xxxxxxxxx/NumberPool/ca5fd1f2-26c0-43e9-a7e4-0dc426e9dd2f/',
            meta: {
              limit: 20,
              offset: 0,
              next: '',
              previous: '',
              total_count: 1
            },
            objects: [
                {
                    added_on: '2019-10-09T11:10:59.741978Z',
                    country_iso2: 'US',
                    number_pool_uuid: 'ca5fd1f2-26c0-43e9-a7e4-0dc426e9dd2f',
                    shortcode: '444444'
                }
            ]
          }
        });

      }
      else if(action == 'NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Tollfree/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: 'ff25223a-1c9f-11e4-80aa-12313f048015',
            meta: {
                limit: 20,
                next: null,
                offset: 0,
                previous: null,
                total_count: 0
              },
              objects: [
                {
                  added_on: '2019-10-09T11:10:59.741978Z',
                  country_iso2: 'US',
                  number_pool_uuid: '659c7f88-c819-46e2-8af4-2d8a84249099',
                  tollfree: '{your_tollfree}'
                },
            ]
          }
        });
      }
      else if(action == 'NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Tollfree/18772209942/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            added_on: '2019-09-03T08:50:09.578928Z',
            country_iso2: 'CA',
            number_pool_uuid: '659c7f88-c819-46e2-8af4-2d8a84249099',
            number: '18772209942'
          }
        });
      }
      else if(action == 'NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Tollfree/18772209942/' && method == 'POST'){
        resolve({
          response: {},
          body: {
            added_on: '2019-09-03T08:50:09.578928Z',
            country_iso2: 'CA',
            number_pool_uuid: '659c7f88-c819-46e2-8af4-2d8a84249099',
            number: '18772209942'
          }
        });
      }
      else if(action=='NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Tollfree/18772209942/' && method =='DELETE') {
        resolve({
          response: {},
          body: {
            api_id: '964edb6e-3f08-11e7-920b-0600a1193e9b',
            response: 'success'
          }
        });
      }
      else if (action=='NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/Shortcode/444444/' && method == 'DELETE'){
        resolve({
          response: {},
          body: {
            api_id: '964edb6e-3f08-11e7-920b-0600a1193e9b',
            response: 'success'
          }
        });
      }
      else if (action == 'Powerpack/' && method == 'GET'){
        resolve({
          response: {},
          body: {
            api_id: 'ff25223a-1c9f-11e4-80aa-12313f048015',
            meta: {
                limit: 20,
                next: null,
                offset: 0,
                previous: null,
                total_count: 0
              },
              objects: [
                {
                    applicationId: '33660394121755210',
                    applicationType: 'XML',
                    createdOn: '2019-09-03T08:50:09.510692Z',
                    localConnect: false,
                    name: 'vishnu_sep_01',
                    numberPool: '/v1/Account/xxxx/NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/',
                    stickySender: true,
                    uuid: '86bbb125-97bb-4d72-89fd-81d5c515b015'
                },
                {
                  applicationId: '33660394121755210',
                  applicationType: 'XML',
                  createdOn: '2019-09-03T08:50:09.510692Z',
                  localConnect: false,
                  name: 'Neel_sep_01',
                  numberPool: '/v1/Account/xxxx/NumberPool/659c7f88-c819-46e2-8af4-2d8a84249099/',
                  stickySender: true,
                  uuid: '86bbb125-97bb-4d72-89fd-81d5c515b015'
                }
            ]
          }
        });
      }
      else if (action == 'Message/1/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            api_id: '035eeada-6df1-11e6-b608-06a72a185e87',
            error_code: '200',
            from_number: '18552828641',
            message_direction: 'outbound',
            message_state: 'failed',
            message_time: '2016-08-17 21:22:36+05:30',
            message_type: 'sms',
            message_uuid: '1',
            resource_uri: '/v1/Account/{auth_id}/Message/2a340179-e8a9-4b1d-ae2c-9f346e7b6d7d/',
            to_number: '19352326448',
            total_amount: '0.00000',
            total_rate: '0.00350',
            units: 1,
            requester_ip: '192.168.1.2'
          }
        });
      }
      else if (action == 'Message/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            api_id: '88415194-6df0-11e6-b608-06a72a185e87',
            meta: {
              limit: 20,
              next: '/v1/Account/{auth_id}/Message/?limit=20&error_code=200&offset=20',
              offset: 0,
              previous: null
            },
            objects: [
              {
                error_code: '200',
                from_number: '18552828641',
                message_direction: 'outbound',
                message_state: 'failed',
                message_time: '2016-08-17 21:26:44+05:30',
                message_type: 'sms',
                message_uuid: '85ce8068-6fab-4f0a-9dc7-d6c852cdde91',
                resource_uri: '/v1/Account/{auth_id}/Message/85ce8068-6fab-4f0a-9dc7-d6c852cdde91/',
                to_number: '19352326448',
                total_amount: '0.00000',
                total_rate: '0.00350',
                units: 1,
                requester_ip: "192.168.1.1"
              },
              {
                error_code: '200',
                from_number: '18552828641',
                message_direction: 'outbound',
                message_state: 'failed',
                message_time: '2016-08-17 21:22:36+05:30',
                message_type: 'sms',
                message_uuid: '2a340179-e8a9-4b1d-ae2c-9f346e7b6d7d',
                resource_uri: '/v1/Account/{auth_id}/Message/2a340179-e8a9-4b1d-ae2c-9f346e7b6d7d/',
                to_number: '19352326448',
                total_amount: '0.00000',
                total_rate: '0.00350',
                units: 1,
                requester_ip: "192.168.1.2"
              }
            ]
          }
        });
      }
      else if (action == 'Message/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'message(s) queued',
            message_uuid: ['db3ce55a-7f1d-11e1-8ea7-1231380bc196'],
            api_id: 'db342550-7f1d-11e1-8ea7-1231380bc196'
          }
        });
      }

      // ============= Lookup ===================
      else if (action == 'Number//' && method == 'GET') {
        resolve({
          response: {},
	  body: {
	    api_id: "930692a3-6f09-45b5-80f5-5585565fb30e",
            phone_number: "+14154305555",
	    country: {
		iso2: "US",
		iso3: "USA",
		name: "United States"
	    },
	    format: {
		e164: "+14154305555",
		international: "+1 415-430-5555",
		national: "(415) 430-5555",
		rfc3966: "tel:+1-415-430-5555"
	    },
	    carrier: {
		mobile_country_code: "310",
		mobile_network_code: "160",
		name: "Cingular Wireless",
		ported: "yes",
		type: "mobile"
	    },
            resource_uri: "/v1/Number/+14154305555?type=carrier"
	  }
        });
      }

      // =============  Pricings ===================
      else if (method == 'GET' && action == 'Pricing/') {
        resolve({
          response: {},
          body: {
            api_id: '25b3d816-1c9f-11e4-bd8a-12313f016a39',
            country: 'United States',
            country_code: 1,
            country_iso: 'US',
            message: {
              inbound: {
                rate: '0.00000'
              },
              outbound: {
                rate: '0.00650'
              },
              outbound_networks_list: [
                {
                  group_name: 'US',
                  rate: '0.00650'
                },
                {
                  group_name: 'US',
                  rate: '0.00650'
                }
              ]
            },
            phone_numbers: {
              local: {
                rate: '0.80000'
              },
              tollfree: {
                rate: '1.00000'
              }
            },
            voice: {
              inbound: {
                ip: {
                  rate: '0.00300'
                },
                local: {
                  rate: '0.00850'
                },
                tollfree: {
                  rate: '0.02100'
                }
              },
              outbound: {
                ip: {
                  rate: '0.00300'
                },
                local: {
                  rate: '0.01200'
                },
                rates: [
                  {
                    prefix: [
                      '1'
                    ],
                    rate: '0.01200'
                  },
                  {
                    prefix: [
                      '1340'
                    ],
                    rate: '0.02400'
                  },
                  {
                    prefix: [
                      '1808'
                    ],
                    rate: '0.03400'
                  },
                  {
                    prefix: [
                      '1907'
                    ],
                    rate: '0.17900'
                  },
                  {
                    prefix: [
                      '1900'
                    ],
                    rate: '0.60300'
                  }
                ],
                tollfree: {
                  rate: '0.00300'
                }
              }
            }
          }
        });
      }
      // =============  Recordings ===================
      else if (method == 'GET' && action == 'Recording/1/') {
        resolve({
          response: {},
          body: {
            add_time: '2014-08-05 16:15:15.852059+05:30',
            api_id: '7abf0744-1ca0-11e4-a2d1-22000ac5040c',
            call_uuid: 'c2c128e2-1c8c-11e4-9bff-1db8a9db0432',
            conference_name: 'noname',
            recording_duration_ms: '345100.00000',
            recording_end_ms: '1407235509007.00000',
            recording_format: 'mp3',
            recording_id: '1',
            recording_start_ms: '1407235163907.00000',
            recording_type: 'conference',
            recording_url: 'http://s3.amazonaws.com/recordings_2013/c2186400-1c8c-11e4-a664-0026b945b52x.mp3',
            resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Recording/c2186400-1c8c-11e4-a664-0026b945b52x/',
            from_number: '+919999323467',
            to_number: '+919891865130',
          }
        });
      }

      else if (method == 'GET' && action == 'Recording/') {
        resolve({
          response: {},
          body: {
            api_id: 'ff25223a-1c9f-11e4-80aa-12313f048015',
            meta: {
              limit: 3,
              next: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Recording/?limit=3&offset=3',
              offset: 0,
              previous: null,
              total_count: 948
            },
            objects: [
              {
                add_time: '2014-08-05 16:15:15.852059+05:30',
                call_uuid: 'c2c128e2-1c8c-11e4-9bff-1db8a9db0432',
                conference_name: 'noname',
                recording_duration_ms: '345100.00000',
                recording_end_ms: '1407235509007.00000',
                recording_format: 'mp3',
                recording_id: 'c2186400-1c8c-1124-a664-0026b945b522',
                recording_start_ms: '1407235163907.00000',
                recording_type: 'conference',
                recording_url: 'http://s3.amazonaws.com/recordings_2013/c2186400-1c8c-1124-a664-0026b945b522.mp3',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Recording/c2186400-1c8c-1124-a664-0026b945b522/',
                from_number: '+919999323467',
                to_number: '+919891865130',
              },
              {
                add_time: '2014-08-05 16:05:21.993853+05:30',
                call_uuid: 'fc773e88-1c8b-11e4-b25a-0fe7bcc54670',
                conference_name: 'noname',
                recording_duration_ms: '90700.00000',
                recording_end_ms: '1407234920253.00000',
                recording_format: 'mp3',
                recording_id: 'fc2716b0-1c8b-11e4-bwad-842b2b17453e',
                recording_start_ms: '1407234829553.00000',
                recording_type: 'conference',
                recording_url: 'http://s3.amazonaws.com/recordings_2013/fc2716b0-1c8b-11e4-bwad-842b2b17453e.mp3',
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Recording/fc2716b0-1c8b-11e4-bwad-842b2b17453e/',
                from_number: '+919999323467',
                to_number: '+919891865130',
              }
            ]
          }
        });
      }

      else if (method == 'DELETE' && action == 'Recording/1/') {
        resolve({
          response: {},
          body: {}
        });
      }

      // =========== PHLO ============================
      // Get phlo details
      else if (method == 'GET' && action == 'phlo/sample-phlo-id/') {
        resolve({
          response: {},
          body: {
            api_id: '719d8763-f62c-4322-98e2-eed26b85ea8a',
            phlo_id: 'sample-phlo-id',
            name: 'mpc_test',
            created_on: '2018-11-14 04:41:31.827796+00:00'
          }
        });
      }
      // Run Phlo
      else if (method == 'POST' && action.endsWith('phlo/sample-phlo-id')) {
        resolve({
          response: {},
          body: {
            phlo_id: 'sample-phlo-id',
            api_id: '275c24f5-7d64-4130-9a4e-148438154549',
            message:
              'stopped. next node uuid not found for b\'Start\' - b\'Start\' with output state: http - phlo_run_id 275c24f5-7d64-4130-9a4e-148438154549'
          }
        });
      }

      // =========== PHLO MULTI PARTY CALL ============================
      else if (method == 'GET' && action == 'phlo/sample-phlo-id/multi_party_call/sample-mpc-id/') {
        resolve({
          response: {},
          body: {
            api_id: 'ea4811e0-b949-489b-8e4a-9dee03fada6e',
            node_id: 'sample-mpc-id',
            phlo_id: 'sample-phlo-id',
            name: 'Multi-Party Call_2',
            node_type: 'multi_party_call',
            created_on: '2018-12-04 03:22:20.763091+00:00'
          }
        });
      }
      else if (method == 'POST' && action == 'phlo/sample-phlo-id/multi_party_call/sample-mpc-id') {
        resolve({
          response: {},
          body: { api_id: '0c449a01-f34f-4e6e-940e-caea79ce58b2', error: '' }
        });
      }

      // =========== PHLO MULTI PARTY CALL Member Methods ============================
      else if (method == 'POST' && action == 'phlo/sample-phlo-id/multi_party_call/sample-mpc-id/members/919920700964') {
        resolve({
          response: {},
          body: {
            api_id: '1304225e-294e-465f-af50-abf71a5903de',
            error: ''
          }
        });
      }

      // =========== If no combination found, raise issue ============================
      else {
        console.log('===>--->', method, action, '=>', params);
        reject(new Error('not found'));
      }
    });
  };
}
