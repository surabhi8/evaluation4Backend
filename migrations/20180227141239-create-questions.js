

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('questions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    question: {
      type: Sequelize.STRING,
    },
    questionId: {
      type: Sequelize.STRING,
    },
    option1: {
      type: Sequelize.STRING,
    },
    option2: {
      type: Sequelize.STRING,
    },
    option3: {
      type: Sequelize.STRING,
    },
    option4: {
      type: Sequelize.STRING,
    },
    answer: {
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
  down: queryInterface => queryInterface.dropTable('questions'),
};
