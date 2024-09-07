import mongoose, { Document, Schema, Model } from "mongoose";
import { userPlugins, IUserMethods, userMethods, IUserStaticMethods, userStaticMethods } from "./plugins/user.plugins";

enum StudyField {
    YKS,
    LGS,
    KPSS,
    ALES,
    DGS
}

interface IUser {
    clerkId: string;
    name: string;
    email: string;
    password: string;
    class?: string;
    studyField?: string;
}

export interface IUserDocument extends IUser, Document, IUserMethods {
    _id: Schema.Types.ObjectId;
}

export interface UserModel extends Model<IUserDocument>, IUserStaticMethods { }

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
        type: String,
        required: false,
        trim: false,
    },
    studyField: {
        type: String,
        required: false,
        enum: Object.values(StudyField),
        trim: false,
    },

    email: {
        type: String,
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

userPlugins(userSchema);
userSchema.methods = userMethods;
Object.assign(userSchema.statics, userStaticMethods);


const User = mongoose.models.User || mongoose.model<IUserDocument, UserModel>('User', userSchema);

export default User;
