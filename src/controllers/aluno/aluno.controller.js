import { Aluno } from '../../models';
import { successResponse, errorResponse, isValidCPF } from '../../helpers';

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const alunos = await Aluno.findAndCountAll({
      order: [
        ['createdAt', 'DESC'], ['nome', 'ASC'],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { alunos });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getOne = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    return successResponse(req, res, { aluno });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const createOne = async (req, res) => {
  try {
    const {
      nome,
      CPF,
      dataNascimento,
      celular,
      genero,
      formaPagamento,
    } = req.body;

    if (!isValidCPF(CPF)) {
      throw new Error('CPF inválido');
    }
    const aluno = await Aluno.findOne({
      where: { CPF },
    });

    if (aluno) {
      throw new Error('Aluno já cadastrado');
    }

    const payload = {
      nome,
      CPF,
      dataNascimento,
      celular,
      genero,
      formaPagamento,
    };

    const newAluno = await Aluno.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateOne = async (req, res) => {
  try {
    const {
      nome,
      CPF,
      dataNascimento,
      celular,
      genero,
      formaPagamento,
    } = req.body;

    if (!isValidCPF(CPF)) {
      throw new Error('CPF inválido');
    }
    const aluno = await Aluno.findByPk(req.params.id);

    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    const payload = {
      nome,
      CPF,
      dataNascimento,
      celular,
      genero,
      formaPagamento,
    };

    Object.assign(aluno, payload);

    const updatedAluno = await aluno.save();
    return successResponse(req, res, { updatedAluno });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteOne = async (req, res) => {
  try {
    await Aluno.destroy({ where: { id: req.params.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
