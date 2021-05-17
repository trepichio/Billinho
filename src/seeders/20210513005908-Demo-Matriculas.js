const { createFaturas } = require('../helpers/hooks');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    const matriculas = await queryInterface.bulkInsert('Matriculas', [
      {
        valorTotal: 1000.00,
        quantidadeFaturas: 10,
        diaVencimento: 15,
        nomeCurso: 'Javascript',
        instituicaoId: 3,
        alunoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        valorTotal: 620.30,
        quantidadeFaturas: 5,
        diaVencimento: 10,
        nomeCurso: 'VueJS',
        instituicaoId: 3,
        alunoId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        valorTotal: 900,
        quantidadeFaturas: 3,
        diaVencimento: 20,
        nomeCurso: 'Desenho',
        instituicaoId: 2,
        alunoId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        valorTotal: 110.50,
        quantidadeFaturas: 10,
        diaVencimento: 5,
        nomeCurso: 'Violão',
        instituicaoId: 1,
        alunoId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        valorTotal: 500,
        quantidadeFaturas: 5,
        diaVencimento: 31,
        nomeCurso: 'Informática',
        instituicaoId: 1,
        alunoId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {
      returning: true,
    });


    let faturas = [];

    for (const matricula of matriculas) {
      //! this is a hack to avoid breaking the function createFaturas
      matricula.getFatura = () => [];

      // this is safe
      faturas = [...faturas, createFaturas(matricula, {}, queryInterface)];
    }

    return Promise.all(faturas);
  },

  down: (queryInterface, Sequelize) => Promise.all(
    [
      queryInterface.bulkDelete('Matriculas', null, {}),
      queryInterface.bulkDelete('Faturas', null, {}),
    ],
  )
  ,
};
