const helpers = require('../helpers/helpers');

const result = [
  {
    question: 'What is the capital of India',
    questionId: 12,
    option1: 'New Delhi',
    option2: 'MP',
    option3: 'UP',
    option4: 'Bangalore',
    correctAnswer: 'New Delhi',
  },
  {
    question: 'What is the capital of Afghanistan',
    questionId: 23,
    option1: 'Kabul',
    option2: 'Tirana',
    option3: 'Algiers',
    option4: 'Andorra la Vella',
    correctAnswer: 'Kabul',
  },
  {
    question: 'What is the capital of Marshall Islands',
    questionId: 45,
    option1: 'Kabul',
    option2: 'Antananarivo',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
    correctAnswer: 'Majuro',
  },
  {
    question: 'What is the capital of Micronesia',
    questionId: 56,
    option1: 'Palikir',
    option2: 'Antananarivo',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
    correctAnswer: 'Palikir',
  },
  {
    question: 'What is the capital of Monaco',
    questionId: 67,
    option1: 'Palikir',
    option2: 'Monaco',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
    correctAnswer: 'Majuro',
  },
  {
    question: 'What is the capital of Micronesia',
    questionId: 78,
    option1: 'Palikir',
    option2: 'Antananarivo',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
    correctAnswer: 'Palikir',
  },
  {
    question: 'What is the capital of Montenegro',
    questionId: 89,
    option1: 'Podgorica',
    option2: 'Antananarivo',
    option3: 'Majuro',
    option4: 'Andorra la Vella',
    correctAnswer: 'Podgorica',
  },
  {
    question: 'What is the capital of Namibia',
    questionId: 90,
    option1: 'Palikir',
    option2: 'Antananarivo',
    option3: 'Windhoek',
    option4: 'Naypyidaw',
    correctAnswer: 'Windhoek',
  },
  {
    question: 'What is the capital of Nigeria',
    questionId: 102,
    option1: 'Abuja',
    option2: 'Antananarivo',
    option3: 'Majuro',
    option4: 'Warsaw',
    correctAnswer: 'Abuja',
  },
  {
    question: 'What is the capital of Oman',
    questionId: 120,
    option1: 'Palikir',
    option2: 'Muscat',
    option3: 'Majuro',
    option4: 'Warsaw',
    correctAnswer: 'Muscat',
  },
  {
    question: 'What is the capital of Palau',
    questionId: 123,
    option1: 'Palikir',
    option2: 'Antananarivo',
    option3: 'Ngerulmud',
    option4: 'Warsaw',
    correctAnswer: 'Ngerulmud',
  },
  {
    question: 'What is the capital of Madagascar',
    questionId: 34,
    option1: 'Kabul',
    option2: 'Antananarivo',
    option3: 'Algiers',
    option4: 'Andorra la Vella',
    correctAnswer: 'Antananarivo',
  }];

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

test('getAllQuestionsWithAnswers function returns the array of book objects including rating', () => {
  helpers.getAllQuestionsArray().then((allQuestionsArray) => {
    helpers.getAllQuestionsAnswers(allQuestionsArray).then((allQuestionsArrayAnswers) => {
      const allQuestionsWithAnswers = helpers.getAllQuestionsWithAnswers(allQuestionsArray, allQuestionsArrayAnswers);
      expect(allQuestionsWithAnswers).toEqual(result);
    });
  });
});
