import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

import * as instituicaoController from '../controllers/instituicao/instituicao.controller';
import * as instituicaoValidator from '../controllers/instituicao/instituicao.validator';

import * as alunoController from '../controllers/aluno/aluno.controller';
import * as alunoValidator from '../controllers/aluno/aluno.validator';
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

module.exports = router;
