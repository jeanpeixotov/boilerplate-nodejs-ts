import { Router } from 'express';

import { find } from './find';

export const router = Router();

router.get('/:id', find);
