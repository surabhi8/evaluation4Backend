
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
  {
    path: '/login',
    method: 'POST',
    handler(request, reply) {
      const {
        userName,
      } = request.payload;

      Model.users.findOne({
        where: {
          userName,
        },
      }).then((user) => {
        if (user === null) {
          Model.users.create({
            userName,
            score: 0,
          }).then(() => {
            reply({
              status_code: 201,
              message: 'New User successfully created and logged in',
            });
          });
        } else {
          reply({
            status_code: 200,
            message: 'user logged in',
          });
        }
      }).catch((err) => {
        reply(err);
      });
    },
  },
];
