import mongoose, { Schema, Document } from 'mongoose';

export interface ISubTask extends Document {
  title: string;
  isCompleted: boolean;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: String, default: false },
});

const SubTask = mongoose.model<ISubTask>('Subtask', taskSchema);

export default SubTask;
