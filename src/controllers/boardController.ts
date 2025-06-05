import {  Response, Request } from 'express';
import { boards, columns as ColumnsTable, } from '../db/schema';
import db from '../db/database'
import { eq, inArray } from 'drizzle-orm';
import { FlatRow, nestBoards } from '../utils/board';

export const getAllBoards = async (req: Request, res: Response) => {
  

  try {
  const boards = await db.query.boards.findMany({
  with: {
    columns: {
      with: {
        tasks: {
          with: {
            subTasks: true
          }
        }
      }
    }
  }
});

  res.status(200).json(boards)
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewBoard = async (req: Request, res: Response) => {
  const { name, columns } = req.body;
  console.log(name, columns, "-------------------------");

  try {
    const [board] = await db.insert(boards).values({ name }).returning();

    let insertedColumns = [];
    if (columns.length > 0) {
      const columnPromises = columns.map((column: { name: string }) =>
        db.insert(ColumnsTable)
          .values({ name: column.name, board_id: board.id })
          .returning()
      );
      const results = await Promise.all(columnPromises);
      insertedColumns = results.map(([col]) => col);
    }

    res.status(201).json({ ...board, columns: insertedColumns });
  } catch (error: any) {
    console.error("Board creation error:", error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};


export const updateBoardAndColumns = async (req: Request, res: Response) => {
  const boardId = Number(req.params.boardId);
  const { name, columns, deletedColumnIds = [] } = req.body;


  try {
    // Update board name
    await db.update(boards)
      .set({ name })
      .where(eq(boards.id, boardId));

    // Delete columns (if any)
    if (deletedColumnIds.length > 0) {
      await db.delete(ColumnsTable)
        .where(inArray(ColumnsTable.id, deletedColumnIds));
    }

    // Update or insert columns
    for (const column of columns) {
      if (column.id) {
        // Update existing column
        await db.update(ColumnsTable)
          .set({ name: column.name })
          .where(eq(ColumnsTable.id, column.id));
      } else {
        // Create new column
        await db.insert(ColumnsTable)
          .values({ name: column.name, board_id: boardId });
      }
    }

    res.status(200).json({ message: "Board and columns updated." });
  } catch (error: any) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


export const deleteBoard = async (req: Request, res: Response) => {
  console.log('delete board');
  
  const boardId: number = Number(req.params.boardId);
  if(isNaN(boardId)){
    res.status(400).json({error: 'Invalid Id'})
  }
  try {
  await db.delete(boards).where(eq(boards.id, boardId));
   res.status(204).json({ message: 'Board deleted successfully' });
  } catch (err){
    res.status(400).json({error: 'Error Occured'})
  }
};
