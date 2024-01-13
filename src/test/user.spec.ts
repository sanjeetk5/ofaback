// import chai from 'chai';
// import chaihttp from 'chai-http';
// import { describe, before, beforeEach, after, afterEach } from 'mocha';
// import server from '../server';

// //assertion style
// chai.should();
// chai.use(chaihttp);
// let app: any;

// describe('USER MODULE API TESTING', async () => {
//   const email = 'antiertesting123@gmails.com';
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
//     it('It should create new user', (done: () => void) => {
//       const body = {
//         username: 'testuser1123',
//         email,
//         age: 232,
//         password: process.env.MYSQL_PASSWORD,
//         name: 'User11123',
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
//                             equal: { (arg0: string | number | boolean): void; new (): any };
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

//     it('It should fail, if email is already registered', (done: () => void) => {
//       const body = {
//         username: 'testuser21124',
//         email,
//         age: 232,
//         password: process.env.MYSQL_PASSWORD,
//         name: 'user21124',
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
//             response.body.should.have.property('message').equal('User already exists');
//             response.body.should.have.property('success').equal(false);
//             response.body.should.have.property('statusCode').equal(400);

//             done();
//           },
//         );
//     });
//   });

//   describe('GET /api/v1/user/:userid', async () => {
//     it('It should fetch when userid is passed', (done: () => void) => {
//       chai
//         .request(app)
//         .get(`/api/v1/user/${user._id}`)
//         .end(
//           (
//             err: any,
//             response: {
//               body: {
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
//             response.body.should.have.property('message').equal('User Data Found');
//             response.body.should.have.property('success').equal(true);

//             done();
//           },
//         );
//     });
//   });
// });
