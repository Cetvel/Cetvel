import { Schema, Types , Model } from 'mongoose';
import { IUserDocument } from "../user.model";
import bcrypt from 'bcrypt';
import { UserModel } from '../user.model';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserMethods {
    getStringId(): string;
    isPasswordMatch(password: string): Promise<boolean>;
}

export const userMethods: IUserMethods = {

    getStringId: function (this: IUserDocument): string {
        return this._id.toString();
    },
    isPasswordMatch: async function (this: IUserDocument, password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

}

export interface IUserStaticMethods {
  isEmailTaken: (email: string, excludeUserId?: string | Types.ObjectId) => Promise<boolean>;
  
}
export const userStaticMethods: IUserStaticMethods = {
    isEmailTaken: async function (this: Model<IUserDocument>, email: string, excludeUserId?: string | Types.ObjectId): Promise<boolean> {
        const query: any = { email };
        if (excludeUserId) {query._id = { $ne: excludeUserId };}
        const user = await this.findOne(query);
        return !!user;
    }
};




export const userPlugins = (schema: Schema<IUserDocument, UserModel>) => {
    //Defining Funtions
    function hashPasswordPlugin(schema: Schema< IUserDocument,UserModel>) {
        schema.pre('save', async function (next) {
            const user = this as any; // this refers to the document being saved
            if (user.isModified('password')) {
                user.password = await bcrypt.hash(user.password, 8);
            }
            next();
        })
    }

    
    function uniqueValidatorPlugin(schema: Schema<any, any>) {
        schema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
    }

    
    //Applying Plugins
    hashPasswordPlugin(schema);
    uniqueValidatorPlugin(schema);
}

