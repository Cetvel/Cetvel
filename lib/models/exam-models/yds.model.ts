import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'

export interface IYDS{
    solvingTime?: number,
    foreingLanguage: { 
            solvingTime: { type: Number, required: false, max: 180 },
            correct: { type: Number, required: true, min: 0, max: 80 },
            wrong: { type: Number, required: true, min: 0, max: 80 }
    },
    point: number
}


export interface IYDSDocument extends IYDS, Document {
    _id: Schema.Types.ObjectId;
}
const YdsSchema = new Schema<IYDSDocument>({
    solvingTime: { type: Number, required: false, max: 180 },
    foreingLanguage: { 
        solvingTime: { type: Number, required: false, max: 180 },
        correct: { type: Number, required: true, min: 0, max: 80 },
        wrong: { type: Number, required: true, min: 0, max: 80 }
    },
    point: Number 
});


const Yds = (mongoose.models.Yds as mongoose.Model<IYDSDocument>) || 
    Exam.discriminator<IYDSDocument>('YDS', YdsSchema);

export default Yds;

