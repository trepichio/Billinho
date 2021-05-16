const { DateTime } = require('luxon');

const { toOnlyNumbers } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      get() {
        const dataNascimento = DateTime.fromSQL(this.getDataValue('dataNascimento'));

        return dataNascimento.toLocaleString({ locale: 'pt-br' });
      },
    },
    celular: DataTypes.BIGINT,
    genero: {
      type: DataTypes.ENUM,
      values: ['M', 'F'],
      allowNull: false,
    },
    formaPagamento: {
      type: DataTypes.ENUM,
      values: ['Boleto', 'Cartão'],
      allowNull: false,
    },
  }, {
    hooks: {
      afterValidate: (aluno, options) => {
        Object.assign(
          aluno,
          toOnlyNumbers(aluno, ['CPF', 'celular']),
        );
      },
    },
  });
  Aluno.associate = function (models) {
    // associations can be defined here
  };
  return Aluno;
};
