"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtasks = exports.tasks = exports.columns = exports.boards = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.boards = (0, pg_core_1.pgTable)("boards", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity({ name: "boards_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    name: (0, pg_core_1.varchar)({ length: 200 }).notNull(),
});
exports.columns = (0, pg_core_1.pgTable)("columns", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity({ name: "columns_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    name: (0, pg_core_1.varchar)({ length: 120 }).notNull(),
    boardId: (0, pg_core_1.integer)("board_id").notNull(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.boardId],
        foreignColumns: [exports.boards.id],
        name: "columns_board_id_boards_id_fk"
    }).onDelete("cascade"),
]);
exports.tasks = (0, pg_core_1.pgTable)("tasks", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity({ name: "tasks_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    tite: (0, pg_core_1.varchar)({ length: 200 }).notNull(),
    description: (0, pg_core_1.varchar)({ length: 500 }).notNull(),
    status: (0, pg_core_1.varchar)({ length: 50 }).notNull(),
    columnId: (0, pg_core_1.integer)("column_id").notNull(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.columnId],
        foreignColumns: [exports.columns.id],
        name: "tasks_column_id_columns_id_fk"
    }).onDelete("cascade"),
]);
exports.subtasks = (0, pg_core_1.pgTable)("subtasks", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity({ name: "subtasks_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    name: (0, pg_core_1.varchar)({ length: 200 }).notNull(),
    taskId: (0, pg_core_1.integer)("task_id").notNull(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.taskId],
        foreignColumns: [exports.tasks.id],
        name: "subtasks_task_id_tasks_id_fk"
    }).onDelete("cascade"),
]);
