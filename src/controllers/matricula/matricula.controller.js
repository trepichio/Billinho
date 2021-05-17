import { Matricula } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const matricula = await Matricula.findAndCountAll({
      order: [
        ['createdAt', 'DESC'], ['nomeCurso', 'ASC'],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { matricula });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getOne = async (req, res) => {
  try {
    const matricula = await Matricula.findByPk(req.params.id);
    return successResponse(req, res, { matricula });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};


export const createOne = async (req, res) => {
  try {
    const payload = req.body;

    // faturas will be created by afterCreate hook
    const newMatricula = await Matricula.create(payload);
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateOne = async (req, res) => {
  try {
    const payload = req.body;

    const matricula = await Matricula.findByPk(req.params.id);

    if (!matricula) {
      throw new Error('Matricula não encontrada');
    }

    Object.assign(matricula, payload);

    // beforeUpdate hook will check
    // if is valid to update with provided values
    // faturas will be recreated by afterUpdate hook
    const updatedMatricula = await matricula.save();
    return successResponse(req, res, { updatedMatricula });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteOne = async (req, res) => {
  try {
    await Matricula.destroy({
      where: { id: req.params.id },
      individualHooks: true,
    });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
