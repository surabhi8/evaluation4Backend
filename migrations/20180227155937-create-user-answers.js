

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
      references: { model: 'users', key: 'userName' },
      unique: true,
    },
    questionId: {
      type: Sequelize.STRING,
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
