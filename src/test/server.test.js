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
      payload: { userName: 'Kite' },
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(201);
      done();
    });
  });
});

describe('Testing the Hapi server login API', () => {
  test('Should return 201 status code for successfuly recording user response', (done) => {
    const options = {
      method: 'POST',
      url: '/recordUserResponse',
      payload: { userName: 'Surabhi', questionId: '12', markedOption: 'New Delhi' },
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(201);
      done();
    });
  });
});


describe('Testing the Hapi server getting the questions data', () => {
  test('Should return 201 status code for successfuly getting questions data', (done) => {
    const options = {
      method: 'POST',
      url: '/fetchDetails',
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(200);
      done();
    });
  });
});

describe('Testing the Hapi server getting the score', () => {
  test('Should return 201 status code for successfuly getting the correct data from db', (done) => {
    const options = {
      method: 'GET',
      url: '/score',
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(200);
      done();
    });
  });
});

