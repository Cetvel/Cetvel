import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEmailDocument extends Document {
    _id: Schema.Types.ObjectId;
    kindeId: string;
    value: string;
    // identityId: string;
    isPrimary: boolean;
}

export interface EmailModel extends Model<IEmailDocument> { }

const emailSchema = new Schema<IEmailDocument, EmailModel>({
    kindeId: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    isPrimary: {
        type: Boolean,
        required: false,
        default: false
    }
});

const Email = mongoose.models.Email || mongoose.model<IEmailDocument, EmailModel>('Email', emailSchema);

export default Email