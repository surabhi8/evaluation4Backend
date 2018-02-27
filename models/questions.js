

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    question: DataTypes.STRING,
    questionId: DataTypes.STRING,
    options: DataTypes.JSON,
    answer: DataTypes.STRING,
  }, {
  });
  return questions;
};
