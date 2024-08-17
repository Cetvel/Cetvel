import mongoose, { Document, Schema, Model } from "mongoose";
import { userPlugins, IUserMethods, userMethods, IUserStaticMethods, userStaticMethods } from "./plugins/user.plugins";

interface IUser {
    clerkId?: string;
    name: string;
    email: string;
    password: string;
    notificationPreferences: {
        pomodoroReminder: { type: Boolean, default: true },
        upcomingTasks: { type: Boolean, default: true },
      }
    pictures: {
        profilePicture: string;
        coverPicture: string;
        clockPicture: string
    }
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
    notificationPreferences: {
        pomodoroReminder: { type: Boolean, default: true },
        upcomingTasks: { type: Boolean, default: true },
      },
    pictures : {
        profilePicture: String,
        coverPicture: String,
        clockPicture: String
    }
}, {
    timestamps: true,
});

userPlugins(userSchema);
userSchema.methods = userMethods;
Object.assign(userSchema.statics, userStaticMethods);

// Use `mongoose.models` to avoid overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model<IUserDocument, UserModel>('User', userSchema);

export default User;
