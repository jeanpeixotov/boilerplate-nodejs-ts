import * as JoiCore from 'joi';

function coerce(value: any, state: any, options: any): any {
  return value === '' ? null : value;
}

export const joi: typeof JoiCore = JoiCore.extend({
  base: JoiCore.string(),
  name: 'string',
  language: {
    phone: 'invalid phone number format',
    zipcode: 'invalid zipcode format'
  },
  coerce,
  rules: []
}).extend({
  base: JoiCore.date(),
  name: 'date',
  coerce
});

export function validateAsPromise<T>(model: any, schema: JoiCore.Schema): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    joi.validate(model, schema, { abortEarly: false, stripUnknown: <any>{ objects: true, arrays: false } }, (err: any, value: T) => {
      if (!err) return resolve(value);

      reject({
        validationError: true,
        message: err.details.map((d: any) => {
          d.path = d.path.join('.');
          return d;
        })
      });

    });
  });
}