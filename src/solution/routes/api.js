
const helpers = require('../../helpers/helpers');
const Model = require('../../../models');

module.exports = [
  {
    path: '/populateQuestionsWithAnswers',
    method: 'POST',
    handler(request, reply) {
      helpers.getAllQuestionsArray().then((allQuestionsArray) => {
        helpers.getAllQuestionsAnswers(allQuestionsArray).then((allQuestionsArrayAnswers) => {
          const allQuestionsWithAnswers = helpers.getAllQuestionsWithAnswers(allQuestionsArray, allQuestionsArrayAnswers);
          const promiseArray = [];
          allQuestionsWithAnswers.map((questions) => {
            promiseArray.push(Model.questions.upsert(questions));
          });
          Promise.all(promiseArray).then(() => {
            reply({ message: 'Data Inserted', status_code: 201 });
          });
        });
      });
    },
  },
];
