import { Request, Response } from 'express';
import db from '../db/database';
import { subTasks, tasks } from '../db/schema';
import { eq } from 'drizzle-orm';

export const createSubTask = async (req: Request, res: Response) => {
    const {taskId} = req.params;
    const subTask = req.body;
    try {
    const newSubTask = await db.insert(subTasks).values({...subTask, task_id: taskId }).returning()
        res.status(201).json(newSubTask)
    } catch(err){
        res.status(500).json({error: 'Error occured'})
    }
}

export const deleteSubTask = async (req: Request, res: Response) => {
    const {subTaskId} = req.params;
    const id = Number(subTaskId);
if (isNaN(id)) {
  return res.status(400).json({ error: "Invalid subtask ID" });
}
    try {
       await db.delete(subTasks).where(eq(subTasks.id, id))
       res.status(204).json({message: 'Deleted Sucessfully'})
    }  catch(err){
        res.status(500).json({error: 'Error occured'})
    }
}

export const editSubTask = (req: Request, res: Response) => {
    const subTask = req.body;
    const {subTaskId} = req.params;
    const id = Number(subTaskId);
    if (isNaN(id)) {
  return res.status(400).json({ error: "Invalid subtask ID" });
}
    try {
        const updatedSubTask = db.update(subTasks).set(subTask).where(eq(subTasks.id, id))
        res.status(204).json(updatedSubTask)
    } catch(err){
        res.status(500).json({err: 'Unknown Error Occured'})
    }
}