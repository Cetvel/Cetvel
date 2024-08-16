import { Schema, Types, Model } from 'mongoose';
import { IUserDocument } from "../user.model";
import { UserModel } from '../user.model';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserMethods {
    getStringId(): string;
}

export const userMethods: IUserMethods = {

    getStringId: function (this: IUserDocument): string {
        return this._id.toString();
    }

}

export interface IUserStaticMethods {}
export const userStaticMethods: IUserStaticMethods = {}




export const userPlugins = (schema: Schema<IUserDocument, UserModel>) => {
    //Defining Funtions
    function uniqueValidatorPlugin(schema: Schema<any, any>) {
        schema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
    }

    uniqueValidatorPlugin(schema);
}

