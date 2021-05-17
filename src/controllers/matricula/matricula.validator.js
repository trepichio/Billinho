const Joi = require('joi');

export const createOne = {
  body: {
    valorTotal: Joi.number().precision(2).min(1).required(),
    quantidadeFaturas: Joi.number().integer().min(1).required(),
    diaVencimento: Joi.number().integer().min(1).max(31)
      .required(),
    nomeCurso: Joi.string().required(),
    instituicaoId: Joi.number().integer().positive().required(),
    alunoId: Joi.number().integer().positive().required(),
  },
};

export const updateOne = {
  body: {
    valorTotal: Joi.number().precision(2).min(1),
    quantidadeFaturas: Joi.number().integer().min(1),
    diaVencimento: Joi.number().integer().min(1).max(31),
    nomeCurso: Joi.string(),
    instituicaoId: Joi.number().integer().positive(),
    alunoId: Joi.number().integer().positive(),
  },
};
