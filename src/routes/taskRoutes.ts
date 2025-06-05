import { Router } from 'express';
import { createTask, deleteTask, moveTask, editTaskAndSubTasks } from '../controllers/taskController';

const router = Router({ mergeParams: true });

// router.post('/tasks/', createTask);
router.post('/', createTask);

router.put('/:taskId/move', moveTask);
router.put('/:taskId/', editTaskAndSubTasks);


router.delete('/:taskId', deleteTask)

export default router;
