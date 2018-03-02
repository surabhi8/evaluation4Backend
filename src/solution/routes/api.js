
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
      Model.userAnswers.findAll({
        where: {
          questionId,
          userName,
        },
      })
        .then((user) => {
          if (user.length === 0) {
            Model.userAnswers.create({
              userName,
              questionId,
              markedOption,
            }).then(() => {
              reply({ message: 'User response recorded', status_code: 201 });
            });
          } else {
            Model.userAnswers.update({ markedOption }, { where: { userName, questionId } }).then(() => {
              reply({ message: 'User response updated', status_code: 201 });
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
  {
    path: '/score',
    method: 'POST',
    handler: (request, reply) => {
      const userName = JSON.parse(request.payload).userName;
      console.log(userName);
      let score = 0;
      const questionIdAndAnswers = Model.questions.findAll({ attributes: ['questionId', 'answer'], order: [['questionId', 'DESC']] });
      const answerByUsername = Model.userAnswers
        .findAll({ attributes: ['questionId', 'markedOption'], where: { userName }, order: [['questionId', 'DESC']] });
      Promise.all([questionIdAndAnswers, answerByUsername]).then(([correctAnswers, userAnswers]) => {
        console.log(correctAnswers.length, userAnswers.length);
        if (correctAnswers.length !== userAnswers.length) {
          reply({ message: 'Attempt all questions first', status_code: 400 });
        }
        for (let i = 0; i < correctAnswers.length; i += 1) {
          for (let j = 0; j < userAnswers.length; j += 1) {
            if (correctAnswers[i].dataValues.questionId === userAnswers[j].dataValues.questionId &&
              userAnswers[j].dataValues.markedOption === correctAnswers[i].dataValues.answer) {
              score += 1;
              break;
            }
          }
        }
        return score;
      }).then((totalScore) => {
        Model.users.update({ score: totalScore }, { where: { userName } }).then(() => {
          reply({ message: totalScore, status_code: 200 });
        });
      });
    },
  },
  {
    path: '/leaderboard',
    method: 'GET',
    handler: (request, reply) => {
      Model.users.findAll({ attributes: ['userName', 'score'], order: [['score', 'DESC']], limit: 5 }).then((topPeople) => {
        const people = [];
        for (let i = 0; i < topPeople.length; i += 1) {
          people.push({
            userName: topPeople[i].dataValues.userName,
            score: topPeople[i].dataValues.score,
          });
        }
        console.log(people);
        reply({ message: people, status_code: 200 });
      });
    },
  },
];
