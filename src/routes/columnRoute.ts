import { Router } from 'express';
import { createColumn } from '../controllers/columnController';

const router = Router({ mergeParams: true });

router.post('/columns', createColumn);

export default router;
