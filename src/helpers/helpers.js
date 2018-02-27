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
  getAllQuestionsArray().then((allQuestionsArray) => {
    getAllQuestionsAnswers(allQuestionsArray).then((allQuestionsArrayAnswers) => {
      const allQuestionsWithAnswers = getAllQuestionsWithAnswers(allQuestionsArray, allQuestionsArrayAnswers);
      const promiseArray = [];
      allQuestionsWithAnswers.map((question) => {
        promiseArray.push(Model.questions.upsert(question));
      });
      Promise.all(promiseArray).then(() => ({ message: 'Data Inserted', status_code: 201 }));
    });
  });
};
module.exports = {
  getAllQuestionsArray,
  getAllQuestionsAnswers,
  getAllQuestionsWithAnswers,
  populateQuestionsWithAnswers,
};
