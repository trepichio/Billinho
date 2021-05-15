

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Faturas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    valor: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    diaVencimento: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    matriculaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Matriculas',
        key: 'id',
      },
    },
    status: {
      type: Sequelize.ENUM,
      values: ['Aberta', 'Atrasada', 'Paga'],
      allowNull: false,
      defaultValue: 'Aberta',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Faturas'),
};
