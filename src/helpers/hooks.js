const { DateTime } = require('luxon');
/**
 * This is a hook callback function to create Faturas, which should be used in model and seeder hooks
 */
module.exports = {
  createFaturas: async function createFaturas(instance, options, queryInterface) {
    const { valorTotal, quantidadeFaturas, diaVencimento } = instance;

    const paidBills = await instance.getFatura({ where: { status: 'Paga' } });

    const aggPaid = paidBills.reduce((acc, curr, index) => {
      acc.totalPago += parseFloat(curr.valor);
      return acc;
    }, { totalPago: 0 });

    const valorFatura = parseFloat((valorTotal - aggPaid.totalPago) / (quantidadeFaturas - paidBills.length)).toFixed(2);

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

    for (let i = 0; i < (quantidadeFaturas - paidBills.length); i++) {
      faturas[i] = {
        valor: valorFatura,
        diaVencimento: nextPayment().date.toISODate(),
        matriculaId: instance.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return queryInterface.bulkInsert('Faturas', faturas);
  },
};
