export const port = process.env.PORT;
export const env = process.env.ENV;
export const isDevelopment = env === 'dev';
export const isHomologation = env === 'hml';
export const isProduction = env === 'prd';
export const isLocal = env === 'local';

if (isLocal) {
  // tslint:disable-next-line
  require('dotenv').config({ path: 'develop.env' });
}

export const configAws = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESS,
};

export const elkUrl = process.env.ELK_ENDPOINT;