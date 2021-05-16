import { Instituicao } from '../../models';
import { successResponse, errorResponse, isValidCNPJ } from '../../helpers';

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const instituicoes = await Instituicao.findAndCountAll({
      order: [
        ['createdAt', 'DESC'], ['nome', 'ASC'],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { instituicoes });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getOne = async (req, res) => {
  try {
    const instituicao = await Instituicao.findByPk(req.params.id);
    return successResponse(req, res, { instituicao });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const createOne = async (req, res) => {
  try {
    const {
      nome, CNPJ, tipo,
    } = req.body;

    if (!isValidCNPJ(CNPJ)) {
      throw new Error('CNPJ inválido');
    }
    const instituicao = await Instituicao.findOne({
      where: { CNPJ },
    });

    if (instituicao) {
      throw new Error('Instituto de Ensino já existe');
    }

    const payload = {
      nome,
      CNPJ,
      tipo,
    };

    const newInstituicao = await Instituicao.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateOne = async (req, res) => {
  try {
    const {
      nome, CNPJ, tipo,
    } = req.body;

    if (!isValidCNPJ(CNPJ)) {
      throw new Error('CNPJ inválido');
    }
    const instituicao = await Instituicao.findByPk(req.params.id);

    if (!instituicao) {
      throw new Error('Instituição de Ensino não encontrada');
    }

    const payload = {
      nome,
      CNPJ,
      tipo,
    };

    Object.assign(instituicao, payload);

    const updatedInstituicao = await instituicao.save();
    return successResponse(req, res, { updatedInstituicao });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const deleteOne = async (req, res) => {
  try {
    await Instituicao.destroy({
      where: { id: req.params.id },
      individualHooks: true,
    });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
