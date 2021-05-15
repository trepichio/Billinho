const Joi = require('joi');
const { regexBRMobilePhone } = require('./../../helpers');

export const createOne = {
  body: {
    nome: Joi.string().required(),
    CPF: Joi.string().required(),
    dataNascimento: Joi.date(),
    celular: Joi.string().regex(regexBRMobilePhone),
    genero: Joi.string().valid(['M', 'F']).insensitive().required(),
    formaPagamento: Joi.any().valid(['Boleto', 'Cartão']).required(),
  },
};

export const updateOne = {
  body: {
    nome: Joi.string(),
    CPF: Joi.string(),
    dataNascimento: Joi.date(),
    celular: Joi.string().regex(regexBRMobilePhone),
    genero: Joi.string().valid(['M', 'F']).insensitive(),
    formaPagamento: Joi.any().valid(['Boleto', 'Cartão']),
  },
};
