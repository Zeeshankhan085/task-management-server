import { relations } from "drizzle-orm/relations";
import { boards, columns, tasks, subtasks } from "./schema";

export const columnsRelations = relations(columns, ({one, many}) => ({
	board: one(boards, {
		fields: [columns.boardId],
		references: [boards.id]
	}),
	tasks: many(tasks),
}));

export const boardsRelations = relations(boards, ({many}) => ({
	columns: many(columns),
}));

export const tasksRelations = relations(tasks, ({one, many}) => ({
	column: one(columns, {
		fields: [tasks.columnId],
		references: [columns.id]
	}),
	subtasks: many(subtasks),
}));

export const subtasksRelations = relations(subtasks, ({one}) => ({
	task: one(tasks, {
		fields: [subtasks.taskId],
		references: [tasks.id]
	}),
}));