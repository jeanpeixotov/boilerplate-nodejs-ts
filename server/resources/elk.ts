import * as AWS from 'aws-sdk';
import * as elasticsearch from 'elasticsearch';
import * as httpAwsEs from 'http-aws-es';

import { configAws, elkUrl, env } from '../settings';

let es: any = null;
if (env !== 'test') {
  es = new elasticsearch.Client({
    hosts: [elkUrl],
    connectionClass: httpAwsEs
  });

  AWS.config.update({
    credentials: new AWS.Credentials(configAws.accessKeyId, configAws.secretAccessKey),
    region: configAws.region
  });
}

const envPrefix = env === 'production' ? 'prd' : env;

export const log = async (params: any) => {
  try {
    if (env === 'test') return;

    const timestamp = new Date().toISOString();
    const date = timestamp.substr(0, 10);
    const index = `dw-${envPrefix}-integration-${date}`;

    const payload = {
      ...params,
      '@timestamp': timestamp
    };

    await es.index({ index, body: payload, type: '_doc' });
  } catch (err) {
    console.error('Elk error', err);
  }
};
