import mongoose, { Document, Schema, Model } from "mongoose";
import { userPlugins, IUserMethods, userMethods, IUserStaticMethods, userStaticMethods } from "./plugins/user.plugins";


interface IUser {
    name: string;
    email: string;
    password: string;
    studyField: "LGS" | "YKS" | "KPSS";
    tag: string[];
    pictures: {
        profilePicture: string;
        coverPicture: string;
    }
}

export interface IUserDocument extends IUser, Document, IUserMethods {
    _id: Schema.Types.ObjectId;
}

export interface UserModel extends Model<IUserDocument>, IUserStaticMethods { }

export const userSchema = new Schema<IUserDocument, UserModel>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
        // validate(value: any) {
        //     if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        //         throw new Error('Password must contain at least one letter and one number');
        //     }
        // },
    },
    tag: {
        type: [String],
        default: ["school", "work", "study"]
    },
    studyField: {
        type: String,
        required: true,
        enum: ["LGS", "YKS", "KPSS"]
    }
}, {
    timestamps: true,
});


userPlugins(userSchema);
userSchema.methods = userMethods;
Object.assign(userSchema.statics, userStaticMethods);



const User = mongoose.model<IUserDocument, UserModel>('User', userSchema);

export default User;

