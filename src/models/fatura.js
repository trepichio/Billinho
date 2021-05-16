

module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define('Fatura', {
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    diaVencimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    matriculaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Matriculas',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Aberta', 'Atrasada', 'Paga'],
      defaultValue: 'Aberta',
      allowNull: false,
    },
  }, {
    paranoid: true,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deleteAt: 'deleteAt',
  });
  Fatura.associate = function (models) {
    // associations can be defined here
    Fatura.belongsTo(models.Matricula, {
      as: 'Matricula',
      foreignKey: 'matriculaId',
    });
  };
  return Fatura;
};
