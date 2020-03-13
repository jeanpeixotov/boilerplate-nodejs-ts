import { ServiceError } from '../errors/service';
import * as elkService from '../resources/elk';
import { getFollowerCount } from '../resources/github';

export function sum(a: number, b: number): number {
  return a + b;
}

//exemplo de error com try catch
export function errorTryCatch(): any {
  try {
    throw new Error('error-2');
  } catch (err) {
    if ('error-2' === err.message) throw new ServiceError('not-found', { msg: 'Sistema indisponível, tente novamente mais tarde' });
    throw new ServiceError(err);
  }
}

//exemplo de error comum
export function simpleError(): any {
  throw new ServiceError('not-found', { msg: 'Sistema indisponível, tente novamente mais tarde' });
}

export const getFollowers = async (id: string) => {
  if (!!false) errorTryCatch();
  if (!!false) simpleError();

  elkService.log({
    user: '123123',
    origin: 'test',
    status: 'Success',
    endpoint: 'github test'
  });

  return await getFollowerCount(id);
};