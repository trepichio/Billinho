

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
        dataNascimento: '04/06/1976',
        formaPagamento: 'Boleto',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: 'José da Silva',
        CPF: '03396472055',
        genero: 'M',
        celular: 7292086567,
        dataNascimento: '01/31/1981',
        formaPagamento: 'Cartão',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: 'Ruth Greene',
        CPF: '98776320049',
        genero: 'F',
        celular: 8899406589,
        dataNascimento: '07-15-1986',
        formaPagamento: 'Cartão',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: 'Thomas Curtis',
        CPF: '13717692062',
        genero: 'M',
        celular: 6694456799,
        dataNascimento: '1951-8-26',
        formaPagamento: 'Boleto',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        nome: 'Hilda Tran',
        CPF: '98824556035',
        genero: 'F',
        celular: 3092257091,
        dataNascimento: '1970/11/9',
        formaPagamento: 'Cartão',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
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
