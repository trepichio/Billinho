

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Instituicoes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    CNPJ: {
      type: Sequelize.STRING,
      unique: true,
    },
    tipo: {
      type: Sequelize.ENUM,
      values: ['Universidade', 'Escola', 'Creche'],
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Instituicoes'),
};
