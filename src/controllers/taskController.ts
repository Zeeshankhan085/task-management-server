
// @ts-nocheck

import { Request, Response } from 'express';
import Task from '../models/task';
import Board from '../models/board';
import Column from '../models/column';
import { tasks, columns, subTasks as subTasksTable } from '../db/schema';
import db from '../db';
import { eq, and, inArray } from 'drizzle-orm';


export const createTask = async (req: Request, res: Response) => {
  console.log('hellllllllllll-------------------');
  
  const {boardId, columnId} = req.params;
  const { task } = req.body;
  console.log("task", task);
  console.log({boardId}, {columnId});
  
  

  try {
    const createdTask = await db.insert(tasks).values({...task, column_id: columnId}).returning();
    console.log(createdTask);
    
    res.status(201).json(createTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const moveTask = async (req: Request, res: Response) => {
  try {
    const { columnId, taskId } = req.params;
    const { targetColumnId } = req.body;

    const updatedTask = await db
      .update(tasks)
      .set({ column_id: targetColumnId })
      .where(
        and(
          eq(tasks.id, taskId),
          eq(tasks.column_id, columnId)
        )
      )
      .returning();

    if (!updatedTask.length) {
      return res.status(404).send('Task not found or already moved.');
    }

    res.status(200).send(updatedTask[0]);
  } catch (error) {
    console.error("Move Task Error:", error);
    res.status(500).send('Internal Server Error');
  }
};


export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const id = Number(taskId);
    if (isNaN(id)) {
  return res.status(400).json({ error: "Invalid ID" });
} 
try{
    await db.delete(tasks).where(eq(tasks.id, id))
    res.status(204).json({message: 'Deleted Successfully'})
   
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const editTaskAndSubTasks = async (req: Request, res: Response) =>  {
  const {boardId, taskId} = req.params;
  const {task, deletedSubTaskIds} = req.body;
  const {subTasks} = task
  const id = Number(taskId);
      if (isNaN(id)) {
  return res.status(400).json({ error: "Invalid ID" });
} 

  try {
     const [column] = await db.select().from(columns)
      .where(and(eq(columns.name, task.status), eq(columns.board_id, boardId)));

    if (!column) {
      return res.status(400).json({ error: "Invalid status or board ID." });
    }
    const updatedTask = await db.update(tasks)
      .set({ title: task.tite, description: task.description, status: column.name, column_id: column.id })
      .where(eq(tasks.id, taskId));
    if(deletedSubTaskIds.length > 0){
      await db.delete(subTasksTable).where(inArray(subTasksTable.id, deletedSubTaskIds))
    }
    
       for (const st of subTasks) {
          if (st.id) {

            await db.update(subTasksTable)
              .set({ title: st.title })
              .where(eq(subTasksTable.id, st.id));
          } else {
            await db.insert(subTasksTable)
              .values({ title: st.title, task_id: id });
          }
        }
    
    
        res.status(200).json({ message: "Tasks updated." });

  }  catch (error) {
    // Handle errors (e.g., invalid ID format, validation errors)
    res.status(400).json({ message: error.message });
  }

}

export const update