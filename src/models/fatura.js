

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
  }, {});
  Fatura.associate = function (models) {
    // associations can be defined here
  };
  return Fatura;
};
