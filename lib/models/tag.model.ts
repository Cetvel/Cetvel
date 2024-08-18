import mongoose, {Schema, Document} from 'mongoose';

export interface ITagDocument extends Document {
    _id: Schema.Types.ObjectId,
    clerkId : string,
    value: string;
    label: string;
}

interface ITagModel extends mongoose.Model<ITagDocument> {}

const tagSchema = new Schema({
    clerkId: {type: String, required: true},
    label: {type: String, required: true},
    value: {type: String, required: true},
    color: {type: String, required: false},
});

const Tag = mongoose.models.Tag || mongoose.model<ITagDocument, ITagModel>('Tag', tagSchema);

export default Tag