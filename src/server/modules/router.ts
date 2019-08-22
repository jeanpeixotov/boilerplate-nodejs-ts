import { Router } from 'express';

import { router as adminRouter } from './admin/routes';
import { router as contentRouter } from './content/routes';

export const router = Router();

router.get('/health', (req, res) => {
  return res.json('alive');
});

router.use('/admin', adminRouter);
router.use('/content', contentRouter);