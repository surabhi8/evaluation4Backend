

module.exports = (sequelize, DataTypes) => {
  const userAnswers = sequelize.define('userAnswers', {
    userName: {
      type: DataTypes.STRING,
    },
    questionId: {
      type: DataTypes.STRING,
    },
    markedOption: DataTypes.STRING,
  }, {
  });
  return userAnswers;
};
