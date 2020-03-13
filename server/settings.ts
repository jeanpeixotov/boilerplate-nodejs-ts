// tslint:disable-next-line
require('dotenv').config();

export const port = process.env.PORT || 3000;
export const env = process.env.ENV || 'prd';
export const isDevelopment = env === 'dev';
export const isProduction = env === 'prd';

export const configAws = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESS,
};

export const elkUrl = process.env.ELK_ENDPOINT;