const { toOnlyNumbers } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const Instituicao = sequelize.define(
    'Instituicao',
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      CNPJ: {
        type: DataTypes.STRING,
        unique: true,
      },
      tipo: {
        type: DataTypes.ENUM,
        values: ['Universidade', 'Escola', 'Creche'],
      },
    },
    {
      tableName: 'Instituicoes',
      // name: { plural: 'Instituicoes', singular: 'Instituicao' }, // avoid wrong pluralization in portuguese,

    },
  );
  Instituicao.associate = function (models) {
    // associations can be defined here
  };
  return Instituicao;
};
