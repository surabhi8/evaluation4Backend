
const helpers = require('../../helpers/helpers');
const Model = require('../../../models');

module.exports = [
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
      const {
        userName,
        questionId,
        markedOption,
      } = request.payload;
      const userResponse = {
        userName,
        questionId,
        markedOption,
      };
      Model.userAnswers.upsert(userResponse).then(() => {
        reply({
          message: 'User response recorded', status_code: 201,
        });
      }).catch((err) => {
        console.log(err.message);
      });
    },
  },
  {
    path: '/fetchDetails',
    method: 'POST',
    handler(request, reply) {
      const {
        userName,
      } = request.payload;
      Model.userAnswers.upsert(userResponse).then(() => {
        reply({
          message: 'User response recorded', status_code: 201,
        });
      }).catch((err) => {
        console.log(err.message);
      });
    },
  },
];
