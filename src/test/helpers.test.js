const helpers = require('../helpers/helpers');

describe('Testing the helpers functions', () => {
  test('getAllQuestionsArrayy function should return promise', () => {
    expect(typeof helpers.getAllQuestionsArray().then === 'function').toBe(true);
  });
});
