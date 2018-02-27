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
const getAllQuestionsWithAnswers = (allQuestionsArray, allQuestionsArrayAnswers) => {
  const allQuestionsWithAnswers = [];
  for (let i = 0; i < allQuestionsArray.length; i += 1) {
    allQuestionsWithAnswers.push({
      question: allQuestionsArray[i].question,
      questionId: allQuestionsArray[i].questionId,
      option1: allQuestionsArray[i].option1,
      option2: allQuestionsArray[i].option2,
      option3: allQuestionsArray[i].option3,
      option4: allQuestionsArray[i].option4,
      correctAnswer: JSON.parse(allQuestionsArrayAnswers[i]).answer,
    });
  }
  return allQuestionsWithAnswers;
};
module.exports = {
  getAllQuestionsArray,
  getAllQuestionsAnswers,
  getAllQuestionsWithAnswers,
};
