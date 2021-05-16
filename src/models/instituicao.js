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
      hooks: {
        afterValidate: (instituicao, options) => {
          Object.assign(
            instituicao,
            toOnlyNumbers(instituicao, ['CNPJ']),
          );
        },
        afterDestroy: async (instance, options) => {
          const matriculas = await instance.getMatricula();

          for (const matricula of matriculas) {
            await matricula.destroy();
            // Softdelete matricula model
          }
        },
        afterRestore: (instance, options) => {
          instance.getMatricula({ paranoid: false }).then(matricula => matricula.restore());
        },
      },
      paranoid: true,
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deleteAt: 'deleteAt',
    },
  );
  Instituicao.associate = function (models) {
    // associations can be defined here
    Instituicao.hasMany(models.Matricula, {
      as: 'Matricula',
      onDelete: 'cascade',
      hooks: true,
      foreignKey: 'instituicaoId',
    });
  };
  return Instituicao;
};
