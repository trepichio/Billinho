import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

import * as instituicaoController from '../controllers/instituicao/instituicao.controller';
import * as instituicaoValidator from '../controllers/instituicao/instituicao.validator';

import * as alunoController from '../controllers/aluno/aluno.controller';
import * as alunoValidator from '../controllers/aluno/aluno.validator';

import * as matriculaController from '../controllers/matricula/matricula.controller';
import * as matriculaValidator from '../controllers/matricula/matricula.validator';

import * as faturaController from '../controllers/fatura/fatura.controller';

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post(
  '/login',
  validate(userValidator.login),
  userController.login,
);
router.post(
  '/register',
  validate(userValidator.register),
  userController.register,
);

/**
 * CRUD of Instituicao
 */
router.get('/instituicoes', instituicaoController.getAll);

router.get('/instituicao/:id', instituicaoController.getOne);

router.post(
  '/instituicao',
  validate(instituicaoValidator.createOne),
  instituicaoController.createOne,
);

router.put(
  '/instituicao/:id',
  validate(instituicaoValidator.updateOne),
  instituicaoController.updateOne,
);

router.delete(
  '/instituicao/:id',
  instituicaoController.deleteOne,
);

/**
 * CRUD of Aluno
 */

router.get('/alunos', alunoController.getAll);

router.get('/aluno/:id', alunoController.getOne);

router.post(
  '/aluno',
  validate(alunoValidator.createOne),
  alunoController.createOne,
);

router.put(
  '/aluno/:id',
  validate(alunoValidator.updateOne),
  alunoController.updateOne,
);

router.delete(
  '/aluno/:id',
  alunoController.deleteOne,
);

/**
 * CRUD of Matricula
 */
router.get('/matriculas', matriculaController.getAll);

router.get('/matricula/:id', matriculaController.getOne);

router.post(
  '/matricula',
  validate(matriculaValidator.createOne),
  matriculaController.createOne,
);

router.put(
  '/matricula/:id',
  validate(matriculaValidator.updateOne),
  matriculaController.updateOne,
);


router.delete(
  '/matricula/:id',
  matriculaController.deleteOne,
);

/**
 * CRUD of Fatura
 */
router.get('/faturas', faturaController.getAll);

router.get('/matricula/:id/faturas', faturaController.getAllByMatricula);


router.get('/fatura/:id',
  (req, res) => res.send({ errorMessage: 'Not implemented yet.' }));

router.post(
  '/fatura',
  (req, res) => res.send({ errorMessage: 'Not implemented yet.' }),
);

router.put(
  '/fatura/:id',
  (req, res) => res.send({ errorMessage: 'Not implemented yet.' }),
);

router.delete(
  '/fatura/:id',
  (req, res) => res.send({ errorMessage: 'Not implemented yet.' }),
);

module.exports = router;
