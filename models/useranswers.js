

module.exports = (sequelize, DataTypes) => {
  const userAnswers = sequelize.define('userAnswers', {
    userName: {
      type: DataTypes.STRING,
      references: { model: 'users', key: 'userName' },
      unique: true,
    },
    questionId: {
      type: DataTypes.STRING,
    },
    markedOption: DataTypes.STRING,
  }, {
  });
  return userAnswers;
};
