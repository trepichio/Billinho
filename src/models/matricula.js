const { DateTime } = require('luxon');


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

  const Fatura = sequelize.model('Fatura');

  async function createFaturas(instance, options) {
    const { valorTotal, quantidadeFaturas, diaVencimento } = instance;

    const valorFatura = valorTotal / quantidadeFaturas;

    const now = DateTime.now();

    const vencimento = now.set({ day: diaVencimento });

    const firstPayment = diaVencimento <= now.day
      ? vencimento.plus({ months: 1 })
      : vencimento;


    const nextPayment = (() => {
      const THIS = function () {
        THIS.date = THIS.date ? THIS.date.plus({ months: 1 }) : firstPayment;
        return THIS;
      };
      return THIS;
    })();

    const faturas = [];

    for (let i = 0; i < quantidadeFaturas; i++) {
      faturas[i] = {
        valor: valorFatura,
        diaVencimento: nextPayment().date.toISODate(),
        matriculaId: instance.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return await queryInterface.bulkInsert('Faturas', faturas);
  }

  Matricula.addHook('afterCreate', createFaturas);
  Matricula.associate = function (models) {
    // associations can be defined here
  };
  return Matricula;
};
