
import { createSelectSchema } from 'drizzle-zod';
import { boards, columns, subTasks, tasks, BoardRow, ColumnRow, TaskRow, SubtaskRow } from '../db/schema';

type Task = TaskRow & {subtasks: SubtaskRow}

type Column = ColumnRow & {tasks: Task[]}
type Board = BoardRow & {columns: Column[]}

export type FlatRow = {
  boardId: number;
  boardName: string;

  columnId: number | null;
  columnName: string | null;

  taskId: number | null;
  taskTitle: string | null;
  taskDescription: string | null;
  taskStatus: string | null;

  subtaskId: number | null;
  subtaskTitle: string | null;
};

export function nestBoards(flatRows: FlatRow[]): Board[] {
  const boards = new Map();

  for (const row of flatRows) {
    // Board
    if (!boards.has(row.boardId)) {
      boards.set(row.boardId, {
        id: row.boardId,
        name: row.boardName,
        columns: [],
      });
    }

    const board = boards.get(row.boardId);

    // Column
    let column = board.columns.find((col: Column) => col.id === row.columnId);
    if (!column && row.columnId != null) {
      column = {
        id: row.columnId,
        name: row.columnName,
        tasks: [],
      };
      board.columns.push(column);
    }

    // Task
    if (column) {
      let task = column.tasks.find((t: Task) => t.id === row.taskId);
      if (!task && row.taskId != null) {
        task = {
          id: row.taskId,
          title: row.taskTitle,
          description: row.taskDescription,
          status: row.taskStatus,
          subtasks: [],
        };
        column.tasks.push(task);
      }

      // Subtask
      if (task && row.subtaskId != null) {
        task.subtasks.push({
          id: row.subtaskId,
          title: row.subtaskTitle,
        });
      }
    }
  }

  return Array.from(boards.values());
}
