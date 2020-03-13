import { Router } from 'express';

import { router as githubRouter } from './github';

export const router = Router();

router.get('/health', (req, res) => {
  return res.json('alive');
});

router.use('/github', githubRouter);
