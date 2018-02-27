const helpers = require('../helpers/helpers');

describe('Testing the helpers functions', () => {
  test('getAllQuestionsArray function should return promise', () => {
    expect(typeof helpers.getAllQuestionsArray().then === 'function').toBe(true);
  });
});

test('getAllQuestionsAnswers function should return promise', () => {
  const promise = helpers.getAllQuestionsArray().then((allQuestionsArray) => {
    helpers.getAllQuestionsAnswers(allQuestionsArray);
  });
  expect(typeof promise.then === 'function').toBe(true);
});

