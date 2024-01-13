// import chai from 'chai';
// import chaihttp from 'chai-http';
// import { describe, before, beforeEach, after, afterEach } from 'mocha';
// import server from '../server';

// //assertion style
// chai.should();
// chai.use(chaihttp);
// let app: any;

// describe('USER2 MODULE API TESTING', async () => {
//   const email = 'antiertesting2@gmails.com';
//   let user: {
//     _id: any;
//     id?: any;
//     should?: {
//       be: { a: (arg0: string) => void };
//       have: {
//         property: (arg0: string) => {
//           (): any;
//           new (): any;
//           equal: {
//             (arg0: string | number | boolean): //assertion style
//             void;
//             new (): any;
//           };
//         };
//       };
//     };
//   };

//   before(async () => {
//     app = await server;
//   });

//   after((done) => {
//     app.close();
//     done();
//   });

//   /**
//    * single api testing
//    */
//   describe('POST /api/user/create', async () => {
//     it('It should create new user from user2', (done: () => void) => {
//       const body = {
//         username: 'testuser12',
//         email,
//         age: 232,
//         password: process.env.MYSQL_PASSWORD,
//         name: 'User112',
//       };
//       chai
//         .request(app)
//         .post('/api/v1/user/create')
//         .send(body)
//         .end(
//           (
//             err: any,
//             response: {
//               body: {
//                 data: {
//                   _id: any;
//                   id?: any;
//                   should?:
//                     | {
//                         be: { a: (arg0: string) => void };
//                         have: {
//                           property: (arg0: string) => {
//                             (): any;
//                             new (): any;
//                             equal: {
//                               (arg0: string | number | boolean): void;
//                               new (): any;
//                             };
//                           };
//                         };
//                       }
//                     | undefined;
//                 };

//                 should: {
//                   be: { a: (arg0: string) => void };
//                   have: {
//                     property: (arg0: string) => {
//                       (): any;
//                       new (): any;
//                       equal: {
//                         (arg0: string | number | boolean): void;
//                         new (): any;
//                       };
//                     };
//                   };
//                 };
//               };
//             },
//           ) => {
//             response.body.should.be.a('object');

//             response.body.should.have.property('message').equal('Your Registration has been completed successfully.');
//             response.body.should.have.property('success').equal(true);
//             user = response.body.data;
//             done();
//           },
//         );
//     });
//     it('It should fetch data', (done: () => void) => {
//       chai
//         .request(app)
//         .get(`/api/v1/user/user-list`)
//         .end((err, response) => {
//           response.body.should.be.a('object');
//           // response.body.should.have.property('message').equal('Data found.');
//           response.body.should.have.property('success').equal(true);
//           done();
//         },
//         );
//     });
//   });



//   // describe('DELETE /api/v1/user/:userid', async () => {
//   //   it('It should delete when userid is passed', (done: () => void) => {
//   //     chai
//   //       .request(app)
//   //       .delete(`/api/v1/user/${user._id}`)
//   //       .end(
//   //         (
//   //           err: any,
//   //           response: {
//   //             body: {
//   //               should: {
//   //                 be: { a: (arg0: string) => void };
//   //                 have: {
//   //                   property: (arg0: string) => {
//   //                     (): any;
//   //                     new (): any;
//   //                     equal: {
//   //                       (arg0: string | number | boolean): void;
//   //                       new (): any;
//   //                     };
//   //                   };
//   //                 };
//   //               };
//   //             };
//   //           },
//   //         ) => {
//   //           response.body.should.be.a('object');
//   //           console.log('get body response', response.body);
//   //           response.body.should.have.property('success').equal(true);

//   //           done();
//   //         },
//   //       );
//   //   });
//   // });
  
// });
