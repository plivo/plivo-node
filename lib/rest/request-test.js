import request from 'request';
import queryString from 'querystring';

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
      if (method === 'GET' && action === 'Call/6653422-91b6-4716-9fad-9463daaeeec2/' && params.status === 'live') {
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
            "session_start": "2014-03-23 14:49:39.722551"
          }
        });
      }

      else if (method === 'GET' && action === 'Call/' && params.status === 'live') {
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

      else if (method === 'DELETE' && action === 'Request/1/') {
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
            objects: []
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
      else if (action == 'Call/1/' && method == 'GET') {
        resolve({
          response: {},
          body: {
            id: 1,
            call_uuid: 'aaa-deeiei3-dfddd'
          }
        });
      }
      else if (action == 'Call/1/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            id: 5,
            call_uuid: 'aaa-deeiei3-dfddd'
          }
        });
      }
      else if (action == 'Call/1/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {}
        });
      }
      else if (action == 'Call/1/Record/' && method == 'POST') {
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
      else if (action == 'Call/1/Record/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
          }
        });
      }
      else if (action == 'Call/1/Play/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'play started',
            api_id: '07abfd94-58c0-11e1-86da-adf28403fe48'
          }
        });
      }
      else if (action == 'Call/1/Play/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {}
        });
      }
      else if (action == 'Call/1/Speak/' && method == 'DELETE') {
        resolve({
          response: {},
          body: {
            message: 'speak stopped',
            api_id: 'cf2359c8-f4d6-11e6-b886-067c5485c240'
          }
        });
      }
      else if (action == 'Call/1/Speak/' && method == 'POST') {
        resolve({
          response: {},
          body: {
            message: 'speak started',
            api_id: '07abfd94-58c0-11e1-86da-adf28403fe48'
          }
        });
      }
      else if (action == 'Call/1/DTMF/' && method == 'POST') {
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
      else if (action == '' && method == 'GET') {
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
            units: 1
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
              previous: null,
              total_count: 22
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
                units: 1
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
                units: 1
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
      else if (action == 'Lookup/Number/+14154305555' && method == 'GET') {
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
            resource_uri: "/v1/Lookup/Number/+14154305555?type=carrier"
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
            resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Recording/c2186400-1c8c-11e4-a664-0026b945b52x/'
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
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Recording/c2186400-1c8c-1124-a664-0026b945b522/'
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
                resource_uri: '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/Recording/fc2716b0-1c8b-11e4-bwad-842b2b17453e/'
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
