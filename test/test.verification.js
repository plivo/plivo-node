import {
    Client
    // } from '../lib/rest/client';
} from '../lib/rest/client-test';
import { AssertionError } from 'assert';

// let authId = 'MAZJJKMWNLZJNIYJKYYT';
// let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';

let authId = 'MAMTI0ZWVIMDC5MMRIOT';
let authToken = 'ZTRmNWUyMWJlYWMyNDc2NjliNzViODdmYjM1ZWNk';


// let authId = 'auth_id';
// let authToken = 'auth_token';


let client = new Client(authId, authToken);

// describe('IdentityVerification Interface', function () {

//     it('Get Identity List', function () {
//         client.verification.list_all_identity().then(function (identityList) {
//             console.log('identity list is =>', JSON.stringify(identityList));
//         });
//     });

//     it('Get Identity Details', function () {
//         client.verification.retreive_identity(27658110766647).then(function (identityDetails) {
//             console.log('identity detail is =>', JSON.stringify(identityDetails));
//         });
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

//     // });

//     // it('Delete Identity', function () {
//     // });

//     // it('Dummy', function () {
//     //     // await client.verification.retreive_address(5);

//     //     //  let addressList = await client.verification.list_all_addresses();
//     //     //  console.log('addreess list is =>', JSON.stringify(addressList));

//     //     //  let addressCreate = await client.verification.create_address('IN', '9274222998', 'Mr', 'shweta', 'ravi', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'fascal123', 'st12', 'mu34');
//     //     // console.log('address Create is=>',JSON.stringify(addressCreate));

//     //     //  await client.verification.delete_address(5); 

//     //     // await client.verification.update_address('usa', '9274222998', 'Mrs', 'shweta', 'ravi', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', 'Null', 'passport', '123', 'fascal123', 'st12', 'mu34');


//     //     // await client.verification.retreive_identity(5);

//     //     // Get identity list


//     //     // Get Identity Details




//     //     // Delete identity
//     //     // Delete https://api.numbers.plivodev.com/v1/Account/MAMTI0ZWVIMDC5MMRIOT/Verification/Identity/10962759733523/
//     //     // { api_id: 'dd3d0294-243f-11e9-b496-0242ac110002', error: 'failed' }
//     //     // client.verification.delete_identity(20594710404052).then(function (identityDelete) {
//     //     //     console.log('identity Delete result =>', JSON.stringify(identityDelete));
//     //     // });



//     // });

// });

describe('AddressVerification Interface', function () {

    it('Get Address List', function () {
        client.addresses.list().then(function (addressList) {
            console.log('addressList list is =>', JSON.stringify(addressList));
        });
    });

    it('Get Address Details', function () {
        client.addresses.get(14632037725844).then(function (identityDetails) {
            console.log('identity detail is =>', JSON.stringify(identityDetails));
        });
    });


    it('Create Address - In-valid Fields', function (done) {

        var addressProofPath = __dirname + '/api_uploads/address_proof.png';
        client.addresses.create("in", "9898997510", 'Mr', null, 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
            .then(function (addressDetails) {
                // console.log('address Create result =>', JSON.stringify(addressDetails));
                done(new Error("Invalid result. Create address should throw error with invalid data."))
            })
            .catch(function (Erroraddress) {
                done();
                // console.log("address result==>", Erroraddress);
            })
    });

    it('Create Address - Valid Fields', function (done) {
        var addressProofPath = __dirname + '/api_uploads/address_proof.png';

        var addressProofPath = __dirname + '/api_uploads/address_proof.png';
        client.addresses.create("in", "9898997510", 'Mr', "ABC", 'DEF', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', addressProofPath, 'passport', '123', 'IN', 'ind-123', 'gujarat', '01-02-1991', 'id-date-12/10/2017', 'bus-plivo', 'fascal123', 'st12', 'mu34')
            .then(function (addressDetails) {
                // console.log('address Create result =>', JSON.stringify(addressDetails));
                done();
            })
            .catch(function (Erroraddress) {
                done(new Error("Invalid result. Create address should not throw error with valid data."))
                // console.log("address result==>", Erroraddress);

            })
    });


    it('Update Address', function () {

        client.addresses.udpate('usa', '9274222998', 'Mrs', 'shweta', 'ravi', 'bhagwati heritage 1201', 'sector-21', 'mumbai', 'maharashtra', '410209', 'IN', 'https://www.google.com/', 'Null', 'Null', 'passport', '123', 'fascal123', 'st12', 'mu34').then(function (updateResponse) {
            console.log('address update response =>', JSON.stringify(updateResponse));
        });

    });

    // it('Delete Address', function () {
    //     client.addresses.delete(20594710404052).then(function (deleteResult) {
    //         console.log('address delete result =>', JSON.stringify(deleteResult));
    //     });
    // });

});
