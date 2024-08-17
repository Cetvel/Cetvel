import mongoose, {Schema, Document} from 'mongoose';

export interface ITagDocument extends Document {
    _id: Schema.Types.ObjectId,
    clerkId : string,
    name: string;
    color: string;
}

interface ITagModel extends mongoose.Model<ITagDocument> {}

const tagSchema = new Schema({
    clerkId: {type: String, required: true},
    name: {type: String, required: true},
    color: {type: String, required: true},
});

const Tag = mongoose.models.Tag || mongoose.model<ITagDocument, ITagModel>('Tag', tagSchema);

export default Tag