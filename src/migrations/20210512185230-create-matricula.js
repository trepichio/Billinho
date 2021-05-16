

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Matriculas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    valorTotal: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    quantidadeFaturas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    diaVencimento: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nomeCurso: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    instituicaoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Instituicoes',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    alunoId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Alunos',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Matriculas'),
};
