// import { Client } from '../lib/rest/client';
import { Client } from '../lib/rest/client-test';

let authId = 'auth_id';
let authToken = 'auth_token';

let client = new Client(authId, authToken);


describe('IdentityVerification Interface', function () {

    it('Get Identity List', function () {
        client.verification.list_all_identity().then(function (identityList) {
            console.log('identity list is =>', JSON.stringify(identityList));
        });
    });

    it('Get Identity Details', function () {
        client.verification.retreive_identity(27658110766647).then(function (identityDetails) {
            console.log('identity detail is =>', JSON.stringify(identityDetails));
        });
    });

    // it('Create Identity - In-valid Fields', function (done) {

    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //     client.verification.create_identity("in", "9898997510", 'Mr', null, 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
    //         .then(function (identityDetails) {
    //             // console.log('identity Create result =>', JSON.stringify(identityDetails));
    //             done(new Error("Invalid result. Create identity should throw error with invalid data."))
    //         })
    //         .catch(function (Erroridentity) {
    //             done();
    //             // console.log("identity result==>", Erroridentity);

    //         })
    // });

    // it('Create Identity - Valid Fields', function (done) {
    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';

    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //     client.verification.create_identity("in", "9898997510", 'Mr', "ABC", 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
    //         .then(function (identityDetails) {
    //             // console.log('identity Create result =>', JSON.stringify(identityDetails));
    //             done();
    //         })
    //         .catch(function (Erroridentity) {
    //             done(new Error("Invalid result. Create identity should not throw error with valid data."))
    //             // console.log("identity result==>", Erroridentity);

    //         })
    // });

    // it('Update Identity', function () {

    //     var params = {
    //         identity_id: "40796989105693",
    //         proof_type: "PASSPORT",
    //         phone_number_country: "in",
    //         number_type: "9898989685",
    //         // salutation: salutation,
    //         // first_name: first_name,
    //         // last_name: last_name,
    //         // address_line1: address_line1,
    //         // address_line2: address_line2,
    //         // city: city,
    //         // region: region,
    //         // postal_code: postal_code,
    //         // country_iso: country_iso,
    //         // callback_url: callback_url,
    //         // alias: alias,
    //         // file: file,
    //         // proof_type: proof_type,
    //         // id_number: id_number,
    //         // nationality: nationality,
    //         // id_nationality: id_nationality,
    //         // birth_place: birth_place,
    //         // birth_date: birth_date,
    //         // id_issue_date: id_issue_date,
    //         // business_name: business_name,
    //         // fiscal_identification_code: fiscal_identification_code,
    //         // street_code: street_code,
    //         // municipal_code: municipal_code
    //     };


    //     client.verification.update_identity(params).then(function (updateResult) {
    //         console.log('identity update result =>', JSON.stringify(updateResult));
    //     });

    //     it('Create Identity - In-valid Fields', function (done) {

    //         var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //         client.verification.create_identity("in", "9898997510", 'Mr', null, 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
    //             .then(function (identityDetails) {
    //                 // console.log('identity Create result =>', JSON.stringify(identityDetails));
    //                 done(new Error("Invalid result. Create identity should throw error with invalid data."))
    //             })
    //             .catch(function (Erroridentity) {
    //                 done();
    //                 // console.log("identity result==>", Erroridentity);

    //             })
    //     });

    //     it('Create Identity - Valid Fields', function (done) {
    //         var addressProofPath = __dirname + '/api_uploads/address_proof.png';

    //         var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //         client.verification.create_identity("in", "9898997510", 'Mr', "ABC", 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
    //             .then(function (identityDetails) {
    //                 // console.log('identity Create result =>', JSON.stringify(identityDetails));
    //                 done();
    //             })
    //             .catch(function (Erroridentity) {
    //                 done(new Error("Invalid result. Create identity should not throw error with valid data."))
    //                 // console.log("identity result==>", Erroridentity);

    //             })
    //     });

    //     // it('Update Identity', function () {

    //     //     client.verification.update_identity(null, '9274222998', 'Mr', 'ABC', 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', null, null, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34').then(function (updateResult) {
    //     //         console.log('identity update result =>', JSON.stringify(updateResult));
    //     //     });


    //     it('Delete Identity', function () {
    //         client.verification.delete_identity(17117604461384).then(function (deleteResult) {
    //             console.log('identity delete result =>', JSON.stringify(deleteResult));
    //         });
    //     });


    // it('Dummy', function () {
    //     // await client.verification.retreive_address(5);

    //     //  let addressList = await client.verification.list_all_addresses();
    //     //  console.log('addreess list is =>', JSON.stringify(addressList));

    //     //  let addressCreate = await client.verification.create_address('IN', '9274222998', 'Mr', 'shweta', 'ravi', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'fascal123', 'st12', 'mu34');
    //     // console.log('address Create is=>',JSON.stringify(addressCreate));

    //     //  await client.verification.delete_address(5); 

    //     // await client.verification.update_address('usa', '9274222998', 'Mrs', 'shweta', 'ravi', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', 'Null', 'passport', '123', 'fascal123', 'st12', 'mu34');


    //     // await client.verification.retreive_identity(5);

    //     // Get identity list


    //     // Get Identity Details




    //     // Delete identity
    //     // Delete https://api.numbers.plivodev.com/v1/Account/MAMTI0ZWVIMDC5MMRIOT/Verification/Identity/10962759733523/
    //     // { api_id: 'dd3d0294-243f-11e9-b496-0242ac110002', error: 'failed' }
    //     // client.verification.delete_identity(20594710404052).then(function (identityDelete) {
    //     //     console.log('identity Delete result =>', JSON.stringify(identityDelete));
    //     // });



    // });

});

