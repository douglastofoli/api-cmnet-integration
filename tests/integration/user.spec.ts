// import express from 'express';
// import request from 'supertest';

// import routes from '../../src/routes';

// const app = express();

// app.use('/test', routes);

// describe('POST /api/user/create', () => {
//   it('should return 201 and a user inserted on database', async (done) => {
//     const { body } = await request(app).post('/test/user/create').send({
//       email: 'test@test.com',
//       password: '123456',
//       password_confirmation: '123456'
//     });

//     expect(body).toEqual({
//       status: 201,
//       stateInfo: {
//         message: 'User created with sucess!'
//       }
//     });
//   });
// });
