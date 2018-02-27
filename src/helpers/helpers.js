const rp = require('request-promise');

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
module.exports = {
  getAllQuestionsArray,
  getAllQuestionsAnswers,
};
