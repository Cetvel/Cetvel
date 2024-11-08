import mongoose, { Document, Schema, Model } from 'mongoose';

enum Exams {
  YKS,
  LGS,
  KPSS,
  ALES,
  DGS,
}

enum field {
  SAY,
  SOZ,
  EA,
  DIL,
}
interface IUser {
  kindeId: string; // Kinde ID
  name: string; // Username
  email: string;
  password?: string; // Password
  field?: field; // Ayt Field if user is a high school student
  grade?: number; // class
  exam?: Exams; // Exam type
  cover_picture?: string;
  timer_picture?: string;
  profile_picture?: string;
}

export interface IUserDocument extends IUser, Document {
  _id: Schema.Types.ObjectId;
}

export interface UserModel extends Model<IUserDocument> {}

// Model is defined only if it hasn't been already
const userSchema = new Schema<IUserDocument, UserModel>(
  {
    kindeId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    grade: {
      type: Number,
      required: false,
      trim: false,
    },
    exam: {
      type: String,
      required: false,
      enum: Object.values(Exams),
      trim: false,
    },
    field: {
      type: String,
      required: false,
      enum: Object.values(field),
      trim: false,
    },
    password: {
      type: String,
      required: false,
      trim: true,
      minlength: 4,
    },
    cover_picture: {
      type: String,
      required: false,
      trim: true,
    },
    timer_picture: {
      type: String,
      required: false,
      trim: true,
    },
    profile_picture: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model<IUserDocument, UserModel>('User', userSchema);

export default User;
