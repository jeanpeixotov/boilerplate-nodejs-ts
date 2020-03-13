import * as _ from 'lodash';

import { validate } from '../github';

describe('validators/github', () => {
  const data = {
    id: '7660020889',
  };

  it('should return valid for a full object', async () => {
    const model = data;
    const validated = await validate(model);
    return expect(validated).toEqual(data) as any;
  });

  it('should return invalid when data is empty', async () => {
    const model = _.clone(data);
    delete model.id;
    return validate(model).catch(e => expect(e.validationError).toBe(true));
  });

});