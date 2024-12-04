import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  subTasks: {title: string, isCompleted: boolean}[];
}

const subTaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: String, required: true },
  subTasks: { type: [subTaskSchema], default: [] },

});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
