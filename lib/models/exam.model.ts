import mongoose, { Schema, Document, Model } from 'mongoose';

interface Exam {
  userId: mongoose.Types.ObjectId;
  kindeId: string;
  examName: string;
  examDate: Date;
  solvingDate: Date;
}

export interface ExamDocument extends Exam, Document {
  _id: Schema.Types.ObjectId;
}

interface ExamModel extends Model<ExamDocument> {}

const examSchema = new mongoose.Schema<ExamDocument, ExamModel>(
  {
    kindeId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: false,
    },
    examName: { type: String, required: true },
    solvingDate: { type: Date, required: true },
  },
  {
    discriminatorKey: 'examType',
    timestamps: true,
  }
);

const Exam =
  mongoose.models.Exam ||
  mongoose.model<ExamDocument, ExamModel>('Exam', examSchema);

export default Exam;

