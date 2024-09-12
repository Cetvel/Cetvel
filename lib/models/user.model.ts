import mongoose, { Document, Schema, Model } from "mongoose";

enum StudyField {
    YKS,
    LGS,
    KPSS,
    ALES,
    DGS
}

enum aytField {
    SAY,
    SOZ,
    EA,
    DIL
}
interface IUser {
    clerkId: string;
    name: string;
    email: [string];
    password: string;
    aytField?: aytField;
    class?: number;
    studyField?: string;
}



export interface IUserDocument extends IUser, Document {
    _id: Schema.Types.ObjectId;
}

export interface UserModel extends Model<IUserDocument> { }

// Model is defined only if it hasn't been already
const userSchema = new Schema<IUserDocument, UserModel>({
    clerkId: {
        type: String,
        required: false,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    class: {
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
    aytField: {
        type: String,
        required: false,
        enum: Object.values(aytField),
        trim: false,
    },
    email: {
        type: [String],
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false,
        trim: true,
        minlength: 4
    },
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model<IUserDocument, UserModel>('User', userSchema);

export default User;
