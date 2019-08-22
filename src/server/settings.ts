export const dns = (process.env.DNS || '').trim().replace(/\/$/gi, '');
export const sentryKey = process.env.SENTRY_KEY;
export const port = process.env.NODE_PORT || 3000;
export const env = (process.env.NODE_ENV || 'development').trim();
export const bcryptSaltFactor = env === 'test' ? 4 : 11;

export const isProduction = env === 'production';
export const isDevelopment = env === 'development';
export const isTest = env === 'test';

/* tslint:disable */
export const auth = {
  timeout: 480, // 8 hour
  appTimeout: 1440, // 24 hours
  resetPasswordTimeout: 1 * 60 * 24, //2 days
  secret: Buffer.from('RSd7w8utAWSjmJ8QOGt2OayydAQ3jKnDRMPDuwqaODObyyX0LS', 'base64').toString('utf8')
};
/* tslint:enable */

export const mail = {
  from: process.env.MAILGUN_FROM,
  credentials: {
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};