import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'
import { PhoneNumber } from '@clerk/nextjs/server';


export interface IYDS{
    solvingTime?: number,
    english: { 
            solvingTime: { type: Number, required: false, max: 135 },
            correct: { type: Number, required: true, min: 0, max: 40 },
            wrong: { type: Number, required: true, min: 0, max: 40 }
    },
    point: number
}


export interface IYDSDocument extends IYDS, Document {
    _id: Schema.Types.ObjectId;
}
const YdsSchema = new Schema<IYDSDocument>({
    solvingTime: { type: Number, required: false, max: 135 },
    english: { 
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 }
    },
    point: Number 
});


const Yds = (mongoose.models.Yds as mongoose.Model<IYDSDocument>) || 
    Exam.discriminator<IYDSDocument>('Yds', YdsSchema);

export default Yds;

