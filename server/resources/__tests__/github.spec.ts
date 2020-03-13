import * as nock from 'nock';
import * as supertest from 'supertest';

import { closeApp, setupApp } from '../../main';

describe('github resource', () => {
  let request: any;
  beforeAll(async () => {
    const app = await setupApp();
    request = supertest(app);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.cleanAll();
    closeApp();
  });

  describe('github http', () => {
    it('get followers', async () => {
      nock('https://api.github.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/users/jeanpeixotov')
        .reply(200, {
          followers: 30
        });

      const response: any = await request.get(`/github/jeanpeixotov`);
      expect(response.body).toEqual({ followers: 30 });
    });
  });
});