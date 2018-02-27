
const helpers = require('../../helpers/helpers');

module.exports = [
  {
    path: '/getQuestionsWithAnswers',
    method: 'GET',
    handler(request, reply) {
      helpers.getAllQuestionsArray().then((allQuestionsArray) => {
        helpers.getAllQuestionsAnswers(allQuestionsArray).then((allQuestionsArrayAnswers) => {
          const allQuestionsWithAnswers = helpers.getAllQuestionsWithAnswers(allQuestionsArray, allQuestionsArrayAnswers);
          reply({ message: allQuestionsWithAnswers, status_code: 201 });
        });
      });
    },
  },
];
