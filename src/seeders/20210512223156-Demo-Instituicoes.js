

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
    queryInterface.bulkInsert('Instituicoes',
      [
        {
          nome: 'Educação Jovem',
          CNPJ: '07325324000149',
          tipo: 'Escola',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Os Ferinhas',
          CNPJ: '27411339000137',
          tipo: 'Creche',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Unisemsal',
          CNPJ: '42390703000113',
          tipo: 'Universidade',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {
      validate: true,
      individualHooks: true,
    }),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
    queryInterface.bulkDelete('Instituicoes', null, {})
  ,
};
