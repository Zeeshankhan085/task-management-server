import { pgTable, integer, varchar, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const boards = pgTable("boards", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "boards_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 200 }).notNull(),
});

export const columns = pgTable("columns", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "columns_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 120 }).notNull(),
	boardId: integer("board_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.boardId],
			foreignColumns: [boards.id],
			name: "columns_board_id_boards_id_fk"
		}).onDelete("cascade"),
]);

export const tasks = pgTable("tasks", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "tasks_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	tite: varchar({ length: 200 }).notNull(),
	description: varchar({ length: 500 }).notNull(),
	status: varchar({ length: 50 }).notNull(),
	columnId: integer("column_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.columnId],
			foreignColumns: [columns.id],
			name: "tasks_column_id_columns_id_fk"
		}).onDelete("cascade"),
]);

export const subtasks = pgTable("subtasks", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "subtasks_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 200 }).notNull(),
	taskId: integer("task_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [tasks.id],
			name: "subtasks_task_id_tasks_id_fk"
		}).onDelete("cascade"),
]);
