import { Fatura } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const faturas = await Fatura.findAndCountAll({
      order: [
        ['createdAt', 'DESC'], ['diaVencimento', 'ASC'],
        ['status', 'ASC'],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { faturas });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getAllByMatricula = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const query = {
      matriculaId: req.params.id,
    };

    if (req.query.status) {
      if (!['Aberta', 'Atrasada', 'Paga'].includes(req.query.status)) {
        throw new Error('Valor inválido para campo Status');
      }
      query.status = req.query.status;
    }

    const faturas = await Fatura.findAndCountAll({
      where: {
        ...query,
      },
      order: [
        ['createdAt', 'DESC'], ['diaVencimento', 'ASC'],
        ['status', 'ASC'],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { faturas });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
