import { Router } from 'express';
import { createSubTask, deleteSubTask, editSubTask, } from '../controllers/subTaskController';

const router = Router({ mergeParams: true });

// router.post('/tasks/', createTask);
router.post('/', createSubTask);

router.put('/:subTaskId/', editSubTask);
router.delete('/:subTaskId/', deleteSubTask);


export default router;
