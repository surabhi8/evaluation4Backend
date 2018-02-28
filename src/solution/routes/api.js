
const helpers = require('../../helpers/helpers');
const Model = require('../../../models');

module.exports = [
  {
    path: '/login',
    method: 'POST',
    handler(request, reply) {
      const userName = JSON.parse(request.payload).userName;
      console.log(userName);
      Model.users.findOne({
        where: {
          userName,
        },
      }).then((user) => {
        if (user === null) {
          Model.users.create({
            userName,
            score: -1,
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
  {
    path: '/recordUserResponse',
    method: 'POST',
    handler(request, reply) {
      const userName = JSON.parse(request.payload).username;
      const questionId = JSON.parse(request.payload).questionid;
      const markedOption = JSON.parse(request.payload).markedoption;
      const userResponse = {
        userName,
        questionId,
        markedOption,
      };
      Model.userAnswers.findAll({ where: { userName, questionId } })
        .then((user) => {
          if (user.length === 0) {
            Model.userAnswers.create({ userResponse }).then(() => {
              reply({ message: 'User response recorded', status_code: 201 });
            });
          } else {
            Model.userAnswers.update({ markedOption }, { where: { userName, questionId } }).then(() => {
              reply({ message: 'User response updasted', status_code: 201 });
            });
          }
        });
    },
  },
  {
    path: '/fetchDetails',
    method: 'GET',
    handler: (request, reply) => {
      helpers.isDbEmpty().then((flag) => {
        console.log(flag);
        if (flag === true) {
          helpers.populateQuestionsWithAnswers().then(() => {
            helpers.getQuestions().then((allQuestionsAfterFirstLogin) => {
              reply({ message: allQuestionsAfterFirstLogin, status_code: 200 });
            });
          });
        } else {
          helpers.getQuestions().then((allQuestionsFromDB) => {
            reply({ message: allQuestionsFromDB, status_code: 200 });
          });
        }
      });
    },
  },
];
