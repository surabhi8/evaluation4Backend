

module.exports = (sequelize, DataTypes) => {
  const userAnswers = sequelize.define('userAnswers', {
    userName: {
      type: DataTypes.STRING,
    },
    questionId: DataTypes.INTEGER,
    markedOption: DataTypes.STRING,
  }, {
  });
  return userAnswers;
};
