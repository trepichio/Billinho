const Joi = require('joi');

export const createOne = {
  body: {
    nome: Joi.string().required(),
    CNPJ: Joi.string().required(),
    tipo: Joi.string().valid(['Universidade', 'Escola', 'Creche']).required(),
  },
};

export const updateOne = {
  body: {
    nome: Joi.string(),
    CNPJ: Joi.string(),
    tipo: Joi.string().valid(['Universidade', 'Escola', 'Creche']),
  },
};
