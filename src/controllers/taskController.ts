
// @ts-nocheck

import { Request, Response } from 'express';
import Task from '../models/task';
import Board from '../models/board';
import mongoose from 'mongoose';
import Column from '../models/column';

const { ObjectId } = mongoose.Types;

export const createTask = async (req: Request, res: Response) => {
  const { task, columnId } = req.body;
  console.log("task", task);
  

  try {
    const newTask = new Task(task);
    await newTask.save();
    console.log("new task", newTask);
    
    
    const column = await Column.findById(columnId);
    if (!column) {
      return res.status(404).send('Column not found');
    }
    column.tasks.push(newTask._id);
    await column.save();

    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const moveTask = async (req: Request, res: Response) => {
  try {
    const {  taskId,  } = req.params;
    const { targetColumnId, boardId,sourceColumnId } = req.body;

    if (!ObjectId.isValid(boardId) || !ObjectId.isValid(taskId) ||
        !ObjectId.isValid(sourceColumnId) || !ObjectId.isValid(targetColumnId)) {
      return res.status(400).send('Invalid ID format');
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).send('Board not found');
    }

    const sourceColumn = await Column.findById(sourceColumnId);
const targetColumn =await  Column.findById(targetColumnId)
    console.log({sourceColumn});
    
    if (!sourceColumn || !targetColumn) {
      return res.status(404).send('Column not found');
    }

    const taskIndex = sourceColumn.tasks.findIndex(task => task._id.equals(new ObjectId(taskId)));
    if (taskIndex === -1) {
      return res.status(404).send('Task not found in the source column');
    }

    const [task] = sourceColumn.tasks.splice(taskIndex, 1);
    targetColumn.tasks.push(task);

    await sourceColumn.save();
    await targetColumn.save()

    res.status(200).send(board);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the column that contains the task ID
    const column = await Column.findOne({ tasks: taskId });

    if (!column) {
      return res.status(404).json({ message: 'Column containing the task not found' });
    }

    // Remove the task ID from the tasks array
    column.tasks.pull(taskId);
    await column.save();

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({ message: 'Task deleted and removed from column successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const editTask = async (req: Request, res: Response) =>  {
  const {taskId} = req.params;
  const {task} = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, task, {
      new: true,
      runValidators: true
    })
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const sourceCol = await Column.findOne({tasks: taskId})
    console.log({sourceCol});
    
    sourceCol.tasks.pull(taskId);
    sourceCol.save()
    const targetColumn  = await Column.findOne({name: task.status});
    targetColumn.tasks.push(taskId)
    targetColumn.save()
    
    // Respond with the updated task
    res.json(updatedTask);
  }  catch (error) {
    // Handle errors (e.g., invalid ID format, validation errors)
    res.status(400).json({ message: error.message });
  }

}