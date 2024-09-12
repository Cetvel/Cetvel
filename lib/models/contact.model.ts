import mongoose, { Document, Schema, Model } from "mongoose";

interface IContact {
    name: string;
    email: string;
    message: string;
}

export interface IContactDocument extends IContact, Document {
    _id: false;
 }

export interface IContactModel extends Model<IContactDocument> { }

const contactSchema = new Schema<IContactDocument, IContactModel>({
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
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model<IContactDocument, IContactModel>('Contact', contactSchema);
