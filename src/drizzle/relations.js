"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtasksRelations = exports.tasksRelations = exports.boardsRelations = exports.columnsRelations = void 0;
const relations_1 = require("drizzle-orm/relations");
const schema_1 = require("./schema");
exports.columnsRelations = (0, relations_1.relations)(schema_1.columns, ({ one, many }) => ({
    board: one(schema_1.boards, {
        fields: [schema_1.columns.boardId],
        references: [schema_1.boards.id]
    }),
    tasks: many(schema_1.tasks),
}));
exports.boardsRelations = (0, relations_1.relations)(schema_1.boards, ({ many }) => ({
    columns: many(schema_1.columns),
}));
exports.tasksRelations = (0, relations_1.relations)(schema_1.tasks, ({ one, many }) => ({
    column: one(schema_1.columns, {
        fields: [schema_1.tasks.columnId],
        references: [schema_1.columns.id]
    }),
    subtasks: many(schema_1.subtasks),
}));
exports.subtasksRelations = (0, relations_1.relations)(schema_1.subtasks, ({ one }) => ({
    task: one(schema_1.tasks, {
        fields: [schema_1.subtasks.taskId],
        references: [schema_1.tasks.id]
    }),
}));
