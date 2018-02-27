const server = require('../solution/server');

describe('Testing the Hapi server that populate the database', () => {
  test('Should return 201 status code for successful insertion into database', (done) => {
    const options = {
      method: 'POST',
      url: '/populateQuestionsWithAnswers',
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(201);
      done();
    });
  });
});

describe('Testing the Hapi server login API', () => {
  test('Should return 200 status code for successfuly login request', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'Surabhi' },
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(200);
      done();
    });
  });
});

describe('Testing the Hapi server login API', () => {
  test('Should return 201 status code for successfuly creating new user and logging in', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: { userName: 'Surabhi' },
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(200);
      done();
    });
  });
});
