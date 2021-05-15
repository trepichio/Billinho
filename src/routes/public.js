import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

import * as instituicaoController from '../controllers/instituicao/instituicao.controller';
import * as instituicaoValidator from '../controllers/instituicao/instituicao.validator';

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

module.exports = router;
