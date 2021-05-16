

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Alunos', {
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
    CPF: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    dataNascimento: {
      type: Sequelize.DATEONLY,
    },
    celular: {
      type: Sequelize.BIGINT,
    },
    genero: {
      type: Sequelize.ENUM,
      values: ['M', 'F'],
      allowNull: false,
    },
    formaPagamento: {
      type: Sequelize.ENUM,
      values: ['Boleto', 'Cartão'],
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Alunos'),
};
