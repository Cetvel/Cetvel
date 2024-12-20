import mongoose, { Schema, model, Document } from 'mongoose';
import Exam from './exam.model';

export interface IALES {
  solvingTime?: number;
  say: {
    solvingTime?: number;
    correct: number;
    wrong: number;
  };
  soz: {
    solvingTime?: number;
    correct: number;
    wrong: number;
  };
  point: number;
}

export interface IALESDocument extends IALES, Document {
  _id: Schema.Types.ObjectId;
}
const AlesSchema = new Schema<IALESDocument>({
  solvingTime: { type: Number, required: false, max: 150 },
  say: {
    solvingTime: { type: Number, required: false, max: 135 },
    correct: { type: Number, required: true, min: 0, max: 50 },
    wrong: { type: Number, required: true, min: 0, max: 50 },
  },
  soz: {
    solvingTime: { type: Number, required: false, max: 135 },
    correct: { type: Number, required: true, min: 0, max: 50 },
    wrong: { type: Number, required: true, min: 0, max: 50 },
  },
  point: { type: Number, required: false, min: 0, max: 100 },
});

const Ales =
  (mongoose.models.ALES as mongoose.Model<IALESDocument>) ||
  Exam.discriminator<IALESDocument>('ALES', AlesSchema);

export default Ales;
