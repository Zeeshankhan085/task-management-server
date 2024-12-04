import { Router } from 'express';
import { createNewBoard, deleteBoard, getAllBoards } from '../controllers/boardController';

const router = Router({ mergeParams: true });

router.get('/boards', getAllBoards);
router.post('/boards', createNewBoard)
router.delete('/boards/:boardId', deleteBoard)

export default router;
