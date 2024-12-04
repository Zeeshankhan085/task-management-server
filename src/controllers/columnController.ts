// @ts-nocheck


import { Request, Response } from 'express';
import Column, {IColumn} from '../models/column';
import Board from '../models/board';
import mongoose, { ObjectId } from 'mongoose';

export const createColumn = async (req: Request, res: Response) => {
  console.log(req.params, "params");
  
  const { boardId } = req.params;
  const columns = req.body.columns; // Array of columns
  const boardName = req.body.boardName;
console.log(boardId);

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      console.log('not  found');
      
      return res.status(500).json({ message: 'Board not found' });
    }

    // const columnIds = await Promise.all(columns.map(async (column: any) => {
    //   if (column._id) {
    //     // Update existing column
    //     const updatedColumn = await Column.findByIdAndUpdate(column._id, column, { new: true });
    //     return updatedColumn?._id;
    //   } else {
    //     // Create new column
    //     const newColumn = new Column(column);
    //     await newColumn.save();
    //     return newColumn._id;
    //   }
    // }));

    // Update board with new list of column IDs
    board.columns = await createNewColumns(columns)
  board.name = boardName;
    board.save()

    res.status(200).json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewColumns = async (columns: IColumn[]): Promise<mongoose.Types.ObjectId[]> => {
  const columnIds = await Promise.all(columns.map(async (column: any) => {
    if (column._id) {
      // Update existing column
      const updatedColumn = await Column.findByIdAndUpdate(column._id, column, { new: true });
      return updatedColumn?._id;
    } else {
      // Create new column
      const newColumn = new Column(column);
      await newColumn.save();
      return newColumn._id as  mongoose.Types.ObjectId;
    }
  }));
  return columnIds
}