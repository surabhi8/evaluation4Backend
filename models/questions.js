

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    question: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    options: DataTypes.JSON,
    answer: DataTypes.STRING,
  }, {
  });
  return questions;
};
