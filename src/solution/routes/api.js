
const helpers = require('../../helpers/helpers');
const Model = require('../routes');

module.exports = [
  {
    path: '/populateQuestionsWithAnswers',
    method: 'POST',
    handler(request, reply) {
      helpers.getAllQuestionsArray().then((allQuestionsArray) => {
        helpers.getAllQuestionsAnswers(allQuestionsArray).then((allQuestionsArrayAnswers) => {
          const allQuestionsWithAnswers = helpers.getAllQuestionsWithAnswers(allQuestionsArray, allQuestionsArrayAnswers);
          const promiseArray = [];
          allQuestionsWithAnswers.map((books) => {
            promiseArray.push(Model.Novels.upsert(books));
          });
          Promise.all(promiseArray).then(() => {
            reply({ message: 'Data Inserted', status_code: 201 });
          });
        });
      });
    },
  },
];
