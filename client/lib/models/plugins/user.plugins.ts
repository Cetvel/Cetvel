import { Schema, Types, Model } from 'mongoose';
import { IUserDocument } from "../user.model";
import bcrypt from 'bcrypt';
import { UserModel } from '../user.model';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserMethods {
    getStringId(): string;
    isPasswordMatch(password: string): Promise<boolean>;
    hashPassword(): Promise<void>;
}

export const userMethods: IUserMethods = {

    getStringId: function (this: IUserDocument): string {
        return this._id.toString();
    },
    isPasswordMatch: async function (this: IUserDocument, password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    },
    hashPassword: async function (this: IUserDocument): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

}

export interface IUserStaticMethods {
    isEmailTaken: (email: string, excludeUserId?: string | Types.ObjectId) => Promise<boolean>;

}
export const userStaticMethods: IUserStaticMethods = {
    isEmailTaken: async function (this: Model<IUserDocument>, email: string, excludeUserId?: string | Types.ObjectId): Promise<boolean> {
        const query: any = { email };
        if (excludeUserId) { query._id = { $ne: excludeUserId }; }
        const user = await this.findOne(query);
        return !!user;
    }
};




export const userPlugins = (schema: Schema<IUserDocument, UserModel>) => {
    //Defining Funtions
    function uniqueValidatorPlugin(schema: Schema<any, any>) {
        schema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
    }

    uniqueValidatorPlugin(schema);
}

