import { desc, relations } from "drizzle-orm";
import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const subTasks = pgTable("subtasks", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", {length: 200}).notNull(),
    completed: boolean('completed').default(false).notNull(),
    task_id: integer("task_id").references(() => tasks.id, {onDelete: 'cascade'}).notNull()
})

export const tasks = pgTable("tasks", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("tite", {length: 200}).notNull(),
    description: varchar("description", {length: 500}).notNull(),
    status: varchar("status", {length: 50}).notNull(),
    column_id: integer("column_id").references(() => columns.id, {onDelete: "cascade"}).notNull()
})



export const columns = pgTable("columns", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", {length: 120}).notNull(),
    board_id: integer("board_id").references(() => boards.id, {onDelete: "cascade"}).notNull()
})


export const boards = pgTable("boards", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", {length: 200}).notNull().unique(),
})

export const boardsRelations = relations(boards, ({many}) => ({
    columns: many(columns)
}) )

export const columnsRelations = relations(columns, ({ one }) => ({
  board: one(boards, {
    fields: [columns.board_id],
    references: [boards.id]
  })
}));

export const columnsTaskRelations = relations(columns, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksColumnRelations = relations(tasks, ({ one }) => ({
  column: one(columns, {
    fields: [tasks.column_id],
    references: [columns.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ many }) => ({
  subTasks: many(subTasks),
}));

export const subTasksRelations = relations(subTasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subTasks.task_id],
    references: [tasks.id],
  }),
}));


export type BoardRow = typeof boards.$inferSelect
export type ColumnRow = typeof columns.$inferSelect
export type TaskRow = typeof tasks.$inferSelect
export type SubtaskRow = typeof subTasks.$inferSelect