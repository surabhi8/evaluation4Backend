

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('userAnswers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userName: {
      type: Sequelize.STRING,
    },
    questionId: {
      type: Sequelize.INTEGER,
    },
    markedOption: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('userAnswers'),
};
