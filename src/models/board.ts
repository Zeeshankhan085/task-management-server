import mongoose, { Schema, Document } from 'mongoose';

export interface IBoard extends Document {
  name: string;
  columns: mongoose.Types.ObjectId[]; // Array of ObjectId references
}

const BoardSchema: Schema = new Schema({
  name: { type: String, required: true },
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column', default: [] }], // Array of ObjectId references
});

const Board = mongoose.model<IBoard>('Board', BoardSchema); // Use IBoard for the model

export default Board;
