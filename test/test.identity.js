// import { Client } from '../lib/rest/client';
import { Client } from '../lib/rest/client-test';

let authId = 'auth_id';
let authToken = 'auth_token';

let client = new Client(authId, authToken);


describe('Identity Interface', function () {

    it('Get Identity List', function (done) {
        client.identities.list().then(function (identityList) {
            // console.log('identity list is =>', JSON.stringify(identityList));
            done()
        }).catch(function (err) {
            done(err);
        });
    });

    it('Get Identity Details', function (done) {
        client.identities.get(27658110766647).then(function (identityDetails) {
            // console.log('identity detail is =>', JSON.stringify(identityDetails));
            done()
        }).catch(function (err) {
            done(err);
        });
    });

    it('Create Identity - In-valid Fields', function (done) {

        var addressProofPath = __dirname + '/api_uploads/address_proof.png';
        client.identities.create("in", "9898997510", 'Mr', null, 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
            .then(function (identityDetails) {
                // console.log('identity Create result =>', JSON.stringify(identityDetails));
                done(new Error("Invalid result. Create identity should throw error with invalid data."))
            })
            .catch(function (Erroridentity) {
                done();
                // console.log("identity result==>", Erroridentity);

            })
    });

    it('Create Identity - Valid Fields', function (done) {
        var addressProofPath = __dirname + '/api_uploads/address_proof.png';

        var addressProofPath = __dirname + '/api_uploads/address_proof.png';
        client.identities.create("in", "9898997510", 'Mr', "ABC", 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
            .then(function (identityDetails) {
                // console.log('identity Create result =>', JSON.stringify(identityDetails));
                done();
            })
            .catch(function (Erroridentity) {
                done(new Error("Invalid result. Create identity should not throw error with valid data."))
                // console.log("identity result==>", Erroridentity);

            })
    });

    it('Update Identity with valid fields', function (done) {

        var params = {
            identity_id: "<id_to_be_updated>",
            proof_type: "PASSPORT",
            phone_number_country: "in",
            number_type: "9898989685",
            // salutation: salutation,
            // first_name: first_name,
            // last_name: last_name,
            // address_line1: address_line1,
            // address_line2: address_line2,
            // city: city,
            // region: region,
            // postal_code: postal_code,
            // country_iso: country_iso,
            // callback_url: callback_url,
            // alias: alias,
            // file: file,
            // proof_type: proof_type,
            // id_number: id_number,
            // nationality: nationality,
            // id_nationality: id_nationality,
            // birth_place: birth_place,
            // birth_date: birth_date,
            // id_issue_date: id_issue_date,
            // business_name: business_name,
            // fiscal_identification_code: fiscal_identification_code,
            // street_code: street_code,
            // municipal_code: municipal_code
        };


        client.identities.update(params).then(function (updateResult) {
            // console.log('identity update result =>', JSON.stringify(updateResult));
            done();
        }).catch(function (err) {
            done(err);
        });

    });

    it('Update Identity Without id', function (done) {

        var params = {
            proof_type: "PASSPORT",
            phone_number_country: "in",
            number_type: "9898989685",
            // salutation: salutation,
            // first_name: first_name,
            // last_name: last_name,
            // address_line1: address_line1,
            // address_line2: address_line2,
            // city: city,
            // region: region,
            // postal_code: postal_code,
            // country_iso: country_iso,
            // callback_url: callback_url,
            // alias: alias,
            // file: file,
            // proof_type: proof_type,
            // id_number: id_number,
            // nationality: nationality,
            // id_nationality: id_nationality,
            // birth_place: birth_place,
            // birth_date: birth_date,
            // id_issue_date: id_issue_date,
            // business_name: business_name,
            // fiscal_identification_code: fiscal_identification_code,
            // street_code: street_code,
            // municipal_code: municipal_code
        };

        client.identities.update(params).then(function (updateResult) {
            // console.log('identity update result =>', JSON.stringify(updateResult));
            done(new Error("Invalid result. Update identity should throw error if identity_id not provided."))
        }).catch(function (err) {
            done();
        });

    });


    //     // Delete identity
    it('Delete Identity', function (done) {
        client.identities.delete(18294047791076).then(function (deleteResult) {
            // console.log('identity delete result =>', JSON.stringify(deleteResult));
            done();
        }).catch(function (err) {
            done(err);
        });
    });


});

