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
