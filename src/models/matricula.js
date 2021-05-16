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
        console.log('entrou matricula');
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
