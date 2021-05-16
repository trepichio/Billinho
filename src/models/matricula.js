const { createFaturas } = require('./../helpers/hooks');

module.exports = (sequelize, DataTypes) => {
  const Matricula = sequelize.define('Matricula', {
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    quantidadeFaturas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    diaVencimento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 31,
      },
    },
    nomeCurso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instituicaoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Instituicao',
        key: 'id',
      },
      allowNull: false,
    },
    alunoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Aluno',
        key: 'id',
      },
      allowNull: false,
    },
  }, {});

  const queryInterface = sequelize.getQueryInterface();

  Matricula.addHook('afterCreate', (instance, options) => createFaturas(instance, options, queryInterface));
  Matricula.associate = function (models) {
    // associations can be defined here
  };
  return Matricula;
};
