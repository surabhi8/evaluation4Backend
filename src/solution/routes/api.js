
const helpers = require('../../helpers/helpers');

module.exports = [
  {
    path: '/getQuestionsWithAnswers',
    method: 'GET',
    handler(request, reply) {
      helpers.getAllQuestionsArray().then((allQuestionsArray) => {
        helpers.getAllQuestionsAnswers(allQuestionsArray).then((allQuestionsArrayAnswers) => {
          reply({ message: allQuestionsArrayAnswers, status_code: 201 });
        });
      });
    },
  },
];
