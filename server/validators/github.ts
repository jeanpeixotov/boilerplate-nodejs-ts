import { joi, validateAsPromise } from '.';
import { IGithub } from '../interfaces/github';

const schema = joi.object().keys({
  id: joi.string().trim().required(),
});

export const validate = (model: any): Promise<IGithub> => {
  return validateAsPromise<any>(model, schema);
};
