import mongoose, { Schema, Document } from 'mongoose';

export interface IColumn extends Document {
  name: string;
  tasks: mongoose.Types.ObjectId[]; // Array of ObjectId references
}

const ColumnSchema: Schema = new Schema({
  name: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }], // Array of ObjectId references
});

const Column = mongoose.model<IColumn>('Column', ColumnSchema); // Use IColumn for the model

export default Column;
