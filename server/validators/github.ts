import { joi } from '.';
import { IGithub } from '../interfaces/github';

const schema = joi.object().keys({
  id: joi.string().trim().required(),
});

export const validate = async (model: any): Promise<IGithub> => {
  return schema.validateAsync(model);
};
