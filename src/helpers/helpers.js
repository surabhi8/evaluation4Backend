const rp = require('request-promise');
const Model = require('../../models');

const getAllQuestionsArray = () => {
  const promise1 = rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions').then(htmlString => htmlString);
  return (promise1.then((value) => {
    const allQuestionsArray = JSON.parse(value).allQuestions;
    return allQuestionsArray;
  }));
};
const getAllQuestionsAnswers = (allQuestionsArray) => {
  const promiseArray = [];
  for (let i = 0; i < allQuestionsArray.length; i += 1) {
    const promise3 = rp(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/${allQuestionsArray[i].questionId}`).then(htmlString => htmlString);
    promiseArray.push(promise3);
  }
  return Promise.all(promiseArray);
};
const getAllQuestionsWithAnswers = (allQuestionsArray, allQuestionsArrayAnswers) => {
  const allQuestionsWithAnswers = [];
  for (let i = 0; i < allQuestionsArray.length; i += 1) {
    const options = {};
    Object.keys(allQuestionsArray[i]).map((key, index) => {
      if (key !== 'question' && key !== 'questionId') {
        options[key] = Object.values(allQuestionsArray[i])[index];
      }
    });
    allQuestionsWithAnswers.push({
      question: allQuestionsArray[i].question,
      questionId: allQuestionsArray[i].questionId,
      options,
      answer: JSON.parse(allQuestionsArrayAnswers[i]).answer,
    });
  }
  return allQuestionsWithAnswers;
};

const populateQuestionsWithAnswers = () => {
  const outerPromise = getAllQuestionsArray().then((allQuestionsArray) => {
    const innerPromise = getAllQuestionsAnswers(allQuestionsArray).then((allQuestionsArrayAnswers) => {
      const allQuestionsWithAnswers = getAllQuestionsWithAnswers(allQuestionsArray, allQuestionsArrayAnswers);
      const promiseArray = [];
      allQuestionsWithAnswers.map((question) => {
        promiseArray.push(Model.questions.upsert(question));
      });
      return Promise.all(promiseArray);
    });
    return innerPromise;
  });
  return outerPromise;
};
const isDbEmpty = () => {
  const promise = Model.questions.findAll().then((user) => {
    if (user.length === 0) {
      return true;
    } return false;
  });
  return promise;
};

const getQuestions = () => {
  const allQuestions = [];
  const promise =
   Model.questions.findAll().then((users) => {
     users.map((user1) => {
       allQuestions.push({
         question: user1.dataValues.question,
         questionId: user1.dataValues.questionId,
         options: user1.dataValues.options,
       });
       return allQuestions;
     });
     return allQuestions;
   });
  return promise;
};

module.exports = {
  getAllQuestionsArray,
  getAllQuestionsAnswers,
  getAllQuestionsWithAnswers,
  populateQuestionsWithAnswers,
  isDbEmpty,
  getQuestions,
};

