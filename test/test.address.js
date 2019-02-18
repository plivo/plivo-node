// import { Client } from '../lib/rest/client';
import { Client } from '../lib/rest/client-test';



let authId = 'MAMTI0ZWVIMDC5MMRIOT';
let authToken = 'ZTRmNWUyMWJlYWMyNDc2NjliNzViODdmYjM1ZWNk';

// let authId = 'auth_id';
// let authToken = 'auth_token';

let client = new Client(authId, authToken);


describe('AddressVerification Interface', function () {

    // it('Get Address List', function (done) {
    //     client.addresses.list().then(function (addressList) {
    //         done();
    //     }).catch(function (err) {
    //         done(new Error("Test Failed. - Failed to fetch address list"))
    //     })
    // });

    // it('Get Address Details', function (done) {
    //     client.addresses.get(14632037725844).then(function (identityDetails) {
    //         // console.log('identity detail is =>', JSON.stringify(identityDetails));
    //         done();
    //     }).catch(function (err) {
    //         done(new Error("Test Failed. - Failed to fetch address details"))
    //     })
    // });


    // it('Create Address - In-valid Fields', function (done) {

    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //     client.addresses.create("in", "9898997510", 'Mr', null, 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
    //         .then(function (addressDetails) {
    //             // console.log('address Create result =>', JSON.stringify(addressDetails));
    //             done(new Error("Invalid result. Create address should throw error with invalid data."))
    //         })
    //         .catch(function (Erroraddress) {
    //             done();
    //             // console.log("address result==>", Erroraddress);
    //         })
    // });

    // it('Create Address - Valid Fields', function (done) {
    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';

    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //     client.addresses.create("in", "9898997510", 'Mr', "ABC", 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
    //         .then(function (addressDetails) {
    //             // console.log('address Create result =>', JSON.stringify(addressDetails));
    //             done();
    //         })
    //         .catch(function (Erroraddress) {
    //             done(new Error("Invalid result. Create address should not throw error with valid data."))
    //         })
    // });

    // it('Update Address', function (done) {

    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //     var params = {
    //         address_id: "73529957241107",
    //         proof_type: "PASSPORT",
    //         phone_number_country: "in",
    //         number_type: "9898989685",
    //         salutation: "Mr",
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
    //         // file: addressProofPath,
    //         // proof_type: proof_type,
    //         // id_number: id_number,
    //         // fiscal_identification_code: fiscal_identification_code,
    //         // street_code: street_code,
    //         // municipal_code: municipal_code
    //     };


    //     client.addresses.update(params).then(function (updateResult) {
    //         done();
    //     }).catch((err) => {
    //         done(err);
    //     });

    // });

    // it('Update Address', function (done) {

    //     var addressProofPath = __dirname + '/api_uploads/address_proof.png';
    //     var params = {
    //         // address_id: "73529957241107",
    //         proof_type: "PASSPORT",
    //         phone_number_country: "in",
    //         number_type: "9898989685",
    //         salutation: "Mr",
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
    //         // file: addressProofPath,
    //         // proof_type: proof_type,
    //         // id_number: id_number,
    //         // fiscal_identification_code: fiscal_identification_code,
    //         // street_code: street_code,
    //         // municipal_code: municipal_code
    //     };


    //     client.addresses.update(params).then(function (updateResult) {
    //         done(new Error("Invalid result. Update address should throw error when address_id not provided."))
    //     }).catch((err) => {
    //         done();
    //     });

    // });


    it('Delete Address', function () {
        client.addresses.delete(87928077747492).then(function (deleteResult) {
            console.log('address delete result =>', JSON.stringify(deleteResult));
        });
    });

});
