import { Router } from 'express';
import { createColumn } from '../controllers/columnController';

const router = Router({ mergeParams: true });

router.post('/', createColumn);

export default router;
