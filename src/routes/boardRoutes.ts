import { Router } from 'express';
import { createNewBoard, deleteBoard, getAllBoards, updateBoardAndColumns } from '../controllers/boardController';

const router = Router({ mergeParams: true });

router.get('/', getAllBoards);
router.post('/', createNewBoard)
router.delete('/:boardId', deleteBoard)
router.put('/:boardId', updateBoardAndColumns)

export default router;
