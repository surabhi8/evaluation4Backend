

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    question: DataTypes.STRING,
    questionId: DataTypes.STRING,
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
    option3: DataTypes.STRING,
    option4: DataTypes.STRING,
    answer: DataTypes.STRING,
  }, {
  });
  return questions;
};
