import chai from 'chai';
import chaihttp from 'chai-http';
import { after, before, describe } from 'mocha';
import server from '../server';
//assertion style
chai.should();
chai.use(chaihttp);
let app: any;

// describe('USER MODULE API TESTING', async () => {
//   // const email = 'antiertesting123@gmails.com';
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

// });

/**
 * single api testing
 */
describe.only('GET /ico/getBuyTokenDetails', async () => {

    before(async () => {
        app = await server;
      });
    
      after((done) => {
        app.close();
        done();
      });


  // it('It should create new user', (done: () => void) => {
  //   const body = {
  //     buyAmount: '1000000000',
  //     tokenAmount: '20000000000',
  //     timestamp: '1691566511',
  //     buyType: '2',
  //     userAddress: '0x9b253263DA5c8C564c2E9A04719aFbd7c6A6540A',
  //     transactionHash: '0x1a294be6d48db60a73747b8a7f25377ec4de0acf4cf81dad67285f8494f15857',
  //   };
  //   chai
  //     .request(app)
  //     .post('/api/v1/ico/getBuyTokenDetails')
  //     .send(body)
  //     .end((err, response) => {
  //       response.body.should.be.a('object');
  //       response.body.should.have.property('message').equal('Your registration has been completed successfully.');
  //       response.body.should.have.property('success').equal(true);

  //       // user = response.body.data;
  //       done();
  //     });
  // });

  //     it('It should fail, if email is already registered', (done: () => void) => {
  //       const body = {
  //         username: 'shubham1',
  //         email: 'shubham1@gmail.com',
  //         age: 32,
  //         password: 'shubham@1124',
  //         name: 'Shubhamskatel1',
  //       };
  //       chai
  //         .request(app)
  //         .post('/api/v1/user/create')
  //         .send(body)
  //         .end((err, response) => {
  //           // response.body.should.be.a('object');
  //           // response.body.should.have.status(200);
  //           response.body.should.have.property('message').equal('User already exists.');
  //           response.body.should.have.property('statusCode').equal(400);
  //           response.body.should.have.property('success').equal(false);
  //           // user = response.body.data;
  //           done();
  //         });
  //     });
  //     it('It should update user', (done: () => void) => {
  //       const body = {
  //         _id: '64f6cbec84e88f947bdc81f6',
  //         age: '33',
  //         name: 'Shubhamskatel',
  //       };
  //       chai
  //         .request(app)
  //         .post('/api/v1/user/update')
  //         .send(body)
  //         .end((err, response) => {
  //           response.body.should.be.a('object');
  //           response.body.should.have.property('message').equal('User data updated successfully.');
  //           response.body.should.have.property('success').equal(true);
  //           // user = response.body.data;
  //           done();
  //         });
  //     });
  //   });

  it.only('It should fetch data', (done: () => void) => {
    chai
      .request(app)
      .get(`/api/v1/ico/getBuyTokenDetails`)
      .end((err, response) => {
        response.body.should.be.a('object');
        // response.body.should.have.property('message').equal('Data found.');
        response.body.should.have.property('success').equal(true);
        console.log("data",response.body.data.docs)
        done();
      });
  });

  // describe('GET /api/v1/user/user-list', async () => {
  //   it('It should fetch when userid is passed', (done: () => void) => {
  //     chai
  //       .request(app)
  //       .get(`/api/v1/user/user-list`)
  //       .end((err, response) => {
  //         response.body.should.be.a('object');
  //         response.body.should.have.property('message').equal('Data found.');
  //         response.body.should.have.property('success').equal(true);
  //         done();
  //       },
  //       );
  //   });
  // });
});
