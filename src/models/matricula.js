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
        model: 'Instituicoes',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    alunoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Alunos',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    paranoid: true,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleteAt: 'deleteAt',
    hooks: {
      afterDestroy: async (instance, options) => {
        const faturas = await instance.getFatura();

        for (const fatura of faturas) {
          await fatura.destroy();
        }
      },
      afterRestore: (instance, options) => {
        instance.getFatura({ paranoid: false }).then(fatura => fatura.restore());
      },
    },
  });

  const queryInterface = sequelize.getQueryInterface();

  Matricula.addHook('afterCreate', (instance, options) => createFaturas(instance, options, queryInterface));

  Matricula.addHook('afterUpdate', (instance, options) => createFaturas(instance, options, queryInterface));

  Matricula.addHook('beforeUpdate', async (instance, options) => {
    const { valorTotal, quantidadeFaturas } = instance;

    const bills = await instance.getFatura();

    const openBills = bills.filter(bill => bill.status !== 'Paga');

    const paidBills = bills.filter(bill => bill.status === 'Paga');

    const aggPaid = paidBills.reduce((acc, curr, index) => {
      acc.totalPago += parseFloat(curr.valor);
      return acc;
    }, { totalPago: 0 });

    if (valorTotal < aggPaid.totalPago) {
      throw new Error('Valor do curso não pode ser inferior às faturas já pagas.');
    }

    if (quantidadeFaturas < paidBills.length) {
      throw new Error('Quantidade de faturas inválida. Informe um valor superior à quantia de faturas já pagas');
    }

    if (quantidadeFaturas === paidBills.length && valorTotal !== aggPaid.totalPago) {
      throw new Error('Você deve informar uma quantidade maior de faturas, que execeda a quantidade de faturas já pagas');
    }

    if (valorTotal === aggPaid.totalPago && (quantidadeFaturas !== paidBills.length)) {
      throw new Error('Com os valores providos, parece que o curso já foi todo pago. Portanto, só posso atualizar a quantidade de faturas pela mesma quantidade de faturas já pagas. Por favor, verifique e forneça os valores corretos.');
    }

    for (const openBill of openBills) {
      openBill.destroy({ force: true });
    }

    console.log('allow update and possible creation of new bills');
  });
  Matricula.associate = function (models) {
    // associations can be defined here


    Matricula.belongsTo(models.Instituicao, {
      as: 'Instituicao',
      foreignKey: 'instituicaoId',
    });

    Matricula.belongsTo(models.Aluno, {
      as: 'Aluno',
      foreignKey: 'alunoId',
    });

    Matricula.hasMany(models.Fatura, {
      as: 'Fatura',
      onDelete: 'cascade',
      hooks: true,
      foreignKey: 'matriculaId',
    });
  };
  return Matricula;
};
