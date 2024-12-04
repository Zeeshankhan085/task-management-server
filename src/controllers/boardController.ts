import {  Response, Request } from 'express';
import Board from '../models/board';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import {createNewColumns} from './columnController'

export const getAllBoards = async (req: Request, res: Response) => {
  
  try {
    const boards = await Board.find()
    .populate({
      path: 'columns',
      populate: {
        path: 'tasks'
      }
    });
    res.status(200).json(boards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewBoard = async (req: Request, res: Response) => {
  const board = req.body;
  try {
    if(board.columns?.length > 0) {
    const columns = await createNewColumns(board.columns)
    board.columns = columns;
    }
    const newBoard = new Board(board);
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  
}

export const deleteBoard = async (req: Request, res: Response) => {
  console.log('delete board');
  
  const { boardId } = req.params;

  if (!ObjectId.isValid(boardId)) {
    return res.status(400).send('Invalid Board ID format');
  }

  try {
    const board = await Board.findByIdAndDelete(boardId);
    if (!board) {
      return res.status(404).send('Board not found');
    }

    res.status(200).json({ message: 'Board deleted successfully', board });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
