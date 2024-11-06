import mongoose, { Schema, Document } from 'mongoose';
import Exam from './exam.model';

export enum BranchType {
  TYT_MATH = 'TYT_MATH',
  TYT_TR = 'TYT_TR',
  TYT_SCIENCE = 'TYT_SCIENCE',
  TYT_SOCIAL = 'TYT_SOCIAL',
  AYT_MATH = 'AYT_MATH',
  AYT_SCIENCE = 'AYT_SCIENCE',
  AYT_PHY = 'AYT_PHY',
  AYT_CHEM = 'AYT_CHEM',
  AYT_BIO = 'AYT_BIO',
  AYT_LITERATURE = 'AYT_LITERATURE',
  AYT_SOC1 = 'AYT_SOS1',
  AYT_SOC2 = 'AYT_SOS2',
  AYT_HIS1 = 'AYT_HIS1',
  AYT_HIS2 = 'AYT_HIS2',
  AYT_GEO1 = 'AYT_GEO1',
  AYT_GEO2 = 'AYT_GEO2',
  AYT_RELIGION = 'AYT_RELIGION',
  AYT_PHILOSOPHY = 'AYT_PHILOSOPHY',
  AYT_YDS = 'AYT_YDS',
  LGS_MATH = 'LGS_MATH',
  LGS_TURKISH = 'LGS_TURKISH',
  LGS_SCIENCE = 'LGS_SCIENCE',
  LGS_SOCIAL = 'LGS_SOCIAL',
  LGS_ENG = 'LGS_ENG',
  LGS_RELIGION = 'LGS_RELIGION',
  KPSS_TURKISH = 'KPSS_TURKISH',
  KPSS_MATH = 'KPSS_MATH',
  KPSS_HISTORY = 'KPSS_HISTORY',
  KPSS_GEOGRAPHY = 'KPSS_GEOGRAPHY',
  KPSS_CITY = 'KPSS_CITY',
  KPSS_CURRENT = 'KPSS_CURRENT',
  ALES_SAY = 'ALES_SAY',
  ALES_SOZ = 'ALES_SOZ',
  DGS_MATH = 'DGS_MATH',
  DGS_TURKISH = 'DGS_TURKISH',
}

export interface IBranchDocument extends Document {
  _id: Schema.Types.ObjectId;
  type: BranchType;
  solvingTime?: number;
  correct: number;
  wrong: number;
  getTotal(): number;
}

interface IBranchModel extends mongoose.Model<IBranchDocument> {}

const BranchExamSchema = new Schema<IBranchDocument, IBranchModel>({
  type: {
    type: String, // Aslında burada `String` belirtiyoruz ama Mongoose bu değeri enum ile kontrol edecek.
    enum: Object.values(BranchType),
    required: true,
  },
  solvingTime: { type: Number, required: false },
  correct: { type: Number, required: true, min: 0, max: 40 },
  wrong: { type: Number, required: true, min: 0, max: 40 },
});

BranchExamSchema.methods.getTotal = function (this: IBranchDocument): number {
  return this.correct - this.wrong / 4;
};

const BranchExam =
  mongoose.models.BranchExam ||
  Exam.discriminator<IBranchDocument>('BranchExam', BranchExamSchema);

export default BranchExam;
