import mongoose, { Document, Schema, Model } from 'mongoose';

enum StudyField {
  YKS,
  LGS,
  KPSS,
  ALES,
  DGS,
}

enum aytField {
  SAY,
  SOZ,
  EA,
  DIL,
}
interface IUser {
  kindeId: string; // Kinde ID
  name: string; // Username
  password?: string; // Password
  field?: aytField; // Ayt Field if user is a high school student
  grade?: number; // Grade
  studyField?: string; // Study Field highschool, university etc.
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
    grade: {
      type: Number,
      required: false,
      trim: false,
    },
    studyField: {
      type: String,
      required: false,
      enum: Object.values(StudyField),
      trim: false,
    },
    field: {
      type: String,
      required: false,
      enum: Object.values(aytField),
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
