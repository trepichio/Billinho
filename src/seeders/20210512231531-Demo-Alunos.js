

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
    queryInterface.bulkInsert('Alunos', [
      {
        nome: 'João Ninguém',
        CPF: '70743630068',
        genero: 'M',
        celular: 7695204461,
        formaPagamento: 'Boleto',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'José da Silva',
        CPF: '03396472055',
        genero: 'M',
        celular: 7292086567,
        formaPagamento: 'Cartão',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ruth Greene',
        CPF: '98776320049',
        genero: 'F',
        celular: 8899406589,
        formaPagamento: 'Cartão',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Thomas Curtis',
        CPF: '13717692062',
        genero: 'M',
        celular: 6694456799,
        formaPagamento: 'Boleto',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Hilda Tran',
        CPF: '98824556035',
        genero: 'F',
        celular: 3092257091,
        formaPagamento: 'Cartão',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
    queryInterface.bulkDelete('Alunos', null, {})
  ,
};
